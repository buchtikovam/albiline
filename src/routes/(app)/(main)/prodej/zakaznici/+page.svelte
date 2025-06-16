<script lang="ts">
	import {InputParamsZakaznici, InputParamsZakazniciSelectOptions} from "$lib/definitions/routes/prodej/zakaznici/input-params/InputParamsZakaznici";
	import {customerGridOptions, customerHeaderTranslations} from '$lib/definitions/routes/prodej/zakaznici/ag-grid-ss/customerAgGridDef.svelte';
	import {activeTabIndex, showFulltextSearch} from '$lib/runes/page.svelte';
	import {pageKeys, agGridTables} from "$lib/runes/table.svelte";
	import {parseUrlErrors} from "$lib/utils/navigation/parseUrlErrors.svelte";
	import {beforeNavigate} from "$app/navigation";
	import {onMount} from "svelte";
	import type {PageMetaDataType} from "$lib/types/routes/pageSettings";
	import NewCustomerOrAddressDecisionDialog
		from "$lib/components/dialog/routes/prodej/zakaznici/dialog-create-new/NewCustomerOrAddressDecisionDialog.svelte";
	import InputParams from "$lib/components/input-params/InputParams.svelte";
	import AgGridSSWrapper from "$lib/components/ag-grid/serverside/AgGridSSWrapper.svelte";
	import {ribbonAction} from "$lib/runes/ribbon.svelte";
	import {RibbonActionEnum} from "$lib/enums/ribbon/ribbonAction";


	interface Props {
		data: { pageMetaData: PageMetaDataType }
	}

	let { data }: Props = $props();

	activeTabIndex.value = 0;
	showFulltextSearch.value = true;

	pageKeys.value = {
		value: ["CustomersGetList"],
		index: 0
	};

	let table = agGridTables.value[pageKeys.value.value[pageKeys.value.index]];
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

	console.log("page", ribbonAction.value);

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


<AgGridSSWrapper
	gridOptionsCustom={customerGridOptions}
	url="customers"
	headerTranslations={customerHeaderTranslations}
	customRibbonActions={[
		RibbonActionEnum.NEW,
	]}
/>


<NewCustomerOrAddressDecisionDialog />
