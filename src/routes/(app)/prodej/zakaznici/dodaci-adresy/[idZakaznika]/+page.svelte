<script lang="ts">
	import { customerRank, paymentTypeCode } from "$lib/constants/detailConstants";
	import { isMobileLayoutExpandedStore } from "$lib/stores/pageStore";
	import { showFulltextSearchStore } from "$lib/stores/tableStore";
	import { superForm } from "sveltekit-superforms";
	import { zodClient } from "sveltekit-superforms/adapters";
	import { schema } from "./schema";
	import type { CustomerData } from "$lib/types/tables/zakaznici";
	import FormCheckboxSection from "$lib/components/form/FormCheckboxSection.svelte";
	import FSDropdownWrapper from '$lib/components/formsnap/FSDropdownWrapper.svelte';
	import FSCheckboxWrapper from '$lib/components/formsnap/FSCheckboxWrapper.svelte';
	import FSInputWrapper from '$lib/components/formsnap/FSInputWrapper.svelte';
	import FormSectionFull from '$lib/components/form/FormSectionFull.svelte';
	import FormContainer from "$lib/components/form/FormContainer.svelte";
	import SectionLabel from "$lib/components/label/SectionLabel.svelte";
	import * as Accordion from "$lib/components/ui/accordion";
	import * as Table from "$lib/components/ui/table";
	import { Checkbox } from "$lib/components/ui/checkbox";

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



<div class="h-full max-w-[1850px] p-3 md:p-4 overflow-auto">
	<Accordion.Root multiple value={["item-"]} class={(hasMultipleAdresses ? "block " : "hidden ") + "flex flex-col w-full"} >
		<Accordion.Item value="item-1" class="w-full">
			<div class="w-full rounded-lg">
				<Accordion.Trigger class="hover:underline-none text-left gap-1">
					<p class="font-bold w-full text-lg">Adresy zákazníka {initialData.customerNodeCode}</p>
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
			<div class="w-full rounded-lg">
				<form use:enhance class="" method="POST" autocomplete="off">
					<div class="xl:flex gap-4">
						<div class="w-full">
							<div class="mt-2 xl:mt-0">
								<SectionLabel name="Detail adresy"/>

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
										<FSInputWrapper bind:value={$formData.customerAddressCode} form={form} name="i_customerAddressCode" label="Číslo dodací adresy" type="number" />
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
							<div class="mt-2 xl:mt-0">
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
									
									<FormCheckboxSection>
										<FSCheckboxWrapper bind:value={$formData.consignmentSaleEnabled} form={form} name="consignmentSaleEnabled" label="Komise" />
										<FSCheckboxWrapper bind:value={$formData.consignmentSaldeEnabled} form={form} name="consignmentSaleEnabled" label="Vratka povolena" />
										<FSCheckboxWrapper bind:value={$formData.consignmentSaldeEnabled} form={form} name="consignmentSaleEnabled" label="Kontrola u vratek" />
										<FSCheckboxWrapper bind:value={$formData.consignmentSadleEnabled} form={form} name="consignmentSaleEnabled" label="Požívat as. EANy" />
										<FSCheckboxWrapper bind:value={$formData.consignmentSaleEndabled} form={form} name="consignmentSaleEnabled" label="Balit do KLT" />
										<FSCheckboxWrapper bind:value={$formData.consignmentSaleEdnabled} form={form} name="consignmentSaleEnabled" label="Food/Nonfood" />
									</FormCheckboxSection>
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
