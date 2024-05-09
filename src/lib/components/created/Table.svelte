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
	import { writable } from 'svelte/store';
	import ArrowUpDown from 'lucide-svelte/icons/arrow-up-down';
	import { textPrefixFilter } from '$lib/components/filters/filters.js';
	import { data } from '$lib/temporary-data/products.js';
	import { Button } from '$lib/components/ui/button';
	import { CELL_WIDTH } from '$lib/enums/cellWidth.js';
	import TextFilter from '$lib/components/filters/TextFilter.svelte';
	import TableCheckbox from '$lib/components/created/TableCheckbox.svelte';

	const productData = writable(data);


	const table = createTable(productData, {
		sort: addSortBy(),
		filter: addTableFilter({
			fn: ({ filterValue, value }) =>
				value.toLowerCase().includes(filterValue.toLowerCase())
		}),
		hide: addHiddenColumns(),
		select: addSelectedRows(),
		colOrder: addColumnOrder({
			initialColumnIdOrder: ['id']
		}),
		colFilter: addColumnFilters(),
		resize: addResizedColumns()
	});

	// TODO: make columns based on JSON | object

	const columns = table.createColumns([
		table.column({
			accessor: 'id',
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
		}),

		table.column({
			accessor: 'ksp',
			header: 'KSP',
			plugins: {
				colFilter: {
					fn: textPrefixFilter,
					initialFilterValue: '',
					render: (filterValue) =>
						createRender(TextFilter, filterValue)
				},
				resize: {
					minWidth: CELL_WIDTH.SMALL,
					initialWidth: CELL_WIDTH.SMALL,
					maxWidth: CELL_WIDTH.LIMIT
				}
			}
		}),

		table.column({
			accessor: 'jmeno',
			header: 'Jméno',
			plugins: {
				colFilter: {
					fn: textPrefixFilter,
					initialFilterValue: '',
					render: (filterValue) =>
						createRender(TextFilter, filterValue)
				},
				resize: {
					minWidth: CELL_WIDTH.MEDIUM,
					initialWidth: CELL_WIDTH.XLARGE,
					maxWidth: CELL_WIDTH.LIMIT
				}
			}
		}),

		table.column({
			accessor: 'typ',
			header: 'Typ',
			plugins: {
				colFilter: {
					fn: textPrefixFilter,
					initialFilterValue: '',
					render: (filterValue) =>
						createRender(TextFilter, filterValue)
				},
				resize: {
					minWidth: CELL_WIDTH.SMALL,
					// initialWidth: CELL_WIDTH.SMALL,
					maxWidth: CELL_WIDTH.LIMIT
				}
			}
		}),

		table.column({
			accessor: 'linie',
			header: 'Linie',
			plugins: {
				colFilter: {
					fn: textPrefixFilter,
					initialFilterValue: '',
					render: (filterValue) =>
						createRender(TextFilter, filterValue)
				},
				resize: {
					minWidth: CELL_WIDTH.SMALL,
					// initialWidth: CELL_WIDTH.MEDIUM,
					maxWidth: CELL_WIDTH.LIMIT
				}
			}
		}),

		table.column({
			accessor: 'koncepce',
			header: 'Koncepce',
			plugins: {
				colFilter: {
					fn: textPrefixFilter,
					initialFilterValue: '',
					render: (filterValue) =>
						createRender(TextFilter, filterValue)
				},
				resize: {
					minWidth: CELL_WIDTH.SMALL,
					initialWidth: CELL_WIDTH.LARGE,
					maxWidth: CELL_WIDTH.LIMIT

				}
			}
		}),

		table.column({
			accessor: 'klp',
			header: 'KLP',
			plugins: {
				colFilter: {
					fn: textPrefixFilter,
					initialFilterValue: '',
					render: (filterValue) =>
						createRender(TextFilter, filterValue)
				},
				resize: {
					minWidth: CELL_WIDTH.SMALL,
					initialWidth: CELL_WIDTH.SMALL,
					maxWidth: CELL_WIDTH.LIMIT
				}
			}
		}),

		table.column({
			accessor: 'listovaciPolozka',
			header: 'Listovací Položka',
			plugins: {
				colFilter: {
					fn: textPrefixFilter,
					initialFilterValue: '',
					render: (filterValue) =>
						createRender(TextFilter, filterValue)
				},
				resize: {
					minWidth: CELL_WIDTH.SMALL,
					// initialWidth: CELL_WIDTH.LARGE,
					maxWidth: CELL_WIDTH.LIMIT

				}
			}
		}),

		table.column({
			accessor: 'prodCena',
			header: 'Cena',
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
					// initialWidth: CELL_WIDTH.MEDIUM,
					maxWidth: CELL_WIDTH.LIMIT

				}
			}
		}),

		table.column({
			accessor: 'skladem',
			header: 'Skladem',
			plugins: {
				colFilter: {
					fn: textPrefixFilter,
					initialFilterValue: '',
					render: (filterValue) =>
						createRender(TextFilter, filterValue)
				},
				resize: {
					minWidth: CELL_WIDTH.SMALL,
					// initialWidth: CELL_WIDTH.MEDIUM,
					maxWidth: CELL_WIDTH.LIMIT

				}
			}
		}),

		table.column({
			accessor: 'vyrobeno',
			header: 'Vyrobeno',
			plugins: {
				colFilter: {
					fn: textPrefixFilter,
					initialFilterValue: '',
					render: (filterValue) =>
						createRender(TextFilter, filterValue)
				},
				resize: {
					minWidth: CELL_WIDTH.SMALL,
					// initialWidth: CELL_WIDTH.MEDIUM,
					maxWidth: CELL_WIDTH.LIMIT

				}
			}
		})
	]);

	const {
		headerRows,
		pageRows,
		tableAttrs,
		tableBodyAttrs,
		pluginStates,
		rows
	} = table.createViewModel(columns);

	const { selectedDataIds } = pluginStates.select;
</script>


<!--TODO: checkbox for all rows -->

<div class="flex flex-col h-full bg-background rounded-lg">
	<div class="rounded-md rounded-tl-none overflow-auto h-[100%]">
		<table {...$tableAttrs} class="w-full">
			<thead class="flex">
			{#each $headerRows as headerRow (headerRow.id)}
				<Subscribe attrs={headerRow.attrs()} let:attrs>
					<tr {...attrs} class="flex-1 border-b ">

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
						class="hover:bg-muted/40 flex-1 border-b flex items-center max-h-[74px]">
						{#each row.cells as cell (cell.id)}
							<Subscribe attrs={cell.attrs()} let:attrs>
								<td {...attrs} class="line-clamp-3 ">
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
