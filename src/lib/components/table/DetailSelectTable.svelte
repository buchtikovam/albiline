<script lang="ts">
	import { Checkbox } from '$lib/components/ui/checkbox';
	import * as Table from "$lib/components/ui/table";
	import { _ } from 'svelte-i18n'
	import type { Writable } from 'svelte/store';

	interface Props {
		tableDef: any;
		tableData: Writable<Row[]>;
		translationRoute: string;
	}

	let { tableDef, tableData, translationRoute }: Props = $props();

	let rowData: Row[] = $state([]);

	type Row = {
		name: string,
		customerAddressCode : number,
		street : string,
		city : string,
		postalCode : string,
		countryCode : string,
		customerRank : string
	}

	tableData.subscribe((data) => {
		if (data) {
			rowData = data
		}

		console.log(rowData);
	});

</script>


<Table.Root class="w-full mt-1.5">
	<Table.Header class="border-b">
		{#each tableDef as column}
			<Table.Head>
				{$_(translationRoute + ".address_select_table." + column.field)}
			</Table.Head>
		{/each}
	</Table.Header>

	<Table.Body>
		{#if rowData.length > 0}
			{#each rowData as row}
				<Table.Row class="">
					{#each tableDef as column}
						{#if column.type === 'checkbox'}
							<Table.Cell >
								<div class="w-full flex">
									<Checkbox
										class="bg-slate-50"
										bind:checked={row[column.field]}
									/>
								</div>
							</Table.Cell>
						{/if}

						{#if column.type === 'text'}
							<Table.Cell>
								{row[column.field]}
							</Table.Cell>
						{/if}
					{/each}

					<button class="mt-1 p-0.5 rounded font-bold">
						Vybrat
					</button>


				</Table.Row>
			{/each}

		{:else}
			<p>load</p>
		{/if}


	</Table.Body>
</Table.Root>
