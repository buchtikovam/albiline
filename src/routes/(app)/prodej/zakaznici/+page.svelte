<script lang="ts">
	import {
		InputParamsZakaznici,
		InputParamsZakazniciSelectOptions
	} from "$lib/definitions/routes/prodej/zakaznici/input-params/InputParamsZakaznici";
	import {
		customerGridOptions,
		customerHeaderTranslations
	} from '$lib/definitions/routes/prodej/zakaznici/ag-grid-ss/customerAgGridDef';
	import {
		activeTabIndex,
		showFulltextSearch
	} from '$lib/runes/page.svelte';
	import AgGridSSWrapper from '$lib/components/ag-grid/AgGridSSWrapper.svelte';
	import InputParams from "$lib/components/input-params/InputParams.svelte";
	import NewCustomerOrAddressDecisionDialog
		from "$lib/components/dialog/routes/prodej/zakaznici/dialog-create-new/NewCustomerOrAddressDecisionDialog.svelte";
	import {ribbonAction} from "$lib/runes/ribbon.svelte";
	import {RibbonActionEnum} from "$lib/enums/ribbon/ribbonAction";


	activeTabIndex.value = 0;
	showFulltextSearch.value = true;

	let open = $state(false);
	let inputDialogFinished = $derived(!open);


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
</script>



<svelte:head>
	<title>
		Zákazníci | Albiline
	</title>
</svelte:head>



{#if !inputDialogFinished}
	<InputParams
		bind:open
		defaultInputDialog={InputParamsZakaznici}
		selectOptions={InputParamsZakazniciSelectOptions}
	/>
{:else}
	<AgGridSSWrapper
		gridOptionsCustom={customerGridOptions}
		requiredFields={["customerNodeCode", "customerAddressCode"]}
		url="customers"
		headerTranslations={customerHeaderTranslations}
	/>
{/if}



<NewCustomerOrAddressDecisionDialog />
