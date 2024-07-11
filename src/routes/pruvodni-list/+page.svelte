<script lang="ts">
	import { showFulltextSearchStore } from '$lib/stores/tableStore';
	import type { TableType } from '$lib/types/table/table';
	import Table from '$lib/components/table/Table.svelte';

	export let data: TableType;

	showFulltextSearchStore.set(true)
</script>



<Table data={data}/>
