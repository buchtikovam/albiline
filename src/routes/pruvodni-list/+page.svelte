<script lang="ts">
	import { showFulltextSearchStore } from '$lib/stores/tableStore';
	import TableRewrite from '$lib/components/table/TableRewrite.svelte';
	import type { TableType } from '$lib/types/table/table';

	export let data: TableType;

	showFulltextSearchStore.set(true)
</script>

<TableRewrite data={data}/>
