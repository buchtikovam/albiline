<script lang="ts">
	import {
		columnOrderStore,
		columnWidthStore,
		currentFiltersStore,
		editedDataStore,
		filterValueStore,
		pageCompactStore,
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
	import { beforeNavigate, goto } from '$app/navigation';
	import VirtualList from 'svelte-tiny-virtual-list';
	import { redirect } from '@sveltejs/kit';


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


	// virtual list implementace
	function onResize() {
		tableHeight = tableRoot.getBoundingClientRect().height;
	}

	let tableRoot: HTMLElement;
	let tableHeight = 0;
	onMount(() => {
		tableHeight = tableRoot.getBoundingClientRect().height;
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

	let rowHeight: number;

	pageCompactStore.subscribe((data) => {
		if (data === "standard") {
			rowHeight = 42;
		}

		if (data === "compact") {
			rowHeight = 32
		}
	})


	// prevence neuložených dat v tabulce
	beforeNavigate(({ cancel }) => {
		if (get(editedDataStore).length > 0) {
			if (!confirm('Máte neuložená data. Opravdu chcete stránku opustit?')) {
				cancel();
			} else {
				editedDataStore.set([])
			}
		}
	});

	// FIXME: data for columns not shown when hidden by scroll
</script>



<svelte:window
	on:resize={onResize}
/>



<div class="h-full flex flex-col">
	<Table.Root 
		{...$tableAttrs}
		class="relative block overflow-auto"
		bind:wrapper={tableRoot}
	>
		<Table.Body class="block" {...$tableBodyAttrs}>
			<VirtualList
				width="auto"
				height={tableHeight}
				itemCount={$pageRows.length}
				itemSize={rowHeight}
			>
				<svelte:fragment slot="header">
					<Table.Header class="top-0 sticky z-10 bg-white border-1">
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
				</svelte:fragment>
				<svelte:fragment slot="item" let:index let:style>
					{@const row = $pageRows[index]}
					<Subscribe rowAttrs={row.attrs()} let:rowAttrs>
						<tr 
							{style} 
							{...rowAttrs} 
							class="hover:bg-muted/60 data-[state=selected]:bg-muted/40"
							data-state={$selectedDataIds[row.id] && "selected"}
						>
							{#each row.cells as cell (cell.id)}
								<Subscribe attrs={cell.attrs()} let:attrs>
									<Table.Cell {...attrs}>
										<Render of={cell.render()} />
									</Table.Cell>
								</Subscribe>
							{/each}
						</tr>
					</Subscribe>
				</svelte:fragment>
			</VirtualList>
		</Table.Body>
	</Table.Root>

	<div class="flex justify-between items-center w-full border-t">
		<div class="text-sm text-muted-foreground/75 p-2 items-start justify-between ">
			{selectedRows} řad označeno.
		</div>
	</div>
</div>
