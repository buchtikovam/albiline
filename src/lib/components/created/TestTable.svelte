<script>
	import { writable } from 'svelte/store';
	import { createTable, Subscribe, Render } from 'svelte-headless-table';
	import { addResizedColumns } from 'svelte-headless-table/plugins';
	import { testdata } from '$lib/components/created/createSamples.ts';

	let data = writable(testdata)

	const table = createTable(data, {
		resize: addResizedColumns(),
	});


	const columns = table.createColumns([
		table.group({
			header: 'Name',
			columns: [
				table.column({
					header: 'First Name',
					accessor: 'firstName',
				}),
				table.column({
					header: 'Last Name',
					accessor: 'lastName',
				}),
			],
		}),
		table.group({
			header: 'Info',
			columns: [
				table.column({
					header: 'Age',
					accessor: 'age',
				}),
				table.column({
					header: 'Status',
					accessor: 'status',
				}),
				table.column({
					header: 'Visits',
					accessor: 'visits',
					plugins: {
						resize: { disable: true },
					},
				}),
				table.column({
					header: 'Profile Progress',
					accessor: 'progress',
				}),
			],
		}),
	]);

	const { headerRows, rows, tableAttrs, tableBodyAttrs, pluginStates } =
		table.createViewModel(columns);
	const { columnWidths } = pluginStates.resize;
</script>

<pre>$columnWidths = {JSON.stringify($columnWidths, null, 2)}</pre>

<table {...$tableAttrs}>
	<thead>
	{#each $headerRows as headerRow (headerRow.id)}
		<Subscribe rowAttrs={headerRow.attrs()} let:rowAttrs>
			<tr {...rowAttrs}>
				{#each headerRow.cells as cell (cell.id)}
					<Subscribe attrs={cell.attrs()} let:attrs props={cell.props()} let:props>
						<th {...attrs} use:props.resize>
							<Render of={cell.render()} />
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
	<tbody {...$tableBodyAttrs}>
	{#each $rows as row (row.id)}
		<Subscribe rowAttrs={row.attrs()} let:rowAttrs>
			<tr {...rowAttrs}>
				{#each row.cells as cell (cell.id)}
					<Subscribe attrs={cell.attrs()} let:attrs>
						<td {...attrs}>
							<Render of={cell.render()} />
						</td>
					</Subscribe>
				{/each}
			</tr>
		</Subscribe>
	{/each}
	</tbody>
</table>

<style>
	table {
		border-spacing: 0;
		border-top: 1px solid black;
		border-left: 1px solid black;
	}
	th, td {
		border-bottom: 1px solid black;
		border-right: 1px solid black;
		padding: 0.5rem;
	}
	th {
		position: relative;
	}
	.resizer {
		position: absolute;
		top: 0;
		bottom: 0;
		right: -4px;
		width: 8px;
		background: lightgray;
		cursor: col-resize;
		z-index: 1;
	}
</style>
