<script lang="ts">
	import {
		addSortBy,
		addTableFilter,
		addHiddenColumns,
		addSelectedRows,
		addColumnOrder,
		addColumnFilters,
		addResizedColumns,
		textPrefixFilter
	} from 'svelte-headless-table/plugins';
	import { createTable, Render, Subscribe, createRender } from 'svelte-headless-table';
	import ArrowUpDown from 'lucide-svelte/icons/arrow-up-down';
	import RotateCcw from 'lucide-svelte/icons/rotate-ccw';
	import { readable, get } from 'svelte/store';
	import { data, columnsData } from '$lib/temporary-data/products.js';
	import { Button } from '$lib/components/ui/button';
	import * as Table from '$lib/components/ui/table';
	import { cellWidths } from '$lib/constants/constants';
	import TableCheckbox from '$lib/components/created/TableCheckbox.svelte';
	import TextFilter from '$lib/components/filters/TextFilter.svelte';
	import { columnWidthStore } from '$lib/stores/store';
	import ArrowDownAZ  from 'lucide-svelte/icons/arrow-down-a-z';
	import ArrowUpAZ  from 'lucide-svelte/icons/arrow-up-a-z';
	import { columnOrderStore } from '$lib/stores/store';
	import EditableCell from '$lib/components/created/EditableCell.svelte';
	import { onMount } from 'svelte';

	const tableData = readable(data);

	const updateData = (rowDataId: unknown, columnId: string, newValue: string | number) => {
		if (['age', 'visits', 'progress'].includes(columnId)) {
			if (typeof newValue === 'string') {
				newValue = parseInt(newValue);
			}
			if (isNaN(newValue)) {
				$tableData = $tableData;
				return;
			}
		}
		if (columnId === 'status') {
			if (!['relationship', 'single', 'complicated'].includes(<string>newValue)) {
				$tableData = $tableData;
				return;
			}
		}
	};

	const EditableCellLabel = ({ column, row, value }) =>
		createRender(EditableCell, {
			row,
			column,
			value,
			onUpdateValue: updateData
		});


	const table = createTable(tableData, {
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
				] }
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

	columnWidthStore.subscribe((colWidthData) => {
		columnsData.map((column) => {
			let initialWidth;
			if (colWidthData !== null) {
				initialWidth = colWidthData[column.accessor];
			} else {
				initialWidth = cellWidths.get(column.cellSize);
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
							initialWidth: initialWidth,
							disable: true
						}
					},
				}));
			}
			if (column.type === 'string') {
				createdColumns.push(table.column({
					accessor: column.accessor,
					header: column.header,
					plugins: {
						colFilter: {
							fn: textPrefixFilter,
							initialFilterValue: '',
							render: ({ filterValue, values, preFilteredValues }) =>
								createRender(TextFilter, { filterValue, values, preFilteredValues })
						},
						resize: {
							minWidth: cellWidths.get('small'),
							initialWidth: initialWidth,
							maxWidth: cellWidths.get('limit')
						}
					},
					cell: EditableCellLabel
				}));
			}
			if (column.type === 'currency') {
				createdColumns.push(table.column({
					accessor: column.accessor,
					header: column.header,
					cell: (cell) => {
						return new Intl.NumberFormat(
							'cz',
							{
								style: 'currency',
								currency: 'CZK'
							}
						).format(Number(cell.value));
					},
					plugins: {
						colFilter: {
							fn: textPrefixFilter,
							initialFilterValue: '',
							render: ({ filterValue, values, preFilteredValues }) =>
								createRender(TextFilter, { filterValue, values, preFilteredValues })
						},
						resize: {
							minWidth: cellWidths.get('small'),
							initialWidth: initialWidth,
							maxWidth: cellWidths.get('limit')
						}
					}
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
		columnWidthStore.set(null);
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

	const drag = (event, index) => {
		event.dataTransfer.effectAllowed = 'copy';
		event.dataTransfer.dropEffect = 'copy';
		event.dataTransfer.setData('text/plain', '');
		start = index;
	};

	const drop = (event, target) => {
		event.dataTransfer.dropEffect = 'copy';

		const { columnIdOrder } = pluginStates.colOrder;
		let columnOrderData: string[];

		columnIdOrder.subscribe((data) => {
			columnOrderData = data;
		});

		if (columnOrderData) {
			if (start < target) {
				columnOrderData.splice(target + 1, 0, columnOrderData[start]);
				columnOrderData.splice(start, 1);
			} else {
				columnOrderData.splice(target, 0, columnOrderData[start]);
				columnOrderData.splice(start + 1, 1);
			}
			hovering = null
		}

		columnIdOrder.update(() => columnOrderData);
	};

	function setHovering(index: number) {
		hovering = index;
	}


	// check for stored colOrder, subscribe to colOrder changes

	const { columnIdOrder } = pluginStates.colOrder;

	let columnStore = get(columnOrderStore)

	if (columnStore !== null) {
		columnIdOrder.update(() => columnStore)
	}

	columnIdOrder.subscribe((data) => {
		columnOrderStore.update(() => data)
	})


	onMount(() => {
		document.addEventListener("dragover", (event) => {
			event.preventDefault();
		});
	})

</script>

<!--TODO: document is not defined error-->


<!--TODO: fix table width to full-->

<div class="flex flex-col">
	<Table.Root {...$tableAttrs} class="overflow-auto relative ">
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
									class="relative p-2 cursor-grab active:cursor-grabbing"
								>
									{#if cell.id !== "id"}
										<button
											class="flex w-full items-center justify-center font-semibold rounded-md hover:bg-muted/70"
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
										<div class="absolute hover:bg-albi-50 inset-y-0 -right-2 w-4 z-10 cursor-col-resize"
												 use:props.resize.drag />
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
									<div class="line-clamp-1">
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

	<div class="flex w-full justify-between border-t">
		<div class="text-sm text-muted-foreground/75 p-2 ">
			{selectedRows} řad označeno.
		</div>

		<div>
			<Button variant="ghost" size="sm" class="hover:bg-muted/50" on:click={resetColumns}>
				<RotateCcw class="h-4 w-4" />
			</Button>
		</div>
	</div>
</div>
