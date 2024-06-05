<script lang="ts">
	export let row;
	export let column;
	export let value: unknown;
	export let tempData;
	export let onUpdateValue;

	let isEditing = false;

	let inputElement: HTMLInputElement | undefined;

	$: if (isEditing) {
		inputElement?.focus();
	}

	const handleSubmit = (event) => {
		event.preventDefault();

		console.log(tempData[row.id]);
		tempData[row.id][column.id] = value;

		console.log(tempData[row.id]);

		isEditing = false;

		if (row.isData()) {
			onUpdateValue(tempData);
		}
	};
</script>

<div class="w-full">
	{#if !isEditing}
    <span on:dblclick={() => (isEditing = true)} aria-hidden="true" class="line-clamp-1">
      {value}
    </span>
	{:else}
		<form on:submit|preventDefault={handleSubmit} on:focusout={(e) => handleSubmit(e)} class="p-1 w-full">
			<input
				bind:this={inputElement}
				type="text"
				bind:value
				class="rounded w-full px-1 outline-none focus:border focus:border-albi-500" />
		</form>
	{/if}
</div>
