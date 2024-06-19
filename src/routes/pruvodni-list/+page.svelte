<script lang="ts">
	import { ribbonActionStore } from '$lib/stores/ribbonStore';
	import { handleRibbonActionChange } from '$lib/utils/handleRibbonActionChange';
	import Table from '$lib/components/table/Table.svelte';
	import MainDialog from '$lib/components/ribbon-dialog/MainDialog.svelte';
	import { page } from '$app/stores';
	import { toast } from 'svelte-sonner';

	export let data;

	ribbonActionStore.subscribe((action) => { // move to layout ???
		if (action) {
			handleRibbonActionChange(action)
		}
	});
</script>

<svelte:head>
	<title>Průvodní list</title>
</svelte:head>



<Table data={data}/>

<MainDialog/>
