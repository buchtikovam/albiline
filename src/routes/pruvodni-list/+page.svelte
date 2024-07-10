<script lang="ts">
	import { showFulltextSearchStore } from '$lib/stores/tableStore';
	import Table from '$lib/components/table/Table.svelte';
	import type { TableType } from '$lib/types/table/table';

	export let data: TableType;

	showFulltextSearchStore.set(true)
</script>

<Table data={data}/>
