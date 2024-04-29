<script lang="ts">
	import { createTable, Render, Subscribe, createRender } from 'svelte-headless-table';
	import { readable, writable } from 'svelte/store';
	import {
		addSortBy,
		addTableFilter,
		addHiddenColumns,
		addSelectedRows,
		addColumnOrder,
		addColumnFilters
	} from 'svelte-headless-table/plugins';
	import TextFilter from '$lib/components/filters/TextFilter.svelte';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { data } from '$lib/components/created/products.js';
	import * as Table from '$lib/components/ui/table';
	import { ArrowUpDown, ChevronDown } from 'lucide-svelte';
	import { textPrefixFilter } from '$lib/components/filters/filters.js';
	import TableCheckbox from '$lib/components/created/TableCheckbox.svelte';
	import { Button } from '$lib/components/ui/button';
	// import { Input } from '$lib/components/ui/input';


	const productData = writable(data);

	// const updateData = (rowDataId: unknown, columnId: string, newValue: string | number) => {
	// 	if (['age', 'visits', 'progress'].includes(columnId)) {
	// 		if (typeof newValue === 'string') {
	// 			newValue = parseInt(newValue);
	// 		}
	// 		if (isNaN(newValue)) {
	// 			$productData = $productData;
	// 			return;
	// 		}
	// 	}
	// 	if (columnId === 'status') {
	// 		if (!['relationship', 'single', 'complicated'].includes(<string>newValue)) {
	// 			$productData = $productData;
	// 			return;
	// 		}
	// 	}
	// };
	//

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
	//
	// const EditableCellLabel = ({ column, row, value }) =>
	// 	createRender(EditableCell, {
	// 		row,
	// 		column,
	// 		value,
	// 		onUpdateValue: updateData
	// 	});

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
		flatColumns,
		rows
	} = table.createViewModel(columns);

	// const { filterValue } = pluginStates.filter;
	const { hiddenColumnIds } = pluginStates.hide;
	const { selectedDataIds } = pluginStates.select;
	// const {  } = pluginStates.colOrder;

	const ids = flatColumns.map((col) => col.id);
	let hideForId = Object.fromEntries(ids.map((id) => [id, true]));

	$: $hiddenColumnIds = Object.entries(hideForId)
		.filter(([, hide]) => !hide)
		.map(([id]) => id);


	// const { columnIdOrder } = pluginStates.colOrder;
	// $columnIdOrder = ['id', 'product', 'cost', 'category', 'stock', ''];
	// const unhidableColumns = ['id', ''];

</script>

<div class="flex flex-col h-full">
<!--	<div class="flex pb-2 justify-between">-->
<!--		<Input-->
<!--			class="max-w-sm"-->
<!--			placeholder="Filtrovat..."-->
<!--			type="text"-->
<!--			bind:value={$filterValue}-->
<!--		/>-->


<!--		<DropdownMenu.Root>-->
<!--			<DropdownMenu.Trigger asChild let:builder>-->
<!--				<Button variant="outline" class="" builders={[builder]}>-->
<!--					<ChevronDown class="h-4 w-4" />-->
<!--				</Button>-->
<!--			</DropdownMenu.Trigger>-->
<!--			<DropdownMenu.Content>-->
<!--				{#each flatColumns as col}-->
<!--					{#if !unhidableColumns.includes(col.id)}-->
<!--						<DropdownMenu.CheckboxItem bind:checked={hideForId[col.id]}>-->
<!--							{col.header}-->
<!--						</DropdownMenu.CheckboxItem>-->
<!--					{/if}-->
<!--				{/each}-->
<!--			</DropdownMenu.Content>-->
<!--		</DropdownMenu.Root>-->
<!--	</div>-->

	<div class="rounded-md shadow flex-1">
		<Table.Root {...$tableAttrs}>
			<Table.Header>
				{#each $headerRows as headerRow (headerRow.id)}
					<Subscribe rowAttrs={headerRow.attrs()} let:rowAttrs>
						<Table.Row {...rowAttrs}>
							{#each headerRow.cells as cell (cell.id)}
								<Subscribe attrs={cell.attrs()} let:attrs props={cell.props()} let:props>
									<Table.Head {...attrs} class="[&:has([role=checkbox])]:pl-3">
										{#if cell.id !== "id" && cell.id !== ""}
											<Button variant="ghost" on:click={props.sort.toggle} class="h-fit">
												<Render of={cell.render()} />
												<ArrowUpDown class="h-4 w-4 pl-1" />
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


			<Table.Body {...$tableBodyAttrs} class="">
				{#each $pageRows as row (row.id)}
					<Subscribe rowAttrs={row.attrs()} let:rowAttrs>
						<Table.Row {...rowAttrs}
								   data-state={$selectedDataIds[row.id] && "selected"} class=""
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


	<div class="text-sm text-muted-foreground pt-2 pl-2">
		{Object.keys($selectedDataIds).length} z{" "}
		{$rows.length} řad označeno.
	</div>
</div>


