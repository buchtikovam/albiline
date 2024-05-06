<script lang="ts">
	import {
		addSortBy,
		addTableFilter,
		addHiddenColumns,
		addSelectedRows,
		addColumnOrder,
		addColumnFilters
	} from 'svelte-headless-table/plugins';
	import {
		createTable,
		Render,
		Subscribe,
		createRender
	} from 'svelte-headless-table';
	import { writable } from 'svelte/store';
	import { ArrowUpDown } from 'lucide-svelte';
	import { textPrefixFilter } from '$lib/components/filters/filters.js';
	import { data } from '$lib/components/temporary-data/products.js';
	import { Button } from '$lib/components/ui/button';
	import TextFilter from '$lib/components/filters/TextFilter.svelte';
	import TableCheckbox from '$lib/components/created/TableCheckbox.svelte';
	import * as Table from '$lib/components/ui/table';

	const productData = writable(data);

	const table = createTable(productData, {
		sort: addSortBy(),
		filter: addTableFilter({
			fn: ({ filterValue, value }) =>
				value.toLowerCase().includes(filterValue.toLowerCase())
		}),
		hide: addHiddenColumns(),
		select: addSelectedRows(),
		colOrder: addColumnOrder(),
		colFilter: addColumnFilters()
	});

	// TODO: make columns based on JSON | object

	// TODO: make column width vary based on content

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
					render: ({ filterValue, values, preFilteredValues }) =>
						createRender(TextFilter, { filterValue, values, preFilteredValues })
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
					render: ({ filterValue, values, preFilteredValues }) =>
						createRender(TextFilter, { filterValue, values, preFilteredValues })
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
					render: ({ filterValue, values, preFilteredValues }) =>
						createRender(TextFilter, { filterValue, values, preFilteredValues })
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
					render: ({ filterValue, values, preFilteredValues }) =>
						createRender(TextFilter, { filterValue, values, preFilteredValues })
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
					render: ({ filterValue, values, preFilteredValues }) =>
						createRender(TextFilter, { filterValue, values, preFilteredValues })
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
					render: ({ filterValue, values, preFilteredValues }) =>
						createRender(TextFilter, { filterValue, values, preFilteredValues })
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
					render: ({ filterValue, values, preFilteredValues }) =>
						createRender(TextFilter, { filterValue, values, preFilteredValues })
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
					render: ({ filterValue, values, preFilteredValues }) =>
						createRender(TextFilter, { filterValue, values, preFilteredValues })
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
					render: ({ filterValue, values, preFilteredValues }) =>
						createRender(TextFilter, { filterValue, values, preFilteredValues })
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
					render: ({ filterValue, values, preFilteredValues }) =>
						createRender(TextFilter, { filterValue, values, preFilteredValues })
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
	const { columnIdOrder } = pluginStates.colOrder;

	$columnIdOrder = [
		'id',
		'ksp',
		'jmeno',
		'typ',
		'linie',
		'koncepce',
		'listovaciPolozka',
		'prodCena',
		'skladem',
		'vyrobeno',
		'klp'
	];
</script>

<div class="flex flex-col h-full bg-background rounded-lg">
	<div class="rounded-md rounded-tl-none flex-1">
		<Table.Root {...$tableAttrs}>

			<Table.Header>
				{#each $headerRows as headerRow (headerRow.id)}
					<Subscribe rowAttrs={headerRow.attrs()} let:rowAttrs>

<!--						TODO: fix checkbox cell width bug -->

						<Table.Row {...rowAttrs}>
							{#each headerRow.cells as cell (cell.id)}
								<Subscribe attrs={cell.attrs()} let:attrs props={cell.props()} let:props>

									<Table.Head {...attrs} class="[&:has([role=checkbox])]:pl-3">

										{#if cell.id !== "id" && cell.id !== ""}
											<Button
												variant="ghost" on:click={props.sort.toggle}
												class="h-6 my-1 hover:bg-muted/85">
												<Render of={cell.render()} />
												<ArrowUpDown class="h-4 w-4 pl-1 " />
											</Button>
										{/if}

										{#if props.colFilter?.render}
											<div>
												<Render of={props.colFilter.render} />
											</div>
										{/if}
									</Table.Head>
								</Subscribe>
							{/each}
						</Table.Row>
					</Subscribe>
				{/each}
			</Table.Header>

			<!--			TODO: make header fixed -->

			<!--			TODO: max cell size -->

			<Table.Body {...$tableBodyAttrs} class="">

				{#each $pageRows as row (row.id)}
					<Subscribe rowAttrs={row.attrs()} let:rowAttrs>

						<Table.Row {...rowAttrs}
								   data-state={$selectedDataIds[row.id] && "selected"}
								   class="hover:bg-muted/40"
						>
							{#each row.cells as cell (cell.id)}
								<Subscribe attrs={cell.attrs()} let:attrs>

									<Table.Cell {...attrs}>
										<Render of={cell.render()} />
									</Table.Cell>
								</Subscribe>
							{/each}
						</Table.Row>
					</Subscribe>
				{/each}
			</Table.Body>
		</Table.Root>

	</div>


	<div class="text-sm text-muted-foreground/75 p-2 border-t">
		{Object.keys($selectedDataIds).length} z{" "}
		{$rows.length} řad označeno.
	</div>
</div>


