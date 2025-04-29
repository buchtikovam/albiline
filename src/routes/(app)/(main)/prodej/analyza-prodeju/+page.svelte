<script lang="ts">
	import AgGridCSWrapper from "$lib/components/ag-grid/AgGridCSWrapper.svelte";
	import {
		salesAnalyticsAgGridDef, salesAnalyticsHeaderTranslations
	} from "$lib/definitions/routes/prodej/analyza-prodeju/ag-grid-cs/salesAnalyticsAgGridDef.svelte";
</script>



<AgGridCSWrapper
	pageKey="SalesAnalytics"
	gridOptionsCustom={salesAnalyticsAgGridDef}
	headerTranslations={salesAnalyticsHeaderTranslations}
/>
