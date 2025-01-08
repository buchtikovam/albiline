<script lang="ts">
	import type { AutoFormType } from '$lib/types/components/form/autoform';
	import DndColumnNew from '$lib/components/form/DndColumn.svelte';

	interface Props {
		formDef: AutoFormType;
		initialFormValues: any;
		editedFormValues: Record<string, any>
		allowCrossColumnDND?: boolean;
	}

	let {
		formDef = $bindable(),
		initialFormValues,
		editedFormValues = $bindable(),
		allowCrossColumnDND = true
	}: Props = $props();
</script>


<form method="POST" autocomplete="off">
	<div class="w-full gap-4 xl:flex ">
		{#each Object.entries(formDef) as [key]}
			<DndColumnNew
				bind:formDef={formDef}
				colName={key}
				allowCrossColumnDND={allowCrossColumnDND}
				initialFormValues={initialFormValues}
				bind:editedFormValues={editedFormValues}
			/>
		{/each}
	</div>
</form>
