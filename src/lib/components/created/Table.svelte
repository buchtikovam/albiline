<script lang="ts">
	import { createTable, Render, Subscribe, createRender } from 'svelte-headless-table';
	import { writable } from 'svelte/store';
	import {
		addSortBy,
		addTableFilter,
		addHiddenColumns,
		addSelectedRows,
		addColumnOrder
	} from 'svelte-headless-table/plugins';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { data } from '$lib/components/created/products.js';
	import * as Table from '$lib/components/ui/table';
	import EditableCell from './EditableCell.svelte';
	import { ArrowUpDown, ChevronDown } from 'lucide-svelte';
	import TableActions from '$lib/components/created/TableActions.svelte';
	import TableCheckbox from '$lib/components/created/TableCheckbox.svelte';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';


	const productData = writable(data);

	const updateData = (rowDataId: unknown, columnId: string, newValue: string | number) => {
		if (['age', 'visits', 'progress'].includes(columnId)) {
			if (typeof newValue === 'string') {
				newValue = parseInt(newValue);
			}
			if (isNaN(newValue)) {
				$productData = $productData;
				return;
			}
		}
		if (columnId === 'status') {
			if (!['relationship', 'single', 'complicated'].includes(<string>newValue)) {
				$productData = $productData;
				return;
			}
		}
	};


	const table = createTable(productData, {
		sort: addSortBy(),
		filter: addTableFilter({
			fn: ({ filterValue, value }) =>
				value.toLowerCase().includes(filterValue.toLowerCase())
		}),
		hide: addHiddenColumns(),
		select: addSelectedRows(),
		colOrder: addColumnOrder()
	});

	const EditableCellLabel = ({ column, row, value }) =>
		createRender(EditableCell, {
			row,
			column,
			value,
			onUpdateValue: updateData
		});

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
				filter: {
					exclude: true
				}
			}
		}),

		table.column({
			accessor: 'ksp',
			header: 'KSP',
			cell: EditableCellLabel
		}),

		table.column({
			accessor: 'jmeno',
			header: 'Jméno',
			cell: EditableCellLabel
		}),

		table.column({
			accessor: 'typ',
			header: 'Typ',
			cell: EditableCellLabel
		}),

		table.column({
			accessor: 'linie',
			header: 'Linie',
			cell: EditableCellLabel
		}),

		table.column({
			accessor: 'koncepce',
			header: 'Koncepce',
			cell: EditableCellLabel
		}),

		table.column({
			accessor: 'klp',
			header: 'KLP',
			cell: EditableCellLabel
		}),

		table.column({
			accessor: 'listovaciPolozka',
			header: 'Listovací Položka',
			cell: EditableCellLabel
		}),

		table.column({
			accessor: 'prodCena',
			header: 'Cena',
			cell: ({ value }) => {
				const formatted = new Intl.NumberFormat('cz', {
					style: 'currency',
					currency: 'CZK'
				}).format(value);

				return createRender(EditableCell, {
					value: formatted,
					originalValue: value,
					onUpdateValue: updateData
				});
			}
		}),

		table.column({
			accessor: 'skladem',
			header: 'Skladem',
			cell: EditableCellLabel
		}),

		table.column({
			accessor: 'vyrobeno',
			header: 'Vyrobeno',
			cell: EditableCellLabel
		}),

		table.column({
			accessor: ({ id }) => id,
			header: '',
			plugins: {
				sort: {
					disable: true
				},
				filter: {
					exclude: true
				}
			},
			cell: ({ value }) => {
				return createRender(TableActions, { id: value });
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

	const { filterValue } = pluginStates.filter;
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
	const unhidableColumns = ['id', ''];
</script>


<div class="flex flex-col h-full">
	<div class="flex pb-2 justify-between">
		<Input
			class="max-w-sm"
			placeholder="Filtrovat..."
			type="text"
			bind:value={$filterValue}
		/>


		<DropdownMenu.Root>
			<DropdownMenu.Trigger asChild let:builder>
				<Button variant="outline" class="" builders={[builder]}>
					<ChevronDown class="h-4 w-4"/>
				</Button>
			</DropdownMenu.Trigger>
			<DropdownMenu.Content>
				{#each flatColumns as col}
					{#if !unhidableColumns.includes(col.id)}
						<DropdownMenu.CheckboxItem bind:checked={hideForId[col.id]}>
							{col.header}
						</DropdownMenu.CheckboxItem>
					{/if}
				{/each}
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	</div>

	<div class="rounded-md border flex-1">
		<Table.Root {...$tableAttrs} class="">
			<Table.Header>

				{#each $headerRows as headerRow (headerRow.id)}
					<Subscribe rowProps={headerRow.props()}>
						<!--let:rowProps {rowProps.colOrder}-->
						<Table.Row>
							{#each headerRow.cells as cell (cell.id)}
								<Subscribe
									attrs={cell.attrs()}
									let:attrs
									props={cell.props()}
									let:props
								>
									<!--{props.colOrder}-->
									<Table.Head {...attrs} class="[&:has([role=checkbox])]:pl-3">
										{#if cell.id !== "id" && cell.id !== ""}
											<Button variant="ghost" on:click={props.sort.toggle}>
												<Render of={cell.render()} />
												<ArrowUpDown class="h-4 w-4 pl-1"/>
											</Button>
										{:else}
											<Render of={cell.render()} />
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


	<div class="text-sm text-muted-foreground">
		{Object.keys($selectedDataIds).length} z{" "}
		{$rows.length} řad označeno.
	</div>
</div>


