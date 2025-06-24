<script lang="ts">
	import {agGridTables, pageKeys} from "$lib/runes/table.svelte";
	import ArrowRight from 'lucide-svelte/icons/arrow-right';
	import {
		onCellDocumentsButtonClickedSalesTotalByStore
	} from "$lib/utils/routes/prodej/analyza-prodeju/po-zakaznicich-a-prodejnach/onCellDocumentsButtonClickedSalesTotalByStore";
	import type {ICellRendererParams} from "ag-grid-community";
	import type {AgGridTableType} from "$lib/types/components/table/table";

	interface Props {
	    params: ICellRendererParams
	}

	let {
	    params
	}: Props = $props();


	let table: AgGridTableType = $state(agGridTables.value[pageKeys.value.value[pageKeys.value.index]]);

	const onArrowClick = () => {
		if (table) {
			onCellDocumentsButtonClickedSalesTotalByStore(table, params);
		}
	};
</script>



<button
	onclick={onArrowClick}
	class="flex h-full w-full mt-1 cursor-pointer items-center justify-center"
	title="Zobrazit detail souvisejících faktur"
>
	<ArrowRight class="size-5 text-albi-500 hover:text-albi-800" />
</button>
