<script lang="ts">
	import Pencil from 'lucide-svelte/icons/pencil';
	import * as Dialog from "$lib/components/ui/dialog/index.js";
	import * as Table from "$lib/components/ui/table";
	import type { CustomerData } from "$lib/types/tables/zakaznici";
	import { superForm } from "sveltekit-superforms";
	import { zodClient } from "sveltekit-superforms/adapters";
	import FSInputWrapper from '$lib/components/formsnap/FSInputWrapper.svelte';
	import { schema } from "./schema";
	import FormEmptyField from "$lib/components/form/FormEmptyField.svelte";
	import SectionLabel from "$lib/components/label/SectionLabel.svelte";
	import FSCheckboxWrapper from '$lib/components/formsnap/FSCheckboxWrapper.svelte';
	import FormCheckboxSection from '$lib/components/form/FormCheckboxSection.svelte';
	import AutoForm from '$lib/components/form/AutoForm.svelte';
	import { zakazniciDetailFormDef } from '$lib/data/autoform/zakaznici-detail';
	import FormContainer from '$lib/components/form/FormContainer.svelte';
	import FormSectionFull from '$lib/components/form/FormSectionFull.svelte';


	export let data: { superForms: any, response: CustomerData};
	const initialData = data.response.item || {};
	console.log(initialData);
	
	const form = superForm(data.superForms.form, {
		validators: zodClient(schema),
	});

	const { form: formData, enhance } = form;
</script>


