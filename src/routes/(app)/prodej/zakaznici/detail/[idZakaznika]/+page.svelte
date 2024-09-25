<script lang="ts">
	import SectionLabel from '$lib/components/label/SectionLabel.svelte';
	import { superForm } from "sveltekit-superforms";
	import { zodClient } from "sveltekit-superforms/adapters";
	import { schema } from "./schema.js";
	import { get } from "svelte/store";
	import type { CustomerData } from "$lib/types/tables/zakaznici.js";
	import FormFieldWrapper from '$lib/components/formsnap/FormFieldWrapper.svelte';
	import { showFulltextSearchStore } from '$lib/stores/tableStore.js';
	import { isMobileLayoutExpandedStore } from '$lib/stores/pageStore.js';
	import DetailScrollButton from '$lib/components/button/DetailScrollButton.svelte';
 
	export let data: { superForms: any, response: CustomerData};
	const initialData = data.response.item || {};
	console.log(initialData);
	
	const form = superForm(data.superForms.form, {
		validators: zodClient(schema),
	});

	const { form: formData, enhance } = form;

	showFulltextSearchStore.set(false);
	isMobileLayoutExpandedStore.set(false);

	let initialFormData = get(formData)

	initialFormData.i_Name = initialData.i_Name || "";
	initialFormData.i_Street = initialData.i_Street || "";
	initialFormData.i_City = initialData.i_City || "";
	initialFormData.i_PostalCode = initialData.i_PostalCode || "";
	initialFormData.i_CountryCode = initialData.i_CountryCode || "";
	initialFormData.i_ICO = initialData.i_ICO || "";
	initialFormData.i_DIC = initialData.i_DIC || "";
	initialFormData.i_IcDph = initialData.i_IcDph || "";

	initialFormData.customerAddressCode = initialData.customerAddressCode || 0;
	initialFormData.name = initialData.name || "";
	initialFormData.companyName = initialData.companyName || "";
	initialFormData.street = initialData.street || "";
	initialFormData.city = initialData.city || "";
	initialFormData.postalCode = initialData.postalCode || "";
	initialFormData.countryCode = initialData.countryCode || "";

	$: console.log($formData);

	
</script>



<div class="flex h-full gap-8 max-w-[1400px] p-4 overflow-auto">
	<div class="hidden lg:block sticky w-[280px] h-fit ">
		<p class="font-bold">Detail zákazníka č. {initialData.customerAddressCode}</p>

		<div class="flex flex-col gap-1 items-start mt-4 text-slate-500 text-sm">
			<DetailScrollButton href="fakturacni-udaje" label="Fakturační údaje" />
			<DetailScrollButton href="dodaci-adresa" label="Dodací adresa" />
			<DetailScrollButton href="nastaveni" label="Nastavení" />
			<DetailScrollButton href="popis" label="Popis" />
			<DetailScrollButton href="oz-a-oblasti" label="OZ a oblasti" />
			<DetailScrollButton href="struktura" label="Struktura" />
			<DetailScrollButton href="aviza" label="Avíza" />
		</div>
	</div>


	<form use:enhance class="w-full overflow-auto" method="POST">
		<div id="fakturacni-udaje" class="flex flex-col gap-2">
			<SectionLabel name="FAKTURAČNÍ ÚDAJE" />

			<div>
				<FormFieldWrapper bind:value={$formData.i_Name} form={form} name="i_Name" label="Jméno" />
			</div>

			<div class="flex flex-col gap-2 md:flex-row md:gap-4">
				<FormFieldWrapper bind:value={$formData.i_Street} form={form} name="i_Street" label="Ulice" />
				<FormFieldWrapper bind:value={$formData.i_City} form={form} name="i_City" label="Město" />
			</div>
			
			<div class="flex flex-col gap-2 md:flex-row md:gap-4">
				<FormFieldWrapper bind:value={$formData.i_PostalCode} form={form} name="i_PostalCode" label="PSČ" />
				<FormFieldWrapper bind:value={$formData.i_CountryCode} form={form} name="i_CountryCode" label="Země" />
			</div>
			
			<div class="flex flex-col gap-2 md:flex-row md:gap-4">
				<FormFieldWrapper bind:value={$formData.i_ICO} form={form} name="i_ICO" label="IČO" />
				<FormFieldWrapper bind:value={$formData.i_DIC} form={form} name="i_DIC" label="DIČ" />
			</div>

			<div class="md:w-1/2 md:pr-2">
				<FormFieldWrapper bind:value={$formData.i_IcDph} form={form} name="i_IcDph" label="IčDPH" />
			</div>
		</div>


		<div id="dodaci-adresa" class="flex flex-col gap-2 mt-5">
			<SectionLabel name="DODACÍ ADRESA" />
			
			<div class="flex flex-col gap-2 md:flex-row md:gap-4">
				<FormFieldWrapper bind:value={$formData.name} form={form} name="name" label="Název" />
				<FormFieldWrapper bind:value={$formData.companyName} form={form} name="companyName" label="Společnost" />
			</div>
			
			<div class="flex flex-col gap-2 md:flex-row md:gap-4">
				<FormFieldWrapper bind:value={$formData.street} form={form} name="street" label="Ulice" />
				<FormFieldWrapper bind:value={$formData.city} form={form} name="city" label="Město" />
			</div>
			
			<div class="flex flex-col gap-2 md:flex-row md:gap-4">
				<FormFieldWrapper bind:value={$formData.postalCode} form={form} name="postalCode" label="PSČ" />
				<FormFieldWrapper bind:value={$formData.countryCode} form={form} name="countryCode" label="Země" />
			</div>

			<div class="md:w-1/2 md:pr-2">
				<FormFieldWrapper bind:value={$formData.customerAddressCode} form={form} name="i_customerAddressCode" label="Číslo zákazníka" type="number" />
			</div>
		</div>


		<div id="nastaveni" class="flex flex-col gap-2 mt-5 h-80">
			<SectionLabel name="NASTAVENÍ" />
		</div>

		<div id="popis" class="flex flex-col gap-2 mt-5 h-80">
			<SectionLabel name="POPIS" />
		</div>

		<div id="oz-a-oblasti" class="flex flex-col gap-2 mt-5 h-80">
			<SectionLabel name="OZ A OBLASTI" />
		</div>

		<div id="struktura" class="flex flex-col gap-2 mt-5 h-80">
			<SectionLabel name="STRUKTURA" />
		</div>

		<div id="aviza" class="flex flex-col gap-2 mt-5 h-80">
			<SectionLabel name="AVÍZA" />
		</div>
	</form>
</div>



<style>
	::-webkit-scrollbar {
		width: 0px;
	}
</style>