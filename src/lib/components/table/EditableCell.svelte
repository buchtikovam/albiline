<script lang="ts">
	import { editedDataStore } from '$lib/stores/tableStore';
	import { isEditAllowedStore } from '$lib/stores/ribbonStore';
	import type { TableRows } from '$lib/types/table/table';
	import { get, type Writable } from 'svelte/store';

	/*
		Editovatelná buňka v tabulce.
		Pokud dojde k editaci, řádek se přidá do editedDataStore,
		který pak využívá save.ts pro uložení změněných dat na BE
	*/

	export let row;
	export let column;
	export let value: unknown;
	export let rowsWritable: Writable<TableRows>;
	export let onUpdateValue;

	let isEditing = false;
	let inputElement: HTMLInputElement | undefined;

	$: if (isEditing) {
		inputElement?.focus();
	}


	function showEditableCell() {
		if (get(isEditAllowedStore)) {
			isEditing = true
		}
	}


	const submitEditedData = (event: Event) => {
		event.preventDefault();

		const rowData: TableRows = get(rowsWritable)
		let editedRow = rowData[row.dataId];
		let rowIds: number[] = [];
		rowData[row.dataId][column.id] = value;

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
    	<span
			on:dblclick={showEditableCell}
			aria-hidden="true"
			class="line-clamp-1"
		>
      		{value}
    	</span>
	{:else}
		<form
			on:submit={submitEditedData}
			on:focusout={(e) => submitEditedData(e)}
			class="p-1 w-full"
		>
			<input
				bind:this={inputElement}
				bind:value
				type="text"
				class="rounded w-full px-1 outline-none focus:border focus:border-albi-500"
			/>
		</form>
	{/if}
</div>
