<script lang="ts">
	import Table from '$lib/components/table/Table.svelte';
	import { showFulltextSearchStore } from '$lib/stores/tableStore';

	export let data;

	showFulltextSearchStore.set(true)

</script>

<Table data={data}/>
