<script lang="ts">
	import FSCheckboxInputWrapper from './../../../../../../lib/components/formsnap/FSCheckboxInputWrapper.svelte';
	import FormContainer from '$lib/components/form/FormContainer.svelte';
	import FormSectionFull from '$lib/components/form/FormSectionFull.svelte';
	import FormSectionHalf from '$lib/components/form/FormSectionHalf.svelte';
	import SectionLabel from '$lib/components/label/SectionLabel.svelte';
	import { superForm } from "sveltekit-superforms";
	import { zodClient } from "sveltekit-superforms/adapters";
	import { schema } from "./schema.js";
	import { get } from "svelte/store";
	import type { CustomerData } from "$lib/types/tables/zakaznici.js";
	import FSInputWrapper from '$lib/components/formsnap/FSInputWrapper.svelte';
	import { showFulltextSearchStore } from '$lib/stores/tableStore.js';
	import { isMobileLayoutExpandedStore } from '$lib/stores/pageStore.js';
	import DetailScrollButton from '$lib/components/button/DetailScrollButton.svelte';
	import FSCheckboxWrapper from '$lib/components/formsnap/FSCheckboxWrapper.svelte';
	import FSDropdownWrapper from '$lib/components/formsnap/FSDropdownWrapper.svelte';
	import { customerRank, paymentTypeCode } from '$lib/constants/detailConstants';

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

	initialFormData.i_Name = initialData.i_Name || null;
	initialFormData.i_Street = initialData.i_Street || null;
	initialFormData.i_City = initialData.i_City || null;
	initialFormData.i_PostalCode = initialData.i_PostalCode || null;
	initialFormData.i_CountryCode = initialData.i_CountryCode || null;
	initialFormData.i_ICO = initialData.i_ICO || null;
	initialFormData.i_DIC = initialData.i_DIC || null;
	initialFormData.i_IcDph = initialData.i_IcDph || null;

	initialFormData.customerAddressCode = initialData.customerAddressCode || null;
	initialFormData.name = initialData.name || null;
	initialFormData.companyName = initialData.companyName || null;
	initialFormData.street = initialData.street || null;
	initialFormData.city = initialData.city || null;
	initialFormData.postalCode = initialData.postalCode || null;
	initialFormData.countryCode = initialData.countryCode || null;

	initialFormData.consignmentSaleEnabled = initialData.consignmentSaleEnabled || null;
	initialFormData.paymentTypeCode = initialData.paymentTypeCode || "";
	initialFormData.dueDays = initialData.dueDays || null;
	initialFormData.invoiceCopies = initialData.invoiceCopies || null; 
	initialFormData.deliveryNoteCopies = initialData.deliveryNoteCopies || null;
	initialFormData.customerRank = initialData.customerRank || "";
	initialFormData.retailStoreTypeId = initialData.retailStoreTypeId || null;
	initialFormData.customerStoreCode = initialData.customerStoreCode || null;
	initialFormData.customerStoreEan = initialData.customerStoreEan || null;
	initialFormData.sendInvoiceViaEmail = initialData.sendInvoiceViaEmail || null;
	initialFormData.emailForInvoicing = initialData.emailForInvoicing || null;

	$: console.log($formData);
</script>



