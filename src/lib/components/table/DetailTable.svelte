<script lang="ts">
	import { Checkbox } from '$lib/components/ui/checkbox';
	import Trash2 from 'lucide-svelte/icons/trash-2';
	import * as ContextMenu from "$lib/components/ui/context-menu";
	import * as Table from "$lib/components/ui/table";
	import { _ } from 'svelte-i18n'
	import { writable } from 'svelte/store';
	import AgGridCSWrapper from '$lib/components/ag-grid/AgGridCSWrapper.svelte';

	export let tableDef;
	export let tableData = writable([]);
	export let translationRoute;

</script>

<div class="h-60">
	<AgGridCSWrapper colDef={tableDef} bind:rowData={tableData}/>
</div>
