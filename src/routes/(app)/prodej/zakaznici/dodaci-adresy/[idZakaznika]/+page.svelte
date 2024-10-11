<script lang="ts">
	import * as Table from "$lib/components/ui/table";
	import * as Accordion from "$lib/components/ui/accordion";
	import type { CustomerData } from "$lib/types/tables/zakaznici";
	import { superForm } from "sveltekit-superforms";
	import { zodClient } from "sveltekit-superforms/adapters";
	import { schema } from "./schema";
	import { showFulltextSearchStore } from "$lib/stores/tableStore";
	import { isMobileLayoutExpandedStore } from "$lib/stores/pageStore";
	import FSInputWrapper from '$lib/components/formsnap/FSInputWrapper.svelte';
	import FSDropdownWrapper from '$lib/components/formsnap/FSDropdownWrapper.svelte';
	import FSCheckboxWrapper from '$lib/components/formsnap/FSCheckboxWrapper.svelte';
	import SectionLabel from "$lib/components/label/SectionLabel.svelte";
	import FormSectionFull from '$lib/components/form/FormSectionFull.svelte';
	import FormContainer from "$lib/components/form/FormContainer.svelte";
	import { customerRank, paymentTypeCode } from "$lib/constants/detailConstants";




	let hasMultipleAdresses = true;

	export let data: { superForms: any, response: CustomerData};
	const initialData = data.response.item || {};
	console.log(initialData);
	
	const form = superForm(data.superForms.form, {
		validators: zodClient(schema),
	});

	const { form: formData, enhance } = form;
	showFulltextSearchStore.set(false);
	isMobileLayoutExpandedStore.set(false);

	$: console.log($formData);


</script>



