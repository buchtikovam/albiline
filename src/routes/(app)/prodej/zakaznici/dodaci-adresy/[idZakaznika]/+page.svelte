<script lang="ts">
	import type { CustomerData } from "$lib/types/tables/zakaznici";
	import SectionLabel from "$lib/components/form/labels/SectionLabel.svelte";
	import * as Accordion from "$lib/components/ui/accordion";
	import * as Table from "$lib/components/ui/table";
	import { Checkbox } from "$lib/components/ui/checkbox";
	import { writable } from 'svelte/store';
	import AutoForm from '$lib/components/form/AutoForm.svelte';
	import { addressDetailFormDef } from '$lib/data/form/zakaznici/addressDetail';

	let hasMultipleAdresses = true;

	export let data: { response: CustomerData };

	let formValues = writable(data.response)
</script>



<div class="h-full max-w-[1850px] p-3 md:p-4 overflow-auto">
	<Accordion.Root multiple value={["item-"]} class={(hasMultipleAdresses ? "block " : "hidden ") + "flex flex-col w-full"} >
		<Accordion.Item value="item-1" class="w-full">
			<div class="w-full rounded-lg">
				<Accordion.Trigger class="hover:underline-none text-left gap-1">
					<p class="font-bold w-full text-lg">Adresy zákazníka 123456</p>
				</Accordion.Trigger>

				<Accordion.Content class="mt-2 rounded-lg">
					<Table.Root class="">
						<Table.Header class="border-b">
							<!-- <Table.Row> -->
							<Table.Head>Číslo</Table.Head>
							<Table.Head>Jméno</Table.Head>
							<Table.Head>Ulice</Table.Head>
							<Table.Head>PSČ</Table.Head>
							<Table.Head>Město</Table.Head>

							<!-- </Table.Row> -->
						</Table.Header>
						<Table.Body class="overflow-x-auto">

							<Table.Row>
								<Table.Cell class="whitespace-nowrap">123456</Table.Cell>
								<Table.Cell class="whitespace-nowrap">Albi Česká republika</Table.Cell>
								<Table.Cell class="whitespace-nowrap">Lhota za Červeným Kostelcem 436</Table.Cell>
								<Table.Cell class="whitespace-nowrap">500 02</Table.Cell>
								<Table.Cell class="whitespace-nowrap">Červený Kostelec</Table.Cell>
								<Table.Cell class="whitespace-nowrap">
									<button class="font-bold">vybrat</button>
								</Table.Cell>
							</Table.Row>

							<Table.Row>
								<Table.Cell class="whitespace-nowrap">654321</Table.Cell>
								<Table.Cell class="whitespace-nowrap">Albi Česká republika</Table.Cell>
								<Table.Cell class="whitespace-nowrap">Lhota za Červeným Kostelcem 436</Table.Cell>
								<Table.Cell class="whitespace-nowrap">500 02</Table.Cell>
								<Table.Cell class="whitespace-nowrap">Červený Kostelec</Table.Cell>
								<Table.Cell class="whitespace-nowrap">
									<button class="font-bold">vybrat</button>
								</Table.Cell>
							</Table.Row>
						</Table.Body>
					</Table.Root>
				</Accordion.Content>
			</div>
		</Accordion.Item>

		<Accordion.Item value="item-2" class="w-full  md:mt-4">
			<AutoForm autoform={addressDetailFormDef} bind:formValues/>
		</Accordion.Item>

		<Accordion.Item value="item-3" class="w-full mt-2 xl:mt-0 ">

			<SectionLabel name="Kontaktní adresy"/>

			<Table.Root>
				<Table.Header class="border-b">
					<!-- <Table.Row> -->
					<Table.Head class="w-12">Výchozí</Table.Head>
					<Table.Head>Aktivní</Table.Head>
					<Table.Head>Jméno</Table.Head>
					<Table.Head>Příjmení</Table.Head>
					<Table.Head>Mobil</Table.Head>
					<Table.Head>Fax</Table.Head>
					<Table.Head>Pevná linka</Table.Head>
					<Table.Head>Email</Table.Head>
					<Table.Head>Poznámka</Table.Head>
					<!-- </Table.Row> -->
				</Table.Header>

				<Table.Body class="overflow-auto">
					<Table.Row>
						<Table.Cell class="flex justify-center">
							<Checkbox/>
						</Table.Cell>
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
		</Accordion.Item>
	</Accordion.Root>
</div>



<style>
	::-webkit-scrollbar {
		width: 0px;
	}
</style>
