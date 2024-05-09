<script lang="ts">
	import {
		addSortBy,
		addTableFilter,
		addHiddenColumns,
		addSelectedRows,
		addColumnOrder,
		addColumnFilters
	} from 'svelte-headless-table/plugins';

	import { addResizedColumns } from 'svelte-headless-table/plugins';

	import {
		createTable,
		Render,
		Subscribe,
		createRender
	} from 'svelte-headless-table';
	import { get, readable } from 'svelte/store';
	import ArrowUpDown from 'lucide-svelte/icons/arrow-up-down';
	import { textPrefixFilter } from '$lib/components/filters/filters.js';
	import { data, columnsData } from '$lib/temporary-data/products.js';
	import { Button } from '$lib/components/ui/button';
	import { CELL_WIDTH } from '$lib/enums/cellWidth.js';
	import TextFilter from '$lib/components/filters/TextFilter.svelte';
	import TableCheckbox from '$lib/components/created/TableCheckbox.svelte';

	const productData = readable(data);

	const table = createTable(productData, {
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
		resize: addResizedColumns(),
	});

	// TODO: drag and drop for columns, save order in local storage

	const createdColumns = [];

	columnsData.map((column) => {
		if (column.type === 'id') {
			createdColumns.push(table.column({
				accessor: column.accessor,
				header: (_, { pluginStates }) => {
					const { allPageRowsSelected } = pluginStates.select;
					return createRender(TableCheckbox, {
						checked: allPageRowsSelected
					});
				},
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
						minWidth: CELL_WIDTH.CHECKBOX,
						initialWidth: CELL_WIDTH.CHECKBOX,
						maxWidth: CELL_WIDTH.LIMIT
					}
				}
			}))
		}

		if (column.type === 'string') {
			createdColumns.push(table.column({
				accessor: column.accessor,
				header: column.header,
				plugins: {
					colFilter: {
						fn: textPrefixFilter,
						initialFilterValue: '',
						render: (filterValue) => createRender(TextFilter, filterValue)
					},
					resize: {
						minWidth: CELL_WIDTH.SMALL,
						initialWidth: CELL_WIDTH.MEDIUM,
						maxWidth: CELL_WIDTH.LIMIT
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
					colFilter: {
						fn: textPrefixFilter,
						initialFilterValue: '',
						render: (filterValue) =>
							createRender(TextFilter, filterValue)
					},
					resize: {
						minWidth: CELL_WIDTH.SMALL,
						initialWidth: CELL_WIDTH.MEDIUM,
						maxWidth: CELL_WIDTH.LIMIT

					}
				}
			}))
		}
	});

	// TODO: typescript for columns

	const tableColumns = table.createColumns(createdColumns);

	const {
		headerRows,
		pageRows,
		tableAttrs,
		tableBodyAttrs,
		pluginStates,
		rows
	} = table.createViewModel(tableColumns);

	const { selectedDataIds } = pluginStates.select;
	// const { columnWidths } = pluginStates.resize;
	// console.log($columnWidths);
</script>

<!--TODO: save column widths to local storage, can't resize while reading values?  -->

<!--TODO: checkbox for all rows -->

<!--<pre>$columnWidths = {JSON.stringify($columnWidths, null, 2)}</pre>-->

<div class="flex flex-col h-full bg-background rounded-lg">
	<div class="rounded-md rounded-tl-none overflow-auto h-[100%]">
		<table {...$tableAttrs} class="w-full">
			<thead class="flex">
			{#each $headerRows as headerRow (headerRow.id)}
				<Subscribe attrs={headerRow.attrs()} let:attrs>
					<tr {...attrs} class="flex-1 border-b  ">

						{#each headerRow.cells as cell (cell.id)}
							<Subscribe attrs={cell.attrs()} let:attrs props={cell.props()} let:props>
								<th {...attrs} use:props.resize class="[&:has([role=checkbox])]:pl-3">
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
										<div class="resizer" use:props.resize.drag />
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
						data-state={$selectedDataIds[row.id] && "selected"}
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


	<div class="text-sm text-muted-foreground/75 p-2 border-t">
		{Object.keys($selectedDataIds).length} z{" "}
		{$rows.length} řad označeno.
	</div>
</div>


<style>
	table {
		border-spacing: 0;
	}

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
