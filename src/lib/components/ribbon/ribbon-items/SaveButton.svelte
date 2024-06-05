<script lang="ts">
	import Save from 'lucide-svelte/icons/save';
	import RibbonItem from '$lib/components/ribbon/RibbonItem.svelte';
	import { tableData } from '$lib/stores/tableStore';
	import apiService from '$lib/api/apiService';

	let myData;

	tableData.subscribe((data) => {
		myData = data;
		console.log("change");
	})

	function saveData() {
		apiService("/pruvodni-list", "POST", { }, myData)


	}
</script>

<button on:click={saveData}>
	<RibbonItem name="Uložit" >
		<Save class="h-4 w-4" />
	</RibbonItem>
</button>
