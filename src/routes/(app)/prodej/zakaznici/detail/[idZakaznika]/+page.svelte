<script lang="ts">
	import { zakazniciDetailFormDef } from '$lib/data/autoform/zakaznici-detail';
	import { writable } from 'svelte/store';
	import * as Table from "$lib/components/ui/table";
	import type { CustomerData } from "$lib/types/tables/zakaznici";
	import AutoForm from '$lib/components/copy-form/AutoForm.svelte';
	import SectionLabel from '$lib/components/copy-form/labels/SectionLabel.svelte';

	export let data: { response: CustomerData };

	let formValues = writable(data.response)
</script>


<div class="h-full max-w-[1850px] overflow-auto p-3 md:p-4">
	<p class="font-bold w-full text-lg mb-2 md:mb-4">Detail zákazníka 123</p>

	<AutoForm autoform={zakazniciDetailFormDef} bind:formValues/>

	<div>
		<SectionLabel name="Kontaktní adresy"/>

		<div class="mt-2">
			<Table.Root>
				<Table.Header class="border-b">
					<Table.Head>Výchozí</Table.Head> 
					<Table.Head>Aktivní</Table.Head>
					<Table.Head>Jméno</Table.Head>
					<Table.Head>Příjmení</Table.Head>
					<Table.Head>Mobil</Table.Head>
					<Table.Head>Fax</Table.Head>
					<Table.Head>Pevná linka</Table.Head>
					<Table.Head>Email</Table.Head>
					<Table.Head>Poznámka</Table.Head>
				</Table.Header>

				<Table.Body class="overflow-auto">
					<Table.Row>
						<Table.Cell>.</Table.Cell>
						<Table.Cell>.</Table.Cell>
						<Table.Cell>.</Table.Cell>
						<Table.Cell>.</Table.Cell>
						<Table.Cell>.</Table.Cell>
						<Table.Cell>.</Table.Cell>
						<Table.Cell>.</Table.Cell>
						<Table.Cell>.</Table.Cell>
						<Table.Cell>.</Table.Cell>
					</Table.Row>
				</Table.Body>
			</Table.Root>
		</div>
	</div>
</div>


<style>
	::-webkit-scrollbar {
		width: 0px;
	}
</style>
