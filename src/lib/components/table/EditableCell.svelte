<script lang="ts">
	import { editedDataStore } from '$lib/stores/tableStore';
	import { get } from 'svelte/store';
	import { isEditAllowedStore } from '$lib/stores/ribbonStore';

	export let row;
	export let column;
	export let value: unknown;
	export let rowDataStore;
	export let onUpdateValue;

	let isEditing = false;

	let inputElement: HTMLInputElement | undefined;

	$: if (isEditing) {
		inputElement?.focus();
	}

	function handleEdit() {
		if (get(isEditAllowedStore)) {
			isEditing = true
		}
	}

	const handleSubmit = (event: Event) => {
		event.preventDefault();

		const rowData = get(rowDataStore)

		rowData[row.id][column.id] = value;

		let editedRow = rowData[row.id];

		let rowIds: number[] = [];
		get(editedDataStore).forEach((row) => {
			rowIds.push(row.id);
		})

		if (!rowIds.includes(editedRow.id)) {
			editedDataStore.update(data => data.concat(editedRow))
		}

		isEditing = false;

		if (row.isData()) {
			onUpdateValue(rowData);
		}
	};
</script>

<div class="w-full">
	{#if !isEditing}
    	<span on:dblclick={handleEdit} aria-hidden="true" class="line-clamp-1">
      		{value}
    	</span>
	{:else}
		<form on:submit|preventDefault={handleSubmit} on:focusout={(e) => handleSubmit(e)} class="p-1 w-full">
			<input
				bind:this={inputElement}
				type="text"
				bind:value
				class="rounded w-full px-1 outline-none focus:border focus:border-albi-500"
			/>
		</form>
	{/if}
</div>
