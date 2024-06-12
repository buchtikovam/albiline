<script lang="ts">
	import { ribbonActionStore } from '$lib/stores/ribbonStore';
	import { handleRibbonActionChange } from '$lib/utils/handleRibbonActionChange';
	import Table from '$lib/components/table/Table.svelte';

	export let data;

	ribbonActionStore.subscribe((action) => {
		if (action) {
			handleRibbonActionChange(action)
		}
	});
</script>

<Table data={data}/>
