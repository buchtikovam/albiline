<script lang="ts">
	import type { AutoForm } from "$lib/types/components/form/autoform/autoform";
	import SectionLabel from "../label/SectionLabel.svelte";
	import FormSectionFull from "$lib/components/copy-form/containers/FormInputSection.svelte";
	
	import FSInputWrapper from '$lib/components/copy-form/inputs/InputWrapper.svelte';
	import FormContainer from "$lib/components/form/FormContainer.svelte";
	import FormInputSection from "$lib/components/copy-form/containers/FormInputSection.svelte";
	import InputWrapper from "$lib/components/copy-form/inputs/InputWrapper.svelte";
	import DndColumn from "../copy-form/DndColumn.svelte";
	import type { CustomerData } from "$lib/types/tables/zakaznici";
	import type { Writable } from "svelte/store";

	export let autoform: AutoForm;
	export let formValues: Writable<CustomerData[]>;

	console.log(Object.values(autoform));
</script>

<form method="POST" autocomplete="off">
	<div class="w-full xl:flex gap-4">
		{#each Object.values(autoform) as items}
			<DndColumn items={items} bind:formValues={formValues} />
		{/each}
	</div>
</form>