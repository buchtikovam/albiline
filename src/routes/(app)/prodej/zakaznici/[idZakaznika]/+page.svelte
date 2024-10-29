<script lang="ts">
	import { customerDetailFormDef } from '$lib/data/detail-pages/zakaznici/form-def/customerDetailFormDef';
	import { writable } from 'svelte/store';
	import type { CustomerData } from "$lib/types/tables/zakaznici";
	import AutoForm from '$lib/components/form/AutoForm.svelte';
	import SectionLabel from '$lib/components/form/labels/SectionLabel.svelte';
	import DetailTable from '$lib/components/table/DetailTable.svelte';


	export let data: { response: CustomerData };

	let formValues = writable(data.response)
</script>


<div class="h-full max-w-[1850px] overflow-auto p-3 md:p-4">
	<p class="font-bold w-full text-lg mb-2 md:mb-4">Detail zákazníka 123</p>

	<AutoForm autoform={customerDetailFormDef} bind:formValues/>

	<div class="">
		<SectionLabel name="Kontakty"/>

		<div class="mt-2 w-full">
			<DetailTable/>
		</div>
	</div>
</div>

<style>
	::-webkit-scrollbar {
		width: 0;
		height: 0;
	}
</style>
