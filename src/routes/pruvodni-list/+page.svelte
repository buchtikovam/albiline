<script lang="ts">
	import { ribbonActionStore } from '$lib/stores/ribbonStore';
	import { handleRibbonActionChange } from '$lib/utils/ribbon/handleRibbonActionChange';
	import Table from '$lib/components/table/Table.svelte';
	import MainDialog from '$lib/components/dialog/ribbon-dialogs/MainDialog.svelte';
	import { showFulltextSearchStore } from '$lib/stores/tableStore';

	export let data;

	showFulltextSearchStore.set(true)

	ribbonActionStore.subscribe((action) => {
		if (action) {
			handleRibbonActionChange(action)
		}
	});
</script>

<Table data={data}/>

<MainDialog/>
