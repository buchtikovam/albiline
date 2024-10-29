<script lang="ts">
	import { Checkbox } from '$lib/components/ui/checkbox';
	import * as Table from "$lib/components/ui/table";
	import {
		customerDetailContactsTableData,
		customerDetailContactsTableDef
	} from '$lib/data/detail-pages/zakaznici/table-def/customerDetailContactsTableDef';

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
	}[] = customerDetailContactsTableData

	console.log(customerDetailContactsTableData);
	console.log(customerDetailContactsTableDef);
</script>

<Table.Root>
	<Table.Header class="border-b ">
		{#each customerDetailContactsTableDef as column}
			<Table.Head>{@html column.headerName}</Table.Head>
		{/each}
	</Table.Header>

	<Table.Body class="overflow-auto">
		{#each rowData as row}
			<Table.Row>
				{#each customerDetailContactsTableDef as column}
					{#if column.type === 'checkbox'}
						<Table.Cell >
							<div class="w-full flex">
								<Checkbox class="bg-slate-50" bind:checked={row[column.variableName]}/>
							</div>
						</Table.Cell>
					{/if}

					{#if column.type === 'text'}
						<Table.Cell>{row[column.variableName]}</Table.Cell>
					{/if}

				{/each}
			</Table.Row>
		{/each}
	</Table.Body>
</Table.Root>
