<script lang="ts">
	import {
		addSortBy,
		addHiddenColumns,
		addSelectedRows,
		addColumnOrder,
		addColumnFilters,
		addResizedColumns,
		addTableFilter
	} from 'svelte-headless-table/plugins';
	import { createTable, Render, Subscribe, createRender, type DataColumn } from 'svelte-headless-table';
	import { tableFulltextFilter } from '$lib/utils/input-filters/tableFulltextFilter';
	import { columnTextFilter } from '$lib/utils/input-filters/columnTextFilter';
	import { get, type Readable, type Writable, writable } from 'svelte/store';
	import { onMount } from 'svelte';
	import ArrowUpDown from 'lucide-svelte/icons/arrow-up-down';
	import ChevronDown from "lucide-svelte/icons/chevron-down";
	import ArrowDownAZ from 'lucide-svelte/icons/arrow-down-a-z';
	import ArrowUpAZ from 'lucide-svelte/icons/arrow-up-a-z';
	import { cellWidths } from '$lib/constants/cellWidths';
	import {
		columnWidthStore,
		columnOrderStore,
		currentFiltersStore,
		selectedRowsStore,
		rowDataStore,
		columnDataStore,
		filterValueStore
	} from '$lib/stores/tableStore';
	import type { Column, TableRowData } from '$lib/types/table';
	import type { StoredFilters } from '$lib/types/filter';
	import TableCheckbox from '$lib/components/table/TableCheckbox.svelte';
	import TextFilter from '$lib/components/table/column-filters/TextFilter.svelte';
	import EditableCell from '$lib/components/table/EditableCell.svelte';
	import * as Table from '$lib/components/ui/table';
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
	import { Button } from '$lib/components/ui/button';

	export let data: {
		rowData: any,
		columnData: Column[],
	};

	rowDataStore.set(data.rowData);
	columnDataStore.set(data.columnData);

	const updateData = (newData: TableRowData) => {
		rowDataStore.set(newData);
	};

	let initColOrder: string[] = getInitColumnOrder();

	const table = createTable(rowDataStore, {
		sort: addSortBy(),
		hide: addHiddenColumns(),
		select: addSelectedRows(),
		filter: addTableFilter({
			fn: ({ filterValue, value }) => tableFulltextFilter(filterValue, value)
		}),
		colOrder: addColumnOrder({
			initialColumnIdOrder: initColOrder
		}),
		colFilter: addColumnFilters(),
		resize: addResizedColumns({
			onResizeEnd: () => {
				const { columnWidths } = pluginStates.resize;
				columnWidths.subscribe((data) => {
					columnWidthStore.set(data);
				});
			}
		})
	});

	// TODO: in db.json add plugin options

	function getInitColumnOrder(): string[] {
		let storedOrder = get(columnOrderStore);

		if (storedOrder.length > 0) {
			return storedOrder;
		}

		return get(columnDataStore).map((column: Column) => {
			return column.accessor;
		});
	}

	let tableColumnData: Writable<DataColumn<any>[]> = writable([]);
	let tableViewModel = table.createViewModel(
		table.createColumns(get(tableColumnData))
	);
	let headerRows = tableViewModel.headerRows;
	let pageRows = tableViewModel.pageRows;
	let tableAttrs = tableViewModel.tableAttrs;
	let tableBodyAttrs = tableViewModel.tableBodyAttrs;
	let pluginStates = tableViewModel.pluginStates;
	let flatColumns = tableViewModel.flatColumns;

	tableColumnData.subscribe((value) => {
		tableViewModel = table.createViewModel(
			table.createColumns(value)
		);
		headerRows = tableViewModel.headerRows;
		pageRows = tableViewModel.pageRows;
		tableAttrs = tableViewModel.tableAttrs;
		tableBodyAttrs = tableViewModel.tableBodyAttrs;
		pluginStates = tableViewModel.pluginStates;
		flatColumns = tableViewModel.flatColumns;
	});

	(function createDefaultFilters() {
		let defaultFilters: StoredFilters = {};

		get(columnDataStore).forEach((column: Column) => {
			defaultFilters[column.accessor] = {
				value: '',
				colFilter: 'default'
			};
		});

		currentFiltersStore.set(defaultFilters);
	})();


	currentFiltersStore.subscribe((filters) => {
		const colWidthData = get(columnWidthStore);

		tableColumnData.set(
			get(columnDataStore).map(
				(column: Column) => {
					let initialWidth;
					if (colWidthData && Object.keys(colWidthData).length > 0) {
						initialWidth = colWidthData[column.accessor];
					} else {
						initialWidth = cellWidths.get(column.size);
					}

					if (column.type === 'id') {
						return table.column({
							header: (_, { pluginStates }) => {
								const { allPageRowsSelected } = pluginStates.select;
								return createRender(TableCheckbox, {
									checked: allPageRowsSelected
								});
							},
							accessor: column.accessor,
							cell: ({ row }, { pluginStates }) => {
								const { getRowState } = pluginStates.select;
								const { isSelected } = getRowState(row);
								return createRender(TableCheckbox, {
									checked: isSelected
								});
							},
							plugins: {
								sort: {
									disable: true
								},
								resize: {
									initialWidth: 40,
									disable: true
								}
							}
						});
					}


					let accessor = column.accessor;
					const inputValue = filters ? filters[accessor].value : '';
					let columnFilter = writable(filters ? filters[accessor].colFilter : 'default');
					return table.column({
						accessor: column.accessor,
						header: column.header,
						plugins: {
							colFilter: {
								fn: columnTextFilter(columnFilter),
								initialFilterValue: inputValue,
								render: (
									{ filterValue, values, preFilteredValues }: {
										filterValue: Writable<string>,
										values: Readable<any[]>,
										preFilteredValues: Readable<any[]>
									}) =>
									createRender(TextFilter, {
										filterValue,
										values,
										preFilteredValues,
										columnFilter,
										accessor
									})
							},
							resize: {
								minWidth: 80,
								initialWidth: initialWidth,
								maxWidth: 400
							}
						},
						cell: ({ column, row, value }) =>
							createRender(EditableCell, {
								row,
								column,
								value,
								rowDataStore,
								onUpdateValue: updateData
							})
					});
				}
			)
		);
	});


	// checkbox plugin
	let selectedRows = 0;
	const { selectedDataIds } = pluginStates.select;
	selectedDataIds.subscribe((rows: Record<number, boolean>) => {
		selectedRowsStore.set(rows);
		selectedRows = Object.keys(rows).length;
	});


	// column drag and drop functions
	let hovering: number | null;
	let start: number;

	function drag(e: DragEvent, index: number) {
		if (e.dataTransfer) {
			e.dataTransfer.effectAllowed = 'copy';
			e.dataTransfer.dropEffect = 'copy';
			e.dataTransfer.setData('text/plain', '');
			start = index;
		}
	}

	function drop(e: DragEvent, target: number | null) {
		if (e.dataTransfer && target !== null) {
			e.dataTransfer.dropEffect = 'copy';

			const { columnIdOrder } = pluginStates.colOrder;
			let columnOrderData: string[];

			columnIdOrder.subscribe((data: string[]) => {
				columnOrderData = data;
			});

			setTimeout(() => {
				if (columnOrderData) {
					if (start < target) {
						columnOrderData.splice(target + 1, 0, columnOrderData[start]);
						columnOrderData.splice(start, 1);
						columnIdOrder.update(() => columnOrderData);
					} else {
						columnOrderData.splice(target, 0, columnOrderData[start]);
						columnOrderData.splice(start + 1, 1);
						columnIdOrder.update(() => columnOrderData);
					}
					hovering = null;
				}
			}, 0);
		}
	}

	function setHovering(index: number) {
		hovering = index;
	}



	// hide columns
	// const { hiddenColumnIds } = pluginStates.hide;
	//
	// const ids = flatColumns.map((col) => col.id);
	//
	// let hideForId = Object.fromEntries(ids.map((id) => [id, true]));
	//
	// $: $hiddenColumnIds = Object.entries(hideForId)
	// 	.filter(([, hide]) => !hide)
	// 	.map(([id]) => id);
	//
	// // TODO: make into store, access it my presets, save a preset
	// const hiddenCols = ["id"];



	// fulltext filter value
	const { filterValue } = pluginStates.filter;

	filterValueStore.subscribe((value) => {
		filterValue.set(value)
	})



	// event listener for drag and drop
	onMount(() => {
		document.addEventListener('dragover', (event) => {
			event.preventDefault();
		});
	});
