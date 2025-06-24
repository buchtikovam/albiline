import {LocalStore, localStore} from '$lib/utils/storage/localStorage.svelte';
import {sessionStore, SessionStore} from "$lib/utils/storage/sessionStorage.svelte";
import type { ResponseDialogMessage } from "$lib/types/components/response";


export const isMobile: { value: boolean } = $state({ value: false });

export const disableInputs: { value: boolean } = $state({ value: false });

export const pageCompact: LocalStore<boolean>= localStore("pageCompact", false );

export const showFulltextSearch: { value: boolean } = $state({ value: false });

export const activeTabIndex: { value: number } = $state({ value: 0 });

export const authDetails: { sessionKey: string|null, userName: string|null, email: string|null, icon: any } = $state({ sessionKey: null, userName: null, email: null, icon: null });

export const responseDialogMessages: { value: ResponseDialogMessage[] } = $state({
	value: []
});

export const pageCodes: { value: Map<string, string[]> } = $state({
	value: new Map([
		[ // Zákazníci
			"/(app)/(main)/prodej/zakaznici",
			["CustomersGetList"]
		],

		[ // Analýza prodejů - Celkem
			"/(app)/(main)/prodej/analyza-prodeju/celkem",
			[
				"SalesTotalByDivision", // *Po divizích
				"SalesTotalByDivisionSubdetailProductline", // Detail po liniích
				"SalesTotalByDivisionSubdetailProductlineSubdetailCostlevel", // Detail po KLP
				"SalesTotalByDivisionSubdetailProductlineSubdetailCostlevelQuantity" // Detail po KS
			]
		],

		[ // Analýza prodejů - Po zákaznících
			"/(app)/(main)/prodej/analyza-prodeju/po-zakaznicich",
			["SalesCustomdetailByCustomers"]
		],

		[ // Analýza prodejů - Po zákaznících a liniích
			"/(app)/(main)/prodej/analyza-prodeju/po-zakaznicich/po-liniich",
			["SalesCustomerorstoreByProductline"]
		],

		[ // Analýza prodejů - Po zákaznících a KLP
			"/(app)/(main)/prodej/analyza-prodeju/po-zakaznicich/po-liniich/po-klp",
			["SalesCustomerorstoreByProductlineByCostlevel"]
		],

		[ // Analýza prodejů - Po zákaznících a prodejnách
			"/(app)/(main)/prodej/analyza-prodeju/po-zakaznicich-a-prodejnach",
			[
				"SalesTotalByStore", // *Celkové po divizích
				"SalesTotalByStoreDetail", // Detail po divizích
				"SalesSubdetailByCostlevel", // Detail po KLP
			]
		],

		[ // Analýza prodejů - Po zákaznících a fakturách
			"/(app)/(main)/prodej/analyza-prodeju/po-zakaznicich-a-prodejnach/po-fakturach",
			["SalesDocumentByCustomerorstore"]
		],

		[ // Stav skladu
			"/(app)/(main)/sklad/stav-skladu",
			["ProductStockInventory"]
		]
	])
})


// export const responseDialogMessages: { value: ResponseDialogMessage[] } = $state({
// 	value: [
// 		// {
// 		// 	"title": "Informace",
// 		// 	"content": "Tohle je moc hezký testovací infobox",
// 		// 	"type": "InfoBox"
// 		// },
// 		// {
// 		// 	"title": "Upozornění",
// 		// 	"content": "Tohle se fakt nepovedlo",
// 		// 	"type": "Critical"
// 		// },
// 		// {
// 		// 	"title": "Varování",
// 		// 	"content": "Tohle se určitě nepovede",
// 		// 	"type": "Warning"
// 		// },
// 		// {
// 		// 	"title": "Úspěch",
// 		// 	"content": "Tohle se opravdu povedlo",
// 		// 	"type": "Success"
// 		// },
// 		// {
// 		// 	"title": "Informace",
// 		// 	"content": "Tohle je testovací infobox",
// 		// 	"type": "InfoToast"
// 		// },
// 		// {
// 		// 	"title": "Upozornění",
// 		// 	"content": "Tohle se fakt nepovedlo",
// 		// 	"type": "CriticalToast"
// 		// },
// 		// {
// 		// 	"title": "Varování",
// 		// 	"content": "Tohle se určitě nepovede",
// 		// 	"type": "WarningToast"
// 		// },
// 		// {
// 		// 	"title": "Úspěch",
// 		// 	"content": "Tohle se opravdu povedlo",
// 		// 	"type": "SuccessToast"
// 		// },
// 	]
// });




// -- page specific


export interface PageState {
	[routeId: string] : {
		disableInputs?: boolean,
		resizablePageSections?: Record<string, ResizablePageSection>
	}
}

export interface ResizablePageSection {
	open: boolean,
	size: number|null,
	focused: boolean,
	index: number,
}


export const pageStates: SessionStore<PageState> = sessionStore("pageStates", {})
