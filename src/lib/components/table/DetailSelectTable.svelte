<script lang="ts">
	import { Checkbox } from '$lib/components/ui/checkbox';
	import * as Table from "$lib/components/ui/table";

	export let tableDef;
	export let tableData;
	export let activeRowId;

	const rowData: {
		default: boolean;
		active: boolean;
		name: string;
		lastName: string;
		phoneNumber: string;
		pevnaLinka: string;
		email: string;
		note: string;
		faPDF: boolean;
		faCSV: boolean;
		dlPDF: boolean;
		dlCSV: boolean;
		azSvoz: boolean;
		azExpedice: boolean;
	}[] = tableData;

	function selectRow(rowId) {
		activeRowId = rowId
	}
</script>


<Table.Root class="w-full mt-1.5">
	<Table.Header class="border-b">
		{#each tableDef as column}
			<Table.Head>
				{@html column.headerName}
			</Table.Head>
		{/each}
	</Table.Header>

	<Table.Body>
		{#each rowData as row}
			<Table.Row class="">
				{#each tableDef as column}
					{#if column.type === 'checkbox'}
						<Table.Cell >
							<div class="w-full flex">
								<Checkbox
									class="bg-slate-50"
									bind:checked={row[column.variableName]}
								/>
							</div>
						</Table.Cell>
					{/if}

					{#if column.type === 'text'}
						<Table.Cell>
							{row[column.variableName]}
						</Table.Cell>
					{/if}
				{/each}

				<button class="mt-1 p-0.5 rounded font-bold">
					Vybrat
				</button>


			</Table.Row>
		{/each}
	</Table.Body>
</Table.Root>
