<script lang="ts">
	import { type Writable, writable } from 'svelte/store';
	import type { AutoFormType } from '$lib/types/components/form/autoform/autoform';
	import DndColumnNew from '$lib/components/form/DndColumn.svelte';

	export let formDef: Writable<AutoFormType>;
	export let formValues = writable({});
	export let translationRoute: string;
	export let allowCrossColumnDND: boolean = true;

	let colDef: AutoFormType;

	formDef.subscribe((data) => {
		console.log(data);
		colDef = data;
	})
</script>


<form method="POST" autocomplete="off">
	<div class="w-full gap-4 xl:flex ">
		{#each Object.entries(colDef) as [key, value]}
			<DndColumnNew
				section={value}
				autoformWritable={formDef}
				colName={key}
				allowCrossColumnDND={allowCrossColumnDND}
				translationRoute={translationRoute}
				bind:formValues
			/>
		{/each}
	</div>
</form>
