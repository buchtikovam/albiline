<script lang="ts">
	import {InputParamsZakaznici, InputParamsZakazniciSelectOptions} from "$lib/definitions/routes/prodej/zakaznici/input-params/InputParamsZakaznici";
	import {customerGridOptions, customerHeaderTranslations} from '$lib/definitions/routes/prodej/zakaznici/ag-grid-ss/customerAgGridDef.svelte';
	import {activeTabIndex, showFulltextSearch} from '$lib/runes/page.svelte';
	import {currentPageKey, agGridTables} from "$lib/runes/table.svelte";
	import {ribbonAction} from "$lib/runes/ribbon.svelte";
	import {RibbonActionEnum} from "$lib/enums/ribbon/ribbonAction";
	import {parseUrlErrors} from "$lib/utils/navigation/parseUrlErrors.svelte";
	import {onMount} from "svelte";
	import NewCustomerOrAddressDecisionDialog
		from "$lib/components/dialog/routes/prodej/zakaznici/dialog-create-new/NewCustomerOrAddressDecisionDialog.svelte";
	import AgGridSSWrapper from '$lib/components/ag-grid/AgGridSSWrapper.svelte';
	import InputParams from "$lib/components/input-params/InputParams.svelte";
	import type {PageMetaDataType} from "$lib/types/routes/pageSettings";


	interface Props {
		data: { pageMetaData: PageMetaDataType }
	}

	let { data }: Props = $props();

	activeTabIndex.value = 0;
	showFulltextSearch.value = true;
	currentPageKey.value = "CustomersGetList";

	let table = agGridTables.value[currentPageKey.value];
	let open = $derived.by(() => {
		if (!table.hasInputParams) return true;
	});


	// open input dialog on ctrl+I
	const handleKeyDown = (event) => {
		if (event.ctrlKey && event.key.toUpperCase() === 'I') {
			open = true;
		}
	};


	$effect(() => {
		document.addEventListener('keydown', handleKeyDown);

		return () => {
			document.removeEventListener('keydown', handleKeyDown);
		}
	})


	$effect(() => {
		if (ribbonAction.value === RibbonActionEnum.LOAD) {
			open = true;
			ribbonAction.value = RibbonActionEnum.UNKNOWN;
		}
	})


	onMount(() => {
		parseUrlErrors();
	})
</script>



<svelte:head>
	<title>
		Zákazníci | Albiline
	</title>
</svelte:head>



{#if open}
	<InputParams
		bind:open
		type="serverSide"
		defaultInputParams={InputParamsZakaznici}
		selectOptions={InputParamsZakazniciSelectOptions}
		restrictions={data.pageMetaData.inputs}
	/>
{/if}


<AgGridSSWrapper
	gridOptionsCustom={customerGridOptions}
	url="customers"
	headerTranslations={customerHeaderTranslations}
/>



<NewCustomerOrAddressDecisionDialog />
