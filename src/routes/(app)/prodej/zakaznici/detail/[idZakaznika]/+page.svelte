<script lang="ts">
	import { superForm } from "sveltekit-superforms";
	import * as Tabs from '$lib/components/ui/tabs';
	import {
		Field,
		Control,
		Label,
		Description,
		FieldErrors,
		Legend,
	} from "formsnap";
	import { zodClient } from "sveltekit-superforms/adapters";
	import type { PageData } from "../$types.js";
	import { schema } from "./schema.js";
	import SuperDebug from "sveltekit-superforms";
	import { onDestroy } from "svelte";
	import { selectedRowIdStore } from "$lib/stores/tableStore.js";
	import Input from "$lib/components/ui/input/input.svelte";
	import { get } from "svelte/store";
	import type { CustomerData } from "$lib/types/tables/zakaznici.js";
 
	export let data: { superForms: any, response: CustomerData};
	const initialData = data.response.item || {};
	console.log(initialData);
	
 
	const form = superForm(data.superForms.form, {
		validators: zodClient(schema),
	});

	const { form: formData, enhance } = form;


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
	



	const tabTriggerDefinition = [
		{ value: "fakturacni-udaje", label: "Fakturační údaje"},
		{ value: "dodaci-adresa", label: "Dodací adresa"},
		{ value: "nastaveni", label: "Nastavení"},
		{ value: "popis", label: "Popis"},
		{ value: "ostatni", label: "Ostatní"},
	];


	onDestroy(() => {
		// selectedRowIdStore.set(undefined)
	})

	$: console.log($formData);
</script>
 
<div class="h-full max-w-[800px] flex flex-col  p-4">
	<p class="pb-4 font-bold text-slate-950">Detail zákazníka č. {initialData.customerAddressCode}</p>

	<form use:enhance class="h-full w-full" method="POST">
		<Tabs.Root value="fakturacni-udaje" class="rounded-md w-full">
			<div class="w-full flex overflow-auto">
				<Tabs.List class="bg-[#ccd1d9] ">
					{#each tabTriggerDefinition as trigger (trigger)}
						<Tabs.Trigger class="font-bold" value={trigger.value}>
							{trigger.label}
						</Tabs.Trigger>
					{/each}
				</Tabs.List>
			</div>
			

			<Tabs.Content class="mt-4" value="fakturacni-udaje">
				<Field {form} name="i_name">
					<Control let:attrs>
						<Label class="text-sm">Jméno</Label>
						<Input 
							class="w-fit focus-visible:ring-0" {...attrs} type="text" 
							bind:value={$formData.i_Name}
						/>
					</Control>
					<FieldErrors />
				</Field>

				<Field {form} name="i_street">
					<Control let:attrs>
						<Label class="text-sm">Ulice</Label>
						<Input 
							class="w-fit focus-visible:ring-0" {...attrs} type="text" 
							bind:value={$formData.i_Street}
						/>
					</Control>
					<FieldErrors />
				</Field>

				<Field {form} name="i_city">
					<Control let:attrs>
						<Label class="text-sm">Město</Label>
						<Input 
							class="w-fit focus-visible:ring-0" {...attrs} type="text" 
							bind:value={$formData.i_City}
						/>
					</Control>
					<FieldErrors />
				</Field>

				<Field {form} name="i_PostalCode">
					<Control let:attrs>
						<Label class="text-sm">PSČ</Label>
						<Input 
							class="w-fit focus-visible:ring-0" {...attrs} type="text" 
							bind:value={$formData.i_PostalCode}
						/>
					</Control>
					<FieldErrors />
				</Field>

				<Field {form} name="i_CountryCode">
					<Control let:attrs>
						<Label class="text-sm">Země</Label>
						<Input 
							class="w-fit focus-visible:ring-0" {...attrs} type="text" 
							bind:value={$formData.i_CountryCode}
						/>
					</Control>
					<FieldErrors />
				</Field>

				<Field {form} name="i_ICO">
					<Control let:attrs>
						<Label class="text-sm">IČO</Label>
						<Input 
							class="w-fit focus-visible:ring-0" {...attrs} type="text" 
							bind:value={$formData.i_ICO}
						/>
					</Control>
					<FieldErrors />
				</Field>

				<Field {form} name="i_DIC">
					<Control let:attrs>
						<Label class="text-sm">DIČ</Label>
						<Input 
							class="w-fit focus-visible:ring-0" {...attrs} type="text" 
							bind:value={$formData.i_DIC}
						/>
					</Control>
					<FieldErrors />
				</Field>

				<Field {form} name="i_IcDph">
					<Control let:attrs>
						<Label class="text-sm">IčDPH</Label>
						<Input 
							class="w-fit focus-visible:ring-0" {...attrs} type="text" 
							bind:value={$formData.i_IcDph}
						/>
					</Control>
					<FieldErrors />
				</Field>
			</Tabs.Content>
			
			<Tabs.Content class="mt-4" value="dodaci-adresa">
				<Field {form} name="customerAddressCode">
					<Control let:attrs>
						<Label class="text-xs">Číslo zákazníka</Label>
						<Input 
							class="w-fit focus-visible:ring-0" {...attrs} type="number" 
							bind:value={$formData.customerAddressCode}
						/>
					</Control>
					<FieldErrors />
				</Field>

				<Field {form} name="name">
					<Control let:attrs>
						<Label class="text-sm">Název</Label>
						<Input 
							class="w-fit focus-visible:ring-0" {...attrs} type="text" 
							bind:value={$formData.name}
						/>
					</Control>
					<FieldErrors />
				</Field>

				<Field {form} name="company">
					<Control let:attrs>
						<Label class="text-sm">Společnost</Label>
						<Input 
							class="w-fit focus-visible:ring-0" {...attrs} type="text" 
							bind:value={$formData.companyName}
						/>
					</Control>
					<FieldErrors />
				</Field>

				<Field {form} name="street">
					<Control let:attrs>
						<Label class="text-sm">Ulice</Label>
						<Input 
							class="w-fit focus-visible:ring-0" {...attrs} type="text" 
							bind:value={$formData.street}
						/>
					</Control>
					<FieldErrors />
				</Field>

				<Field {form} name="city">
					<Control let:attrs>
						<Label class="text-sm">Město</Label>
						<Input 
							class="w-fit focus-visible:ring-0" {...attrs} type="text" 
							bind:value={$formData.city}
						/>
					</Control>
					<FieldErrors />
				</Field>

				<Field {form} name="postalCode">
					<Control let:attrs>
						<Label class="text-sm">PSČ</Label>
						<Input 
							class="w-fit focus-visible:ring-0" {...attrs} type="text" 
							bind:value={$formData.postalCode}
						/>
					</Control>
					<FieldErrors />
				</Field>

				<Field {form} name="countryCode">
					<Control let:attrs>
						<Label class="text-sm">Země</Label>
						<Input 
							class="w-fit focus-visible:ring-0" {...attrs} type="text" 
							bind:value={$formData.countryCode}
						/>
					</Control>
					<FieldErrors />
				</Field>
			</Tabs.Content>


		</Tabs.Root>
	</form>
</div>

