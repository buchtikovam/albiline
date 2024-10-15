<script lang="ts">
	import { zakazniciDetailFormDef } from '$lib/data/autoform/zakaznici-detail';
	import { writable } from 'svelte/store';
	import type { CustomerData } from "$lib/types/tables/zakaznici";
	import AutoForm from '$lib/components/form/AutoForm.svelte';

	export let data: { response: CustomerData };

	let formValues = writable(data.response)
	
	formValues.subscribe((values) => {
		console.log(values);		
	})
</script>


<div class="h-full max-w-[1600px] overflow-auto p-3 md:p-4">
	<p class="font-bold w-full text-lg mb-2 md:mb-4">Detail zákazníka 123</p>

	<AutoForm autoform={zakazniciDetailFormDef} bind:formValues/>
</div>

<style>
	::-webkit-scrollbar {
		width: 0px;
	}
</style>
