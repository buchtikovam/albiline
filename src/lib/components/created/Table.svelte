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
	import { readable } from 'svelte/store';
	import { data, columnsData } from '$lib/temporary-data/products.js';
	import { Button } from '$lib/components/ui/button';
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
			fn: ({ filterValue, value }) =>
				value.toLowerCase().includes(filterValue.toLowerCase())
		}),
		hide: addHiddenColumns(),
		select: addSelectedRows(),
		colOrder: addColumnOrder(),
		colFilter: addColumnFilters(),
		resize: addResizedColumns({
			onResizeEnd: () => {
				let newColumnWidths;

				columnWidths.subscribe((data) => {
					newColumnWidths = data;
				});

				console.log(' resize end ');
				columnWidthStore.set(newColumnWidths);
			}
		})
	});

	const createdColumns = [];

	const tableColumns = table.createColumns(createdColumns);




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
					cell: ({ value }) => {
						const formatted = new Intl.NumberFormat('cz', {
							style: 'currency',
							currency: 'CZK'
						}).format(value);
						return formatted;
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
		pluginStates
	} = table.createViewModel(tableColumns);

	// const { columnIdOrder } = pluginStates.colOrder;
	//
	// columnIdOrder.subscribe((data) => {
	// 	console.log(data);
	// })

	const { columnWidths } = pluginStates.resize;


	function resetColumns() {
		columnWidthStore.set(undefined);
		window.location.reload();
	}

	const { selectedDataIds } = pluginStates.select;

	let selectedRows = 0;

	selectedDataIds.subscribe(
		(rows) => selectedRows = Object.keys(rows).length
	);

</script>


<div class="flex flex-col h-full bg-background rounded-lg">
	<div class="rounded-md rounded-tl-none overflow-auto h-[100%]">
		<table {...$tableAttrs} class="w-full">
			<thead class="flex">
			{#each $headerRows as headerRow (headerRow.id)}
				<Subscribe attrs={headerRow.attrs()} let:attrs>
					<tr
						{...attrs}
						id="target"
						class="flex-1 border-b"
					>
						{#each headerRow.cells as cell (cell.id)}
							<Subscribe attrs={cell.attrs()} let:attrs props={cell.props()} let:props>
								<th
									{...attrs}
									use:props.resize
									class="cell [&:has([role=checkbox])]:pl-3"
								>
									{#if cell.id !== "id" && cell.id !== ""}
										<Button
											variant="ghost"
											on:click={props.sort.toggle}
											class="h-6  hover:bg-muted/85"
										>
											<Render of={cell.render()} />
											<ArrowUpDown class="h-4 w-4 pl-1 " />
										</Button>
									{/if}

									{#if props.colFilter?.render}
										<div>
											<Render of={props.colFilter.render} />
										</div>
									{/if}

									{#if !props.resize.disabled}
										<div class="resizer " use:props.resize.drag />
									{/if}

									{#if cell.id === 'id'}
										<div class="mt-5">
											<Render of={cell.render()} />
										</div>
									{/if}
								</th>
							</Subscribe>
						{/each}
					</tr>
				</Subscribe>
			{/each}
			</thead>

			<!--			TODO: make header fixed -->

			<tbody {...$tableBodyAttrs} class="h-full text-sm flex flex-col">

			{#each $pageRows as row (row.id)}
				<Subscribe attrs={row.attrs()} let:attrs>
					<tr {...attrs}
						data-state={"selected"}
						class="hover:bg-muted/40 flex-1 border-b flex items-center ">
						{#each row.cells as cell (cell.id)}
							<Subscribe attrs={cell.attrs()} let:attrs>
								<td {...attrs} class="line-clamp-3 max-h-[73px]">
									<Render of={cell.render()} />
								</td>
							</Subscribe>
						{/each}
					</tr>

				</Subscribe>
			{/each}
			</tbody>
		</table>

	</div>


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

<style>

	th, td {
		padding: 0.5rem;
	}

	th {
		position: relative;
	}

	th .resizer {
		position: absolute;
		top: 0;
		bottom: 0;
		right: -4px;
		width: 8px;
		z-index: 1;
		cursor: col-resize;
	}
</style>
