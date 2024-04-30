<script lang="ts">
	export let filterValue;
</script>

<input
	id="filter-input"
	type="text"
	bind:value={$filterValue}
	class="border rounded-md mb-2 px-2 focus:outline-ring font-normal"
>

<style>
	input {
		width: 8rem;
	}
</style>