</script>

{#key $rowDataStore}
	{#key $tableColumnData}
<!--		<DropdownMenu.Root>-->
<!--			<DropdownMenu.Trigger asChild let:builder>-->
<!--				<Button variant="outline" class="ml-auto" builders={[builder]}>-->
<!--					<ChevronDown class="h-4 w-4" />-->
<!--				</Button>-->
<!--			</DropdownMenu.Trigger>-->
<!--			<DropdownMenu.Content>-->
<!--				{#each flatColumns as col}-->
<!--					{#if !hiddenCols.includes(col.id)}-->
<!--						<DropdownMenu.CheckboxItem bind:checked={hideForId[col.id]}>-->
<!--							{col.header}-->
<!--						</DropdownMenu.CheckboxItem>-->
<!--					{/if}-->
<!--				{/each}-->
<!--			</DropdownMenu.Content>-->
<!--		</DropdownMenu.Root>-->

		<div class="h-full flex flex-col">
			<Table.Root {...$tableAttrs} class="overflow-auto relative h-fit w-auto">
				<Table.Header class="top-0 sticky bg-white border-1">
					{#each $headerRows as headerRow (headerRow.id)}
						<Subscribe attrs={headerRow.attrs()} let:attrs>
							<tr {...attrs}>
								{#each headerRow.cells as cell, index (cell.id)}
									<Subscribe attrs={cell.attrs()} let:attrs props={cell.props()} let:props>
										<th
											{...attrs}
											use:props.resize
											draggable="true"
											on:dragstart={(e) => drag(e, index)}
											on:dragover={() => setHovering(index)}
											on:dragend|preventDefault={(e) => drop(e, hovering)}
											class="relative w-fit p-2 cursor-grab active:cursor-grabbing "
										>
											{#if cell.id !== "id"}
												<button
													class="flex w-full items-center justify-center font-semibold rounded-md hover:bg-muted/70 "
													on:click={props.sort.toggle}
												>
													<Render of={cell.render()} />
													{#if props.sort.order === 'asc'}
														<ArrowDownAZ class="h-4 w-4 ml-2" />
													{:else if props.sort.order === 'desc'}
														<ArrowUpAZ class="h-4 w-4 ml-2" />
													{:else}
														<ArrowUpDown class="h-4 w-4 ml-2" />
													{/if}
												</button>
											{:else}
												<Render of={cell.render()} />
											{/if}

											{#if props.colFilter?.render}
												<Render of={props.colFilter.render} />
											{/if}

											{#if !props.resize.disabled}
												<div
													class="absolute hover:bg-albi-50 inset-y-0 -right-2 w-4 z-10 cursor-col-resize"
													use:props.resize.drag
												/>
											{/if}
										</th>
									</Subscribe>
								{/each}
							</tr>
						</Subscribe>
					{/each}
				</Table.Header>


				<Table.Body {...$tableBodyAttrs}>
					{#each $pageRows as row (row.id)}
						<Subscribe attrs={row.attrs()} let:attrs>
							<Table.Row
								{...attrs}
								data-state={$selectedDataIds[row.id] && "selected"}
								class="hover:bg-muted/60 data-[state=selected]:bg-muted/40"
							>
								{#each row.cells as cell (cell.id)}
									<Subscribe attrs={cell.attrs()} let:attrs>
										<Table.Cell {...attrs}>
											<div class="line-clamp-1 h-6 flex items-center">
												<Render of={cell.render()} />
											</div>
										</Table.Cell>
									</Subscribe>
								{/each}
							</Table.Row>
						</Subscribe>
					{/each}
				</Table.Body>
			</Table.Root>

			<div class="flex justify-between items-center w-full border-t">
				<div class="text-sm text-muted-foreground/75 p-2 items-start justify-between ">
					{selectedRows} řad označeno.
				</div>
			</div>
		</div>
	{/key}
{/key}
