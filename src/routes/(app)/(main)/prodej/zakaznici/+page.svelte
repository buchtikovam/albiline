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
	import {beforeNavigate} from "$app/navigation";
	import AgGridRefactoredSSWrapper from "$lib/components/ag-grid/ss-wrapper/AgGridRefactoredSSWrapper.svelte";
	import AgGridSSWrapperCopy2 from "$lib/components/ag-grid/ss-wrapper/AgGridSSWrapperCopy2.svelte";


	interface Props {
		data: { pageMetaData: PageMetaDataType }
	}

	let { data }: Props = $props();

	activeTabIndex.value = 0;
	showFulltextSearch.value = true;
	currentPageKey.value = "CustomersGetList";

	let table = agGridTables.value[currentPageKey.value];
	let open = $state(false);


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

	$inspect(table.openInputParams, table.hasInputParams)

	$effect(() => {
		open = table.openInputParams;
	})

	onMount(() => {
		open = !table.hasInputParams;
		parseUrlErrors();
	})

	beforeNavigate(() => {
		table.openInputParams = false;
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
		type={table.type}
		defaultInputParams={InputParamsZakaznici}
		selectOptions={InputParamsZakazniciSelectOptions}
		restrictions={data.pageMetaData.inputs}
	/>
{/if}


<!--<AgGridRefactoredSSWrapper-->
<!--	gridOptionsCustom={customerGridOptions}-->
<!--	headerTranslations={customerHeaderTranslations}-->
<!--/>-->

<!--<AgGridSSWrapper-->
<!--	gridOptionsCustom={customerGridOptions}-->
<!--	url="customers"-->
<!--	headerTranslations={customerHeaderTranslations}-->
<!--/>-->


<AgGridSSWrapperCopy2
	gridOptionsCustom={customerGridOptions}
	url="customers"
	headerTranslations={customerHeaderTranslations}
/>


<NewCustomerOrAddressDecisionDialog />
