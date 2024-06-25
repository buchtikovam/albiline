<script lang="ts">
	import { ribbonActionStore } from '$lib/stores/ribbonStore';
	import { handleRibbonActionChange } from '$lib/utils/ribbon/handleRibbonActionChange';
	import Table from '$lib/components/table/Table.svelte';
	import MainDialog from '$lib/components/dialog/ribbon-dialogs/MainDialog.svelte';

	export let data;

	ribbonActionStore.subscribe((action) => { // move to layout ???
		if (action) {
			handleRibbonActionChange(action)
		}
	});
</script>

<Table data={data}/>

<MainDialog/>
