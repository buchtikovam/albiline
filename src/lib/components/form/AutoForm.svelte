<script lang="ts">
	import type { AutoForm } from "$lib/types/components/form/autoform/autoform";
	import DndColumn from "../form/DndColumn.svelte";
	import type { CustomerData } from "$lib/types/tables/zakaznici";
	import { get, writable, type Writable } from 'svelte/store';

	export let autoform: AutoForm;
	export let formValues: Writable<CustomerData>;

	let autoformWritable = writable(autoform);
	let colDef: AutoForm;

	autoformWritable.subscribe((data) => {
		colDef = data;
	})
</script>


<form method="POST" autocomplete="off">
	<div class="w-full gap-4 xl:flex ">
		{#each Object.entries(colDef) as [key, value]}
			<DndColumn
				bind:items={value}
				bind:formValues={formValues}
				autoformWritable={autoformWritable}
				colName={key}
			/>
		{/each}
	</div>
</form>
