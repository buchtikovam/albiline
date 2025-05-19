<script lang="ts">
	import {
		salesAnalyticsAgGridDef, salesAnalyticsHeaderTranslations
	} from "$lib/definitions/routes/prodej/analyza-prodeju/ag-grid-cs/salesAnalyticsAgGridDef.svelte";
	import AgGridCSWrapperCopy from "$lib/components/ag-grid/clientside/AgGridCSWrapper.svelte";
</script>



<AgGridCSWrapperCopy
	pageKey="SalesAnalytics"
	gridOptionsCustom={salesAnalyticsAgGridDef}
	headerTranslations={salesAnalyticsHeaderTranslations}
/>
