<script lang="ts">
	import Table from '$lib/components/table/Table.svelte';
	import { ribbonActionStore } from '$lib/stores/ribbonStore';
	import { handleRibbonActionChange } from '$lib/utils/handleRibbonActionChange';

	export let data;

	ribbonActionStore.subscribe((action) => {
		if (action) {
			handleRibbonActionChange(action)
		}
	});
</script>

<Table data={data} />
