<script lang="ts">
	import {
		addSortBy,
		addTableFilter,
		addHiddenColumns,
		addSelectedRows,
		addColumnOrder,
		addColumnFilters,
		addResizedColumns,
	} from 'svelte-headless-table/plugins';
	import { createTable, Render, Subscribe, createRender } from 'svelte-headless-table';
	import ArrowUpDown from 'lucide-svelte/icons/arrow-up-down';
	import RotateCcw from 'lucide-svelte/icons/rotate-ccw';
	import ArrowDownAZ from 'lucide-svelte/icons/arrow-down-a-z';
	import ArrowUpAZ from 'lucide-svelte/icons/arrow-up-a-z';
	import { get, writable } from 'svelte/store';
	import { onMount } from 'svelte';
	import { Button } from '$lib/components/ui/button';
	import { columnWidthStore, columnOrderStore } from '$lib/stores/tableStore';
	import TableCheckbox from '$lib/components/table/TableCheckbox.svelte';
	import TextFilter from '$lib/components/column-filters/TextFilter.svelte';
	import EditableCell from '$lib/components/table/EditableCell.svelte';
	import { cellWidths } from '$lib/constants/cellWidths';
	import * as Table from '$lib/components/ui/table';
	import type { Column } from '$lib/types/table';
	import {
		textFilterEndsWith,
		textFilterIncludes,
		textFilterStartsWith
	} from '$lib/components/column-filters/filters';

	export let data;
	const columnData = writable(data.columnData);

	let tempData = data.columnData;

	// editable cell
	const EditableCellLabel = ({ column, row, value }) =>
		createRender(EditableCell, {
			row,
			column,
			value,
			tempData,
			onUpdateValue: updateData
		});

	const updateData = (newData) => {
		columnData.set(newData)
	};


	const table = createTable(columnData, {
		sort: addSortBy(),
		filter: addTableFilter({
			fn: ({ filterValue, value }) => value.toLowerCase().includes(filterValue.toLowerCase())
		}),
		hide: addHiddenColumns(),
		select: addSelectedRows(),
		colOrder: addColumnOrder(
			{
				initialColumnIdOrder: [
					'id',
					'ksp',
					'jmeno',
					'typ',
					'linie',
					'koncepce',
					'listovaciPolozka',
					'prodCena',
					'vyrobeno',
					'skladem',
					'klp'
				]
			}
		),
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


	const createdColumns = [];
	const tableColumns = table.createColumns(createdColumns);

	// function getFilter(currentFilter: string) {
	// 	console.log("run");
	// 	switch (currentFilter) {
	// 		case 'contains':
	// 			return textFilterIncludes;
	// 		case 'starts-with':
	// 			return textFilterStartsWith;
	// 		case 'ends-with':
	// 			return textFilterEndsWith;
	// 		default:
	// 			return textFilterIncludes
	// 	}
	// }



	columnWidthStore.subscribe((colWidthData) => {
		data.columnInfo.map((column: Column) => {
			let initialWidth;
			if (colWidthData && Object.keys(colWidthData).length > 0) {
				initialWidth = colWidthData[column.accessor];
			} else {
				initialWidth = cellWidths.get(column.size);
			}

			if (column.type === 'id') {
				createdColumns.push(table.column({
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
				}));
			} else {
				let columnFilter = writable("contains")

				createdColumns.push(table.column({
					accessor: column.accessor,
					header: column.header,
					plugins: {
						colFilter: {
							fn: textFilterIncludes,
							initialFilterValue: '',
							render: ({ filterValue, values, preFilteredValues }) =>
								createRender(TextFilter, { filterValue, values, preFilteredValues, columnFilter })
						},
						resize: {
							minWidth: 80,
							initialWidth: initialWidth,
							maxWidth: 400
						}
					},
					cell: EditableCellLabel
				}));
			}
		});
	});

	const {
		headerRows,
		pageRows,
		tableAttrs,
		tableBodyAttrs,
		pluginStates
	} = table.createViewModel(tableColumns);

	function resetColumns() {
		columnWidthStore.set({ });
	}

	// checkbox plugin
	let selectedRows = 0;
	const { selectedDataIds } = pluginStates.select;
	selectedDataIds.subscribe(
		(rows) => selectedRows = Object.keys(rows).length
	);

	// column drag and drop functions
	let hovering: number | null;
	let start: number;

	const drag = (event: DragEvent, index: number) => {
		if (event.dataTransfer) {
			event.dataTransfer.effectAllowed = 'copy';
			event.dataTransfer.dropEffect = 'copy';
			event.dataTransfer.setData('text/plain', '');
			start = index;
		}
	};

	const drop = (event: DragEvent, target: number | null) => {
		if (event.dataTransfer && target !== null) {
			event.dataTransfer.dropEffect = 'copy';

			const { columnIdOrder } = pluginStates.colOrder;
			let columnOrderData: string[];

			columnIdOrder.subscribe((data) => {
				columnOrderData = data;
			});

			setTimeout(() => {
				if (columnOrderData) {
					if (start < target) {
						columnOrderData.splice(target + 1, 0, columnOrderData[start]);
						columnOrderData.splice(start, 1);
					} else {
						columnOrderData.splice(target, 0, columnOrderData[start]);
						columnOrderData.splice(start + 1, 1);
					}
					hovering = null;
				}
			}, 0)

			columnIdOrder.update(() => columnOrderData);
		}
	};


	function setHovering(index: number) {
		hovering = index;
	}


	// check for stored colOrder, subscribe to colOrder changes
	const { columnIdOrder } = pluginStates.colOrder;

	let columnStore = get(columnOrderStore);

	if (columnStore.length > 0) {
		columnIdOrder.update(() => columnStore);
	}

	columnIdOrder.subscribe((data) => {
		columnOrderStore.update(() => data);
	});


	onMount(() => {
		document.addEventListener('dragover', (event) => {
			event.preventDefault();
		});
	});
</script>

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

		<Button
			variant="ghost"
			size="sm"
			class="hover:bg-muted/50"
			on:click={resetColumns}
		>
			<RotateCcw class="h-4 w-4" />
		</Button>
	</div>
</div>
