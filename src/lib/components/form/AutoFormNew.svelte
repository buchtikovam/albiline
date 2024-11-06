<script lang="ts">
	import { writable } from 'svelte/store';
	import type { AutoFormNew } from '$lib/types/components/form/autoform/autoformNew';
	import DndColumnNew from '$lib/components/form/DndColumnNew.svelte';

	export let formDef: AutoFormNew;
	export let formValues;
	export let translationRoute: string;
	export let allowCrossColumnDND: boolean = true;

	let autoformWritable = writable(formDef);
	let colDef: AutoFormNew;

	autoformWritable.subscribe((data) => {
		colDef = data;
	})
</script>


<form method="POST" autocomplete="off">
	<div class="w-full gap-4 xl:flex ">
		{#each Object.entries(colDef) as [key, value]}
			<DndColumnNew
				items={value}
				autoformWritable={autoformWritable}
				colName={key}
				allowCrossColumnDND={allowCrossColumnDND}
				translationRoute={translationRoute}
				bind:formValues
			/>
		{/each}
	</div>
</form>
