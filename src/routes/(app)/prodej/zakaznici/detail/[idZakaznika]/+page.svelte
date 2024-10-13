<script lang="ts">
	import Pencil from 'lucide-svelte/icons/pencil';
	import * as Dialog from "$lib/components/ui/dialog/index.js";
	import type { CustomerData } from "$lib/types/tables/zakaznici";
	import { superForm } from "sveltekit-superforms";
	import { zodClient } from "sveltekit-superforms/adapters";
	import FSInputWrapper from '$lib/components/formsnap/FSInputWrapper.svelte';
	import { schema } from "./schema";
	import FormContainer from "$lib/components/form/FormContainer.svelte";
	import FormSectionFull from "$lib/components/form/FormSectionFull.svelte";
	import FormEmptyField from "$lib/components/form/FormEmptyField.svelte";
	import SectionLabel from "$lib/components/label/SectionLabel.svelte";
	import FSCheckboxWrapper from '$lib/components/formsnap/FSCheckboxWrapper.svelte';

	export let data: { superForms: any, response: CustomerData};
	const initialData = data.response.item || {};
	console.log(initialData);
	
	const form = superForm(data.superForms.form, {
		validators: zodClient(schema),
	});

	const { form: formData, enhance } = form;
</script>


<div class="h-full max-w-[1400px] overflow-auto p-4">
	<p class="font-bold w-full text-lg mb-4">Detail zákazníka 123456789</p>

	<div class="xl:flex gap-4">
		<div class="w-full">
			<div>
				<SectionLabel name="Název sekce"/>

				<FormContainer>
					<FormSectionFull>
						<FSInputWrapper bind:value={$formData.name} form={form} name="i" label="Název"/>
						<FSInputWrapper bind:value={$formData.name} form={form} name="name" label="Jméno" />
					</FormSectionFull>
												
					<FormSectionFull>
						<FSInputWrapper bind:value={$formData.name} form={form} name="name" label="Příjmení" />
						<FormEmptyField/>
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
					<FormSectionFull>
						<FSCheckboxWrapper bind:value={$formData.co} form={form} name="consignmentSaleEnabled" label="Výstupní kontrola" />
						<FSCheckboxWrapper bind:value={$formData.co} form={form} name="consignmentSaleEnabled" label="DL tisk cena" />
					</FormSectionFull>
					
					<FormSectionFull>
						<FSCheckboxWrapper bind:value={$formData.co} form={form} name="consignmentSaleEnabled" label="Faktury dodatečně" />
						<FSCheckboxWrapper bind:value={$formData.co} form={form} name="consignmentSaleEnabled" label="Smlouva" />
					</FormSectionFull>

					<FormSectionFull>
						<FSCheckboxWrapper bind:value={$formData.co} form={form} name="consignmentSaleEnabled" label="Účtovat bez DPH" />
						<FSCheckboxWrapper bind:value={$formData.co} form={form} name="consignmentSaleEnabled" label="Živnostenský list" />
					</FormSectionFull>

					<FormSectionFull>
						<FSCheckboxWrapper bind:value={$formData.co} form={form} name="consignmentSaleEnabled" label="Neblokovat" />
						<FSCheckboxWrapper bind:value={$formData.co} form={form} name="consignmentSaleEnabled" label="Nevyžadovat potvrzení faktury" />
					</FormSectionFull>

					<FormSectionFull>
						<FSCheckboxWrapper bind:value={$formData.co} form={form} name="consignmentSaleEnabled" label="Neupomínat" />
						<FSCheckboxWrapper bind:value={$formData.co} form={form} name="consignmentSaleEnabled" label="Zasílat novinky" />
					</FormSectionFull>

					<FormSectionFull>
						<FSCheckboxWrapper bind:value={$formData.co} form={form} name="consignmentSaleEnabled" label="B2B aktivní" />
						<FormEmptyField/>
					</FormSectionFull>
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

					<FormSectionFull>
						<FSCheckboxWrapper bind:value={$formData.consignmentSadleEnabled} form={form} name="consignmentSaleEnabled" label="EDI dodací list" />
						<FSCheckboxWrapper bind:value={$formData.consignmentSaleEndabled} form={form} name="consignmentSaleEnabled" label="EDI použít diakritiku" />
					</FormSectionFull>
					
					<FormSectionFull>
						<FSCheckboxWrapper bind:value={$formData.consignmentSaleEdnabled} form={form} name="consignmentSaleEnabled" label="EDI dobropis" />
						<FSCheckboxWrapper bind:value={$formData.consignmentSaleEdnabled} form={form} name="consignmentSaleEnabled" label="EDI faktury" />
					</FormSectionFull>
					
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
					<FormSectionFull>
						<FSCheckboxWrapper bind:value={$formData.co} form={form} name="consignmentSaleEnabled" label="Země" />
						<FSCheckboxWrapper bind:value={$formData.co} form={form} name="consignmentSaleEnabled" label="Aktivní" />
					</FormSectionFull>
					
					<FormSectionFull>
						<FSCheckboxWrapper bind:value={$formData.co} form={form} name="consignmentSaleEnabled" label="Blokovaný zákazník"/>
						<FSCheckboxWrapper bind:value={$formData.co} form={form} name="consignmentSaleEnabled" label="Neplatič" />
					</FormSectionFull>

					<FormSectionFull>
						<FSCheckboxWrapper bind:value={$formData.co} form={form} name="consignmentSaleEnabled" label="Schváleno" />
						<FormEmptyField/>
					</FormSectionFull>
				</FormContainer>
			</div>
		</div>
		
	</div>
	


</div>