<script lang="ts">
	import Table from '$lib/components/table/Table.svelte';
	import { showFulltextSearchStore } from '$lib/stores/tableStore';
	export const prerender = true;

	export let data;

	// console.log(data);

	showFulltextSearchStore.set(true)
</script>

<Table data={data}/>