<div class="h-full max-w-[1600px] overflow-auto p-3 md:p-4">
	<p class="font-bold w-full text-lg mb-2 md:mb-4">Detail zákazníka {initialData.customerNodeCode}</p>

	<form use:enhance method="POST" autocomplete="off">
		<div class="xl:flex gap-4">
			<div class="w-full">

				<div>
					<SectionLabel name="Název sekce"/>

					<FormContainer>
						<FormSectionFull>
							<FSInputWrapper bind:value={$formData.name} form={form} name="i" label="Název"/>
						</FormSectionFull>
						
						<FormSectionFull>
							<FSInputWrapper bind:value={$formData.name} form={form} name="name" label="Jméno" />
							<FSInputWrapper bind:value={$formData.name} form={form} name="name" label="Příjmení" />
						</FormSectionFull>
					</FormContainer>
				</div>
				
				<div class="mt-2">
					<SectionLabel name="Název sekce"/>

					<FormContainer>
						<FormSectionFull>
							<FSInputWrapper bind:value={$formData.name} form={form} name="i" label="Id ALBI dodavatel"/>
							<FSInputWrapper bind:value={$formData.name} form={form} name="name" label="Typ KZ" />
						</FormSectionFull>
													
						<FormSectionFull>
							<FSInputWrapper bind:value={$formData.name} form={form} name="name" label="Úvěrový rámec" />
							<FSInputWrapper bind:value={$formData.name} form={form} name="name" label="Nesplaceno" />
						</FormSectionFull>

						<FormSectionFull>
							<FSInputWrapper bind:value={$formData.name} form={form} name="name" label="Poslední platba" />
							<FSInputWrapper bind:value={$formData.name} form={form} name="name" label="Popis bližší" />
						</FormSectionFull>
					</FormContainer>
				</div>

				<div class="mt-2">
					<SectionLabel name="Název sekce"/>

					<FormContainer>
						<FormSectionFull>
							<FSInputWrapper bind:value={$formData.name} form={form} name="i" label="Reg. email do eshopu"/>
							<FSInputWrapper bind:value={$formData.name} form={form} name="name" label="Typ" />
						</FormSectionFull>
													
						<FormSectionFull>
							<FSInputWrapper bind:value={$formData.name} form={form} name="name" label="Datum narození" />
							<FormEmptyField/>
						</FormSectionFull>
					</FormContainer>
				</div>

				<div class="mt-2">
					<SectionLabel name="Název sekce"/>

					<FormContainer>
						<FormCheckboxSection>
							<FSCheckboxWrapper bind:value={$formData.co} form={form} name="co" label="Výstupní kontrola" />
							<FSCheckboxWrapper bind:value={$formData.co} form={form} name="co" label="DL tisk cena" />
							<FSCheckboxWrapper bind:value={$formData.co} form={form} name="co" label="Faktury dodatečně" />
							<FSCheckboxWrapper bind:value={$formData.co} form={form} name="co" label="Smlouva" />
							<FSCheckboxWrapper bind:value={$formData.co} form={form} name="co" label="Účtovat bez DPH" />
							<FSCheckboxWrapper bind:value={$formData.co} form={form} name="co" label="Živnostenský list" />
							<FSCheckboxWrapper bind:value={$formData.co} form={form} name="co" label="Neblokovat" />
							<FSCheckboxWrapper bind:value={$formData.co} form={form} name="co" label="Nevyžadovat potvrzení faktury" />
							<FSCheckboxWrapper bind:value={$formData.co} form={form} name="co" label="Neupomínat" />
							<FSCheckboxWrapper bind:value={$formData.co} form={form} name="co" label="Zasílat novinky" />
							<FSCheckboxWrapper bind:value={$formData.co} form={form} name="co" label="B2B aktivní" />
							<FormEmptyField/>	
						</FormCheckboxSection>
					</FormContainer>
				</div>
			</div>

			<div class="xl:hidden h-4"></div>
			

			<div class="w-full">
				<div>
					<div class="flex justify-between">
						<SectionLabel name="Fakturační adresa"/>

						<Dialog.Root>
							<Dialog.Trigger>
								<Pencil class="size-4 text-albi-500"/>
							</Dialog.Trigger>
							<Dialog.Content class="sm:max-w-[425px]">
								<Dialog.Header>
									<Dialog.Title>Fakturační adresy</Dialog.Title>
								</Dialog.Header>
								
								<Dialog.Footer>
									footer
								</Dialog.Footer>
							</Dialog.Content>
						</Dialog.Root>
					</div>

					<FormContainer>
						<FormSectionFull>
							<FSInputWrapper bind:value={$formData.name} form={form} name="i" label="Název"/>
							<FSInputWrapper bind:value={$formData.name} form={form} name="name" label="Ulice" />
						</FormSectionFull>

						<FormSectionFull>
							<FSInputWrapper bind:value={$formData.name} form={form} name="name" label="Město" />
							<FSInputWrapper bind:value={$formData.name} form={form} name="name" label="PSČ" />
						</FormSectionFull>

						<FormSectionFull>
							<FSInputWrapper bind:value={$formData.name} form={form} name="name" label="Země" />
							<FSInputWrapper bind:value={$formData.name} form={form} name="name" label="IČO" />
						</FormSectionFull>

						<FormSectionFull>
							<FSInputWrapper bind:value={$formData.name} form={form} name="name" label="DIČ" />
							<FSInputWrapper bind:value={$formData.name} form={form} name="name" label="IčDPH" />
						</FormSectionFull>
					</FormContainer>
				</div>

				<div class="mt-2">
					<SectionLabel name="Název sekce"/>

					<FormContainer>
						<FormSectionFull>
							<FSInputWrapper bind:value={$formData.name} form={form} name="i" label="EDI EAN schránky"/>
							<FSInputWrapper bind:value={$formData.name} form={form} name="name" label="EDI EAN centrály" />
						</FormSectionFull>

						<div class="flex gap-4 mt-1">
							<div class="w-full flex flex-col gap-2">
								<FSCheckboxWrapper bind:value={$formData.co} form={form} name="co" label="EDI dodací list" />
								<FSCheckboxWrapper bind:value={$formData.co} form={form} name="co" label="EDI použít diakritiku" />
							</div>
							
							<div class="w-full flex flex-col gap-2">
								<FSCheckboxWrapper bind:value={$formData.co} form={form} name="co" label="EDI dobropis" />
								<FSCheckboxWrapper bind:value={$formData.co} form={form} name="co" label="EDI faktury" />
							</div>
						</div>
						
						
					</FormContainer>

				</div>

				<div class="mt-2">
					<SectionLabel name="Název sekce"/>

					<FormContainer>
						<FormSectionFull>
							<FSInputWrapper bind:value={$formData.name} form={form} name="i" label="Node (síť)"/>
							<FSInputWrapper bind:value={$formData.name} form={form} name="name" label="Výchozí FA adresa" />
						</FormSectionFull>
						
						<FormSectionFull>
							<FSInputWrapper bind:value={$formData.name} form={form} name="name" label="Typ FA adresy" />
							<FormEmptyField/>
						</FormSectionFull>
					</FormContainer>

				</div>
				
				<div class="mt-2">
					<SectionLabel name="Název sekce"/>

					<FormContainer>
						<FormCheckboxSection>
							<FSCheckboxWrapper bind:value={$formData.co} form={form} name="co" label="Země" />
							<FSCheckboxWrapper bind:value={$formData.co} form={form} name="co" label="Aktivní" />
							<FSCheckboxWrapper bind:value={$formData.co} form={form} name="co" label="Blokovaný zákazník"/>
							<FSCheckboxWrapper bind:value={$formData.co} form={form} name="co" label="Neplatič" />
							<FSCheckboxWrapper bind:value={$formData.co} form={form} name="co" label="Schváleno" />
							<FormEmptyField/>
						</FormCheckboxSection>
					</FormContainer>
				</div>
			</div>
		</div>
	</form>

	<div class="mt-2">
		<SectionLabel name="Kontaktní adresy"/>

		<Table.Root>
			<Table.Header class="border-b">
				<!-- <Table.Row> -->
					<Table.Head>Výchozí</Table.Head> 
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

<style>
	::-webkit-scrollbar {
		width: 0px;
	}
</style>