<div class="flex h-full gap-4 max-w-[1400px] p-4 overflow-auto">
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

			<FormContainer>
				<FSInputWrapper bind:value={$formData.i_Name} form={form} name="i_Name" label="Jméno" />

				<FormSectionFull>
					<FSInputWrapper bind:value={$formData.i_Street} form={form} name="i_Street" label="Ulice" />
					<FSInputWrapper bind:value={$formData.i_City} form={form} name="i_City" label="Město" />
				</FormSectionFull>
				
				<FormSectionFull>
					<FSInputWrapper bind:value={$formData.i_PostalCode} form={form} name="i_PostalCode" label="PSČ" />
					<FSInputWrapper bind:value={$formData.i_CountryCode} form={form} name="i_CountryCode" label="Země" />
				</FormSectionFull>

				<FormSectionFull>
					<FSInputWrapper bind:value={$formData.i_ICO} form={form} name="i_ICO" label="IČO" />
					<FSInputWrapper bind:value={$formData.i_DIC} form={form} name="i_DIC" label="DIČ" />
				</FormSectionFull>

				<FormSectionHalf>
					<FSInputWrapper bind:value={$formData.i_IcDph} form={form} name="i_IcDph" label="IčDPH" />
				</FormSectionHalf>
			</FormContainer>
		</div>

		<div id="dodaci-adresa" class="flex flex-col gap-2 mt-4">
			<SectionLabel name="DODACÍ ADRESA" />

			<FormContainer>
				<FormSectionFull>
					<FSInputWrapper bind:value={$formData.name} form={form} name="name" label="Název" />
				</FormSectionFull>

				<FormSectionFull>
					<FSInputWrapper bind:value={$formData.street} form={form} name="street" label="Ulice" />
					<FSInputWrapper bind:value={$formData.city} form={form} name="city" label="Město" />
				</FormSectionFull>

				<FormSectionFull>
					<FSInputWrapper bind:value={$formData.postalCode} form={form} name="postalCode" label="PSČ" />
					<FSInputWrapper bind:value={$formData.countryCode} form={form} name="countryCode" label="Země" />
				</FormSectionFull>

				<FormSectionFull>
					<FSInputWrapper bind:value={$formData.companyName} form={form} name="companyName" label="Společnost" />
					<FSInputWrapper bind:value={$formData.customerAddressCode} form={form} name="i_customerAddressCode" label="Číslo zákazníka" type="number" />
				</FormSectionFull>
			</FormContainer>
		</div>

		<div id="nastaveni" class="flex flex-col gap-2 mt-4">
			<SectionLabel name="NASTAVENÍ" />

			<FormContainer>
				<FormSectionFull>
					<div class="w-full hidden md:block">
						<FSCheckboxWrapper bind:value={$formData.consignmentSaleEnabled} form={form} name="consignmentSaleEnabled" label="Komise" />
					</div>
					<FSDropdownWrapper bind:value={$formData.paymentTypeCode} form={form} options={paymentTypeCode} name="paymentTypeCode" label="Typ platby" />
				</FormSectionFull>

				<FormSectionFull>
					<FSInputWrapper bind:value={$formData.dueDays} form={form} name="dueDays" label="Splatnost" type="number" />
					<FSInputWrapper bind:value={$formData.invoiceCopies} form={form} name="invoiceCopies" label="Počet faktur" type="number" />
				</FormSectionFull>
				
				<FormSectionFull>
					<FSInputWrapper bind:value={$formData.deliveryNoteCopies} form={form} name="deliveryNoteCopies" label="Počet dodacích listů" type="number" />
					<FSDropdownWrapper bind:value={$formData.customerRank} form={form} options={customerRank} name="customerRank" label="Bonita" />
				</FormSectionFull>
				
				<FormSectionFull>
					<FSInputWrapper bind:value={$formData.retailStoreTypeId} form={form} name="retailStoreTypeId" label="Typ prodejny" type="number" />
					<FSInputWrapper bind:value={$formData.retailStoreTypeId} form={form} name="retailStoreTypeId" label="Typ prodejny" type="number" />
				</FormSectionFull>
				
				<FormSectionFull>
					<FSInputWrapper bind:value={$formData.customerStoreCode} form={form} name="customerStoreCode" label="ID zákazníka dle zákazníka" type="number" />
					<FSInputWrapper bind:value={$formData.customerStoreEan} form={form} name="customerStoreEan" label="EAN zákazníka" />
				</FormSectionFull>
				
				<!-- <FormSectionFull>
					<FSCheckboxInputWrapper bind:isChecked={$formData.sendInvoiceViaEmail} bind:value={$formData.emailForInvoicing} form={form} name="customerStoreCode" label="Email pro fakturaci" type="number" />
					<FSInputWrapper bind:value={$formData.customerStoreEan} form={form} name="customerStoreEan" label="EAN zákazníka" />
				</FormSectionFull>  -->

				<FormSectionFull>
					<FSCheckboxWrapper bind:value={$formData.consignmentSaldeEnabled} form={form} name="consignmentSaleEnabled" label="Vratka povolena" />
					<FSCheckboxWrapper bind:value={$formData.consignmentSadleEnabled} form={form} name="consignmentSaleEnabled" label="Požívat asortní EANy" />
				</FormSectionFull>
				
				<FormSectionFull>
					<FSCheckboxWrapper bind:value={$formData.consignmentSaleEndabled} form={form} name="consignmentSaleEnabled" label="Balit do KLT" />
					<FSCheckboxWrapper bind:value={$formData.consignmentSaleEdnabled} form={form} name="consignmentSaleEnabled" label="Food/Nonfood" />
				</FormSectionFull>
			</FormContainer>
		</div>

		<div id="popis" class="flex flex-col gap-2 mt-4">
			<SectionLabel name="POPIS" />

			<FormContainer>
				popis
			</FormContainer>
		</div>

		<div id="oz-a-oblasti" class="flex flex-col gap-2 mt-4">
			<SectionLabel name="OZ A OBLASTI" />

			<FormContainer>
				oz a oblasti
			</FormContainer>
		</div>

		<div id="struktura" class="flex flex-col gap-2 mt-4">
			<SectionLabel name="STRUKTURA" />

			<FormContainer>
				struktura
			</FormContainer>
		</div>

		<div id="aviza" class="flex flex-col gap-2 mt-4">
			<SectionLabel name="AVÍZA" />

			<FormContainer>
				aviza
			</FormContainer>
		</div>
	</form>
</div>



<style>
	::-webkit-scrollbar {
		width: 0px;
	}
</style>
