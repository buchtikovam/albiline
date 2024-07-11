<script lang="ts">
	import {
		columnOrderStore,
		columnWidthStore,
		currentFiltersStore,
		filterValueStore,
		rowDataStore, selectedRowsStore
	} from '$lib/stores/tableStore';
	import { cellWidthsConst } from '$lib/constants/cellWidthsConst';
	import type { TableColumn, TableRows, TableType } from '$lib/types/table/table';
	import { get, type Readable, type Writable, writable } from 'svelte/store';
	import {
		addColumnFilters,
		addResizedColumns,
		addSortBy,
		addHiddenColumns,
		addSelectedRows,
		addTableFilter
	} from 'svelte-headless-table/plugins';
	import { createRender, createTable, Render, Subscribe } from 'svelte-headless-table';
	import { createInitialColumnOrder } from '$lib/utils/table/createInitialColumnOrder';
	import { stringColumnFilterFn } from '$lib/utils/input-filters/stringColumnFilterFn';
	import { tableFulltextFilter } from '$lib/utils/input-filters/tableFulltextFilter';
	import { addColumnOrder } from 'svelte-headless-table/plugins';
	import { onMount } from 'svelte';
	import TableCheckbox from '$lib/components/table/TableCheckbox.svelte';
	import EditableCell from '$lib/components/table/EditableCell.svelte';
	import TextFilter from '$lib/components/table/column-filters/TextFilter.svelte';
	import * as Table from "$lib/components/ui/table";

	/*
		Hlavní Table component zobrazující data z BE
	*/

	export let data: TableType;
	const rowsWritable: Writable<TableRows> = writable(data.items);
	const columnsWritable: Writable<TableColumn[]> = writable(data.columnInfo);

	rowDataStore.set(data.items)

	rowDataStore.subscribe((data) => {
		if (data) {
			rowsWritable.set(data);
		}
	});

	const updateData = (newData: TableRows) => {
		rowDataStore.set(newData);
	};



	// initialize table
	const table = createTable(rowsWritable, {
		sort: addSortBy(),
		select: addSelectedRows(),
		colFilter: addColumnFilters(),
		colOrder: addColumnOrder({
			initialColumnIdOrder: createInitialColumnOrder(columnsWritable)
		}),
		filter: addTableFilter({
			fn: ({ filterValue, value }) => tableFulltextFilter(filterValue, value)
		}),
		resize: addResizedColumns({
			onResizeEnd: () => {
				const { columnWidths } = pluginStates.resize;
				columnWidthStore.set(get(columnWidths));
			}
		}),
		hide: addHiddenColumns(),
	});



	// vytvoření sloupečků pro různé datové typy
	const columns = table.createColumns(get(columnsWritable).map((column: TableColumn) => {
		let accessor = column.accessor

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

		return table.column({
			accessor: column.accessor,
			header: column.header,
			plugins: {
				colFilter: {
					fn: stringColumnFilterFn(accessor),
					initialFilterValue: "",
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
							accessor
						})
				},
				sort: {
					disable: false
				},
				resize: {
					disable: false,
					minWidth: 60,
					initialWidth: cellWidthsConst.get(column.size),
					maxWidth: 400
				}
			},
			cell: ({ column, row, value }) =>
				createRender(EditableCell, {
					row,
					column,
					value,
					rowsWritable,
					onUpdateValue: updateData
				})
		});
	}));



	// vytvoření view modelu
	const {
		headerRows,
		pageRows,
		tableAttrs,
		tableBodyAttrs,
		pluginStates
	} = table.createViewModel(columns);



	// subscribe pro hlídání změn v columnFilters (načtení uložených filtrů)
	const { filterValues } = pluginStates.colFilter;

	currentFiltersStore.subscribe((storedFilters) => {
		let rawFilterData: Record<string, any> = get(filterValues)

		for (const [key] of Object.entries(rawFilterData)) {
			if (storedFilters[key]) {
				rawFilterData[key] = storedFilters[key].value;
			}
		}

		filterValues.set(rawFilterData)
	})



	// fulltext vyhledávání
	const { filterValue } = pluginStates.filter;

	filterValueStore.subscribe((value) => {
		filterValue.set(value);
	});



	// plugin pro select řádků
	let update: boolean = false;
	let selectedRows: number;
	export const { selectedDataIds } = pluginStates.select;

	selectedDataIds.subscribe((rows) => {
		selectedRowsStore.set(rows)
		selectedRows = Object.keys(rows).length
		if (Object.keys(rows).length > 0) {
			update = true
		}
	})

	selectedRowsStore.subscribe((rows) => {
		if (Object.keys(rows).length === 0 && update === true) {
			selectedDataIds.set({})
			update = false
		}
	})



	// drag and drop funkce
	let hovering: number | null;
	let dragStart: number;

	function drag(e: DragEvent, index: number) {
		if (e.dataTransfer) {
			dragStart = index;
		}
	}

	function drop(e: DragEvent, target: number | null) {
		if (e.dataTransfer && target !== null) {
			const { columnIdOrder } = pluginStates.colOrder;
			let columnOrderData: string[];

			columnIdOrder.subscribe((data: string[]) => {
				columnOrderData = data;
			});

			setTimeout(() => {
				if (columnOrderData) {
					if (dragStart < target) {
						columnOrderData.splice(target + 1, 0, columnOrderData[dragStart]);
						columnOrderData.splice(dragStart, 1);
						columnIdOrder.update(() => columnOrderData);
						columnOrderStore.set(columnOrderData)
					} else {
						columnOrderData.splice(target, 0, columnOrderData[dragStart]);
						columnOrderData.splice(dragStart + 1, 1);
						columnIdOrder.update(() => columnOrderData);
						columnOrderStore.set(columnOrderData)
					}
					hovering = null;
				}
			}, 0);
		}
	}

	function setHovering(index: number) {
		hovering = index;
	}


	onMount(() => {
		const { columnWidths } = pluginStates.resize;

		columnWidthStore.subscribe((widths) => {
			if (Object.keys(widths).length > 0) {
				columnWidths.set(widths)
			}
		})

		document.addEventListener('dragover', (event) => {
			event.preventDefault();
		})
	})

	// TODO: implement virtual list to table
</script>



<!--TODO: on destroy add alert to save unsaved data-->
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
											class="flex w-full items-center justify-center font-semibold overflow-visible rounded-md hover:bg-muted/70"
											on:click={props.sort.toggle}
										>
											<Render of={cell.render()} />
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
				<Subscribe rowAttrs={row.attrs()} let:rowAttrs>
					<Table.Row
						{...rowAttrs}
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