<div class="flex h-full  max-w-[1400px]  overflow-auto">



	<Accordion.Root multiple value={["item-1", "item-2", "item-3"]} class={(hasMultipleAdresses ? "block " : "hidden ") + "w-full flex flex-col "} >
		<Accordion.Item value="item-1" class="w-full">
			<div class="w-full p-4 rounded-lg">
				<Accordion.Trigger class="hover:underline-none text-left">
					<p class="font-bold w-full text-lg">Dodací adresy zákazníka 123456789</p>
				</Accordion.Trigger>

				<Accordion.Content class="mt-4 bg-slate-50 px-2  rounded-lg">
					<Table.Root>
						<Table.Body class="">
							<Table.Row>
								<Table.Cell>Albert Česká republika</Table.Cell>
								<Table.Cell>Karla Hynka Máchy 736/7</Table.Cell>
								<Table.Cell>500 02</Table.Cell>
								<Table.Cell>Hradec Králové</Table.Cell>
								<Table.Cell>
									<button class="font-bold">vybrat</button>
								</Table.Cell>
							</Table.Row>
							<Table.Row>
								<Table.Cell>Albert Česká republika</Table.Cell>
								<Table.Cell>Zlechov 3</Table.Cell>
								<Table.Cell>687 10</Table.Cell>
								<Table.Cell>Zlechov</Table.Cell>
								<Table.Cell>
									<button class="font-bold">vybrat</button>
								</Table.Cell>
							</Table.Row>
						</Table.Body>
					</Table.Root>
				</Accordion.Content>
			</div>
		</Accordion.Item>

		<Accordion.Item value="item-2" class="w-full overflow-auto">
			<div class="w-full p-4 pt-0 rounded-lg ">
				<form use:enhance class="" method="POST">
					<div class="xl:flex gap-4">
						<div class="w-full">
							<div>
								<SectionLabel name="Detail adresy"/>

								<FormContainer>
									<FormSectionFull>
										<FSInputWrapper bind:value={$formData.customerAddressCode} form={form} name="i_customerAddressCode" label="Číslo dodací adresy" type="number" />
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
									</FormSectionFull>
								</FormContainer>
							</div>

							<div class="mt-2">
								<SectionLabel name="Popis"/>

								<FormContainer>
									<FSInputWrapper bind:value={$formData.customerStoreEan} form={form} name="invoiceCopies" label="Poznámka" />

									<FormSectionFull>
										<FSInputWrapper bind:value={$formData.customerStoreEan} form={form} name="dueDays" label="Bližší popis"  />
										<FSInputWrapper bind:value={$formData.customerStoreEan} form={form} name="dueDays" label="Zodpovědná osoba"  />
									</FormSectionFull>

									<FSInputWrapper bind:value={$formData.customerStoreEan} form={form} name="invoiceCopies" label="Poznámka pro balení" />
								</FormContainer>
							</div>	
						</div>

						<div class="w-full">
							<div>
								<SectionLabel name="Nastavení"/>

								<FormContainer>
									<FormSectionFull>
										<FSDropdownWrapper bind:value={$formData.paymentTypeCode} form={form} options={paymentTypeCode} name="paymentTypeCode" label="Typ platby" />
										<FSInputWrapper bind:value={$formData.dueDays} form={form} name="dueDays" label="Splatnost" type="number" />
									</FormSectionFull>
									
									<FormSectionFull>
										<FSInputWrapper bind:value={$formData.invoiceCopies} form={form} name="invoiceCopies" label="Počet faktur" type="number" />
										<FSInputWrapper bind:value={$formData.deliveryNoteCopies} form={form} name="deliveryNoteCopies" label="Počet dodacích listů" type="number" />
									</FormSectionFull>
									
									<FormSectionFull>
										<FSDropdownWrapper bind:value={$formData.customerRank} form={form} options={customerRank} name="customerRank" label="Bonita" />
										<FSDropdownWrapper bind:value={$formData.paymentTypeCode} form={form} options={paymentTypeCode} name="paymentTypeCode" label="Typ prodejny" />
									</FormSectionFull>
									
									<FormSectionFull>
										<FSInputWrapper bind:value={$formData.customerStoreCode} form={form} name="customerStoreCode" label="ID zákazníka dle zákazníka" type="number" />
										<FSInputWrapper bind:value={$formData.customerStoreEan} form={form} name="customerStoreEan" label="EAN zákazníka" />
									</FormSectionFull>
									
									<FormSectionFull>
										<FSCheckboxWrapper bind:value={$formData.consignmentSaleEnabled} form={form} name="consignmentSaleEnabled" label="Komise" />
										<FSCheckboxWrapper bind:value={$formData.consignmentSaldeEnabled} form={form} name="consignmentSaleEnabled" label="Vratka povolena" />
										<FSCheckboxWrapper bind:value={$formData.consignmentSaldeEnabled} form={form} name="consignmentSaleEnabled" label="Kontrola u vratek" />
									</FormSectionFull>

									<FormSectionFull>
										<FSCheckboxWrapper bind:value={$formData.consignmentSadleEnabled} form={form} name="consignmentSaleEnabled" label="Požívat as. EANy" />
										<FSCheckboxWrapper bind:value={$formData.consignmentSaleEndabled} form={form} name="consignmentSaleEnabled" label="Balit do KLT" />
										<FSCheckboxWrapper bind:value={$formData.consignmentSaleEdnabled} form={form} name="consignmentSaleEnabled" label="Food/Nonfood" />
									</FormSectionFull>
								</FormContainer>
							</div>
							
							<div class="mt-2">
								<SectionLabel name="OZ a oblasti"/>

								<FormContainer>
									<FormSectionFull>
										<FSInputWrapper bind:value={$formData.customerStoreEan} form={form} name="dueDays" label="OZ"  />
										<FSInputWrapper bind:value={$formData.customerStoreEan} form={form} name="dueDays" label="OM"  />
									</FormSectionFull>
									
									<FormSectionFull>
										<FSInputWrapper bind:value={$formData.customerStoreEan} form={form} name="dueDays" label="Oblast"  />
										<FSInputWrapper bind:value={$formData.customerStoreEan} form={form} name="dueDays" label="Merchendiser"  />
									</FormSectionFull>
								</FormContainer>
							</div>
						</div>
					</div>
				</form>
			</div>
		</Accordion.Item>

	</Accordion.Root>
</div>



<style>
	::-webkit-scrollbar {
		width: 0px;
	}
</style>
