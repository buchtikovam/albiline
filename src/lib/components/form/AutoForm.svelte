<script lang="ts">
	import type { AutoFormType } from '$lib/types/components/form/autoform/autoform';
	import DndColumnNew from '$lib/components/form/DndColumn.svelte';

	interface Props {
		formDef: AutoFormType;
		formValues: any;
		translationRoute: string;
		allowCrossColumnDND?: boolean;
	}

	let {
		formDef = $bindable({}),
		formValues = $bindable({}),
		translationRoute,
		allowCrossColumnDND = true
	}: Props = $props();

	let colDef: { value: AutoFormType } = $state({ value: {} });

	$effect(() => {
		console.log(formDef);
		colDef.value = formDef;
	})
</script>


<form method="POST" autocomplete="off">
	<div class="w-full gap-4 xl:flex ">
		{#each Object.entries(colDef.value) as [key, value]}
			<DndColumnNew
				bind:section={colDef.value[key]}
				autoformWritable={formDef}
				colName={key}
				allowCrossColumnDND={allowCrossColumnDND}
				translationRoute={translationRoute}
				bind:formValues
			/>
		{/each}
	</div>
</form>
