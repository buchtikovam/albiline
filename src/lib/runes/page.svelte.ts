import { LocalStore, localStore } from '$lib/utils/browser-storage/localStorage.svelte';
import type { ResponseDialogMessage } from "$lib/types/components/response";


interface Page {
	activePageTab: string;
	disablePageTabs: boolean;
	showFulltextSearch: boolean;
	fulltextFilterValue: string;
	activeTabIndex: number;
}


export const isMobile: { value: boolean } = $state({ value: false });

export const disableInputs: { value: boolean } = $state({ value: false });

export const pageCompact: LocalStore<boolean>= localStore("pageCompact", false );

export const showFulltextSearch: { value: boolean } = $state({ value: false });

export const fulltextFilterValue: { value: string } = $state({ value: "" });

export const activeTabIndex: { value: number } = $state({ value: 0 });

export const authDetails: { sessionKey: string|null, userName: string|null } = $state({ sessionKey: null, userName: null });

export const responseDialogMessages: { value: ResponseDialogMessage[] } = $state({
	value: []
});


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
