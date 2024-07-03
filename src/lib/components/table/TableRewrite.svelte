<script lang="ts">
	import type { TableColumn, TableRows, TableType } from '$lib/types/table/table';
	import { get, type Readable, type Writable, writable } from 'svelte/store';
	import { columnWidthStore, rowDataStore } from '$lib/stores/tableStore';
	import { createRender, createTable, Render, Subscribe } from 'svelte-headless-table';
	import {
		addColumnFilters,
		addResizedColumns,
		addSortBy,
	} from 'svelte-headless-table/plugins';
	import EditableCell from '$lib/components/table/EditableCell.svelte';
	import * as Table from "$lib/components/ui/table";
	import { cellWidths } from '$lib/constants/cellWidths';
	import { onMount } from 'svelte';
	import { columnTextFilter } from '$lib/utils/input-filters/columnTextFilter';
	import type { TextFilters } from '$lib/types/table/filter';
	import TextFilter from '$lib/components/table/column-filters/TextFilter.svelte';


	// initialize variables
	export let data: TableType;
	console.log(data);

	const rowsWritable: Writable<TableRows> = writable(data.items); // passed into create table
	const columnsWritable: Writable<TableColumn[]> = writable(data.columnInfo);

	rowDataStore.subscribe((data) => {
		if (data) {
			rowsWritable.set(data);
		}
	});

	const updateData = (newData: TableRows) => {
		rowDataStore.set(newData);
	};

	let columns: TableColumn[] = data.columnInfo;
	columnsWritable.subscribe((columnsData) => {
		columns = columnsData;
	});


	// initialize table
	const table = createTable(rowsWritable, {
		sort: addSortBy(),
		colFilter: addColumnFilters(),
		resize: addResizedColumns({
			onResizeEnd: () => {
				const { columnWidths } = pluginStates.resize;
				columnWidthStore.set(get(columnWidths));
			}
		})
	});


	// create columns
	let dataColumns = table.createColumns(columns.map((column: TableColumn) => {
		let columnFilter: Writable<TextFilters> = writable("default")
		let accessor = column.accessor

		return table.column({
			accessor: column.accessor,
			header: column.header,
			plugins: {
				colFilter: {
					fn: columnTextFilter(columnFilter),
					initialFilterValue: "",
					render: (
						{ filterValue, values, preFilteredValues }: {
							filterValue: Writable<string>,
							values: Readable<any[]>,
							preFilteredValues: Readable<any[]>
						}) =>
						createRender(TextFilter, {
							filterValue,
							values,
							preFilteredValues,
							columnFilter,
							accessor
						})
				},
				sort: {
					disable: false
				},
				resize: {
					disable: false,
					minWidth: 60,
					initialWidth: cellWidths.get(column.size),
					maxWidth: 400
				}
			},
			cell: ({ column, row, value }) =>
				createRender(EditableCell, {
					row,
					column,
					value,
					rowsWritable,
					onUpdateValue: updateData
				})
		});
	}));



	// create view model
	let {
		headerRows,
		pageRows,
		tableAttrs,
		tableBodyAttrs,
		pluginStates
	} = table.createViewModel(dataColumns);



	onMount(() => {
		const { columnWidths } = pluginStates.resize;

		columnWidthStore.subscribe((widths) => {
			columnWidths.set(widths)
		})

		document.addEventListener('dragover', (event) => {
			event.preventDefault();
		})
	})
</script>

<div class="h-full flex flex-col">
	<Table.Root {...$tableAttrs} class="overflow-auto relative h-fit w-auto">
		<Table.Header class="top-0 sticky bg-white border-1">
			{#each $headerRows as headerRow (headerRow.id)}
				<Subscribe attrs={headerRow.attrs()} let:attrs>
					<tr {...attrs}>
						{#each headerRow.cells as cell (cell.id)}
							<Subscribe attrs={cell.attrs()} let:attrs props={cell.props()} let:props>
								<th
									{...attrs}
									use:props.resize
									draggable="true"
									class="relative w-fit p-2 cursor-grab active:cursor-grabbing "
								>
									{#if cell.id !== "id"}
										<button
											class="flex w-full items-center justify-center font-semibold rounded-md hover:bg-muted/70 "
											on:click={props.sort.toggle}
										>
											<Render of={cell.render()} />
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
				<Subscribe rowAttrs={row.attrs()} let:rowAttrs>
					<Table.Row
						{...rowAttrs}
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
			0 řad označeno.
		</div>
	</div>
</div>
