<script lang="ts">
	import Table from '$lib/components/table/Table.svelte';
	import { ribbonActionStore } from '$lib/stores/ribbonStore';

	ribbonActionStore.subscribe((data) => {
		console.log(data);
	});

	// TODO: make save action

	export let data;
</script>


<Table data={data} />
