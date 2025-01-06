<script lang="ts">
	import type { AutoFormType } from '$lib/types/components/form/autoform/autoform';
	import DndColumnNew from '$lib/components/form/DndColumn.svelte';

	interface Props {
		formDef: AutoFormType;
		initialFormValues: any;
		allowCrossColumnDND?: boolean;
	}

	let {
		formDef = $bindable(),
		initialFormValues,
		allowCrossColumnDND = true
	}: Props = $props();

	// console.log(formDef);
	// console.log(formValues);
</script>


<form method="POST" autocomplete="off">
	<div class="w-full gap-4 xl:flex ">
		{#each Object.entries(formDef) as [key]}
			<DndColumnNew
				bind:formDef={formDef}
				colName={key}
				allowCrossColumnDND={allowCrossColumnDND}
				initialFormValues={initialFormValues}
			/>
		{/each}
	</div>
</form>
