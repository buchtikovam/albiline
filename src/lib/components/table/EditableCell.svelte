<script lang="ts">
	export let row;
	export let column;
	export let value: unknown;
	export let onUpdateValue;

	let isEditing = false;

	let inputElement: HTMLInputElement | undefined;

	$: if (isEditing) {
		inputElement?.focus();
	}

	const handleSubmit = () => {
		isEditing = false;
		if (row.isData()) {
			onUpdateValue(row.dataId, column.id, value);
		}
	};
</script>

<div class="w-full">
	{#if !isEditing}
    <span on:dblclick={() => (isEditing = true)} aria-hidden="true" class="line-clamp-1">
      {value}
    </span>
	{:else}
		<form on:submit|preventDefault={handleSubmit} on:focusout={handleSubmit} class="rounded-md p-1 w-full">
			<input
				bind:this={inputElement}
				type="text"
				bind:value
				class="rounded-md w-full px-1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" />
		</form>
	{/if}
</div>
