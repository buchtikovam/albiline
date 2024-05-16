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
	import { createTable, Render, Subscribe, createRender, DataColumn } from 'svelte-headless-table';
	import ArrowUpDown from 'lucide-svelte/icons/arrow-up-down';
	import RotateCcw from 'lucide-svelte/icons/rotate-ccw';
	import { readable } from 'svelte/store';
	import { data, columnsData } from '$lib/temporary-data/products.js';
	import { Button } from '$lib/components/ui/button';
	import * as Table from '$lib/components/ui/table';
	import { cellWidths } from '$lib/constants/constants';
	import TableCheckbox from '$lib/components/created/TableCheckbox.svelte';
	import TextFilter from '$lib/components/filters/TextFilter.svelte';
	import * as Dialog from '$lib/components/ui/dialog';

	import { columnWidthStore } from '$lib/stores/store';
	import Pencil from 'lucide-svelte/icons/pencil';

	const tableData = readable(data);

	const table = createTable(tableData, {
		sort: addSortBy(),
		filter: addTableFilter({
			fn: ({ filterValue, value }) => value.toLowerCase().includes(filterValue.toLowerCase())
		}),
		hide: addHiddenColumns(),
		select: addSelectedRows(),
		colOrder: addColumnOrder(),
		colFilter: addColumnFilters(),
		resize: addResizedColumns({
			onResizeEnd: () => {
				const { columnWidths } = pluginStates.resize;
				columnWidths.subscribe((data) => {
					console.log('columnWidths subscribed');
					columnWidthStore.set(data);
				});

				console.log('resize end');
			}
		})
	});

	const createdColumns = [];

	columnWidthStore.subscribe((colWidthData) => {
		console.log('changed');
		columnsData.map((column) => {
			let initialWidth;
			if (colWidthData !== undefined || null) {
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
					}
				}));
			}
			if (column.type === 'string') {
				createdColumns.push(table.column({
					accessor: column.accessor,
					header: column.header,
					plugins: {
						// colFilter: {
						// 	fn: textPrefixFilter,
						// 	initialFilterValue: '',
						// 	render: (filterValue) =>
						// 		createRender(TextFilter, filterValue)
						// },
						resize: {
							minWidth: cellWidths.get('small'),
							initialWidth: initialWidth,
							maxWidth: cellWidths.get('limit')
						}
					}
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
								currency: 'CZK',
							}
						).format(Number(cell.value));
					},
					plugins: {
						// colFilter: {
						// 	fn: textPrefixFilter,
						// 	initialFilterValue: '',
						// 	render: (filterValue) =>
						// 		createRender(TextFilter, filterValue)
						// },
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
		pluginStates,
	} = table.createViewModel(
		table.createColumns(createdColumns)
	);

	const { columnIdOrder } = pluginStates.colOrder;
	columnIdOrder.subscribe((data) => {
		console.log(data);
	})

	function resetColumns() {
		columnWidthStore.set([]);
	}

	let selectedRows = 0;
	const { selectedDataIds } = pluginStates.select;
	selectedDataIds.subscribe(
		(rows) => selectedRows = Object.keys(rows).length
	);
</script>

<div class="flex flex-col">
	<Table.Root {...$tableAttrs} class="overflow-auto relative">
		<Table.Header class="top-0 sticky bg-white border-1 border-b">
			{#each $headerRows as headerRow (headerRow.id)}
				<Subscribe attrs={headerRow.attrs()} let:attrs>
					<Table.Row {...attrs}>
						{#each headerRow.cells as cell (cell.id)}
							<Subscribe attrs={cell.attrs()} let:attrs props={cell.props()} let:props>
								<th
									{...attrs}
									use:props.resize
									class="relative p-2 hover:bg-muted/85 cursor-pointer"
								>
									{#if cell.id !== "id"}
										<button class="flex w-full items-center justify-center font-semibold" on:click={props.sort.toggle}>
											<Render of={cell.render()} />
											{#if props.sort.order === 'asc'}
												TODO:up
											{:else if props.sort.order === 'desc'}
												TODO:down
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
										<div class="absolute hover:bg-primary inset-y-0 -right-2 w-4 z-10 cursor-col-resize" use:props.resize.drag />
									{/if}
								</th>
							</Subscribe>
						{/each}
					</Table.Row>
				</Subscribe>
			{/each}
		</Table.Header>
		<Table.Body {...$tableBodyAttrs}>
			{#each $pageRows as row (row.id)}
				<Subscribe attrs={row.attrs()} let:attrs>
					<Table.Row
						{...attrs}
						data-state={$selectedDataIds[row.id] && "selected"}
						class="hover:bg-muted/95 data-[state=selected]:bg-muted/85"
					>
						{#each row.cells as cell (cell.id)}
							<Subscribe attrs={cell.attrs()} let:attrs>
								<Table.Cell {...attrs}>
									<div class="line-clamp-1">
										<Render of={cell.render()}/>
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
			<Dialog.Root>
				<Dialog.Trigger>
					<Button variant="ghost" size="sm" class="hover:bg-muted/50">
						<Pencil class="h-4 w-4" />
					</Button>
				</Dialog.Trigger>
				<Dialog.Content>

				</Dialog.Content>
			</Dialog.Root>
		</div>
	</div>
</div>
