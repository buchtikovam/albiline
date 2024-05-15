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
	import { onMount } from 'svelte';
	import { data, columnsData } from '$lib/temporary-data/products.js';
	import { Button } from '$lib/components/ui/button';
	import { cellWidths } from '$lib/constants/constants';
	import TableCheckbox from '$lib/components/created/TableCheckbox.svelte';
	// import TextFilter from '$lib/components/filters/TextFilter.svelte';

	const tableData = readable(data);

	const table = createTable(tableData, {
		sort: addSortBy(),
		filter: addTableFilter({
			fn: ({ filterValue, value }) =>
				value.toLowerCase().includes(filterValue.toLowerCase())
		}),
		hide: addHiddenColumns(),
		select: addSelectedRows(),
		colOrder: addColumnOrder({
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
				'skladem'
			]
		}),
		colFilter: addColumnFilters(),
		resize: addResizedColumns({
			onResizeEnd: (event: Event) => {
				// update localStorage here
				//console.log(event);
			},
		}),
	});

	// TODO: drag and drop for columns, save order in local storage

	const createdColumns = [];

	const tableColumns = table.createColumns(createdColumns);

	columnsData.map((column) => {
		let initialWidth;
		try {
			const storedWidths = localStorage.getItem('columnWidths');
			if (storedWidths) {
				const widths = JSON.parse(storedWidths);
				initialWidth = widths[column.accessor];
			}
		} catch (error) {
			console.error('Error loading column widths from local storage:', error);
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
						initialWidth: initialWidth || cellWidths.get(column.cellSize),
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
						initialWidth: initialWidth || cellWidths.get(column.cellSize),
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
						initialWidth: initialWidth || cellWidths.get(column.cellSize),
						maxWidth: cellWidths.get('limit')
					}
				}
			}));
		}
	});

	const {
		headerRows,
		pageRows,
		tableAttrs,
		tableBodyAttrs,
		pluginStates
	} = table.createViewModel(tableColumns);

	const { selectedDataIds } = pluginStates.select;
	const { columnWidths } = pluginStates.resize;

	columnWidths.subscribe((data) => {
		try {
			localStorage.setItem('columnWidths', JSON.stringify(data));
		} catch (error) {
			console.error('Error saving column widths to local storage:', error);
		}
	});

	let selectedRows = 0;
	selectedDataIds.subscribe((rows) => selectedRows = Object.keys(rows).length);

	function resetColumns() {
		localStorage.removeItem('columnWidths');
		window.location.reload();
	}


	let order: string[];

	const { columnIdOrder } = pluginStates.colOrder;

	columnIdOrder.subscribe((data) => {
		order = data;
		console.log(data);
	});

	function dragStart(e: DragEvent, itemValue: string) {
		console.log('dragStart itemValue:', itemValue);
		e.dataTransfer?.setData('text/plain', itemValue);
	}

	function dragoverHandler(e: DragEvent) {
		e.preventDefault();
		console.log("dragover handler");
	}

	function dropHandler(e: DragEvent) {
		e.preventDefault();
		const draggingItemValue: string | undefined = e.dataTransfer?.getData("text/plain");
		if (draggingItemValue === undefined) {
			return;
		}

		console.log('drop droppeditem: ', draggingItemValue);

		const dragIndex = order.indexOf(draggingItemValue);
		console.log('drop dragIndex: ', dragIndex);


		// if (dragIndex !== -1 && dropIndex !== -1 && dragIndex !== dropIndex) {
		// 	[order[dragIndex], order[dropIndex]] = [order[dropIndex], order[dragIndex]];
		// 	console.log(order);
		// 	columnIdOrder.set(order);
		// }

		// console.log('  ');
	}

	onMount(() => {
		try {
			const storedWidths = localStorage.getItem('columnWidths');
			if (storedWidths) {
				columnWidths.set(JSON.parse(storedWidths));
			}

		} catch (error) {
			console.error('Error loading column widths from local storage:', error);
		}
	});
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
									class="cell [&:has([role=checkbox])]:pl-3 hover:cursor-grabbing"
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
										<div class="resizer bg-primary" use:props.resize.drag />
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

		<Button variant="ghost" size="sm" class="hover:bg-muted/50" on:click={resetColumns}>
			<RotateCcw class="h-4 w-4" />
		</Button>
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
