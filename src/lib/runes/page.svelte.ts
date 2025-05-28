import { LocalStore, localStore } from '$lib/utils/browser-storage/localStorage.svelte';
import type { ResponseDialogMessage } from "$lib/types/components/response";
import {sessionStore, SessionStore} from "$lib/utils/browser-storage/sessionStorage.svelte";


export const isMobile: { value: boolean } = $state({ value: false });

export const disableInputs: { value: boolean } = $state({ value: false });

export const pageCompact: LocalStore<boolean>= localStore("pageCompact", false );

export const showFulltextSearch: { value: boolean } = $state({ value: false });

export const fulltextFilterValue: { value: string } = $state({ value: "" });

export const activeTabIndex: { value: number } = $state({ value: 0 });

export const authDetails: { sessionKey: string|null, userName: string|null, email: string|null, icon: any } = $state({ sessionKey: null, userName: null, email: null, icon: null });

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




// -- page specific


interface PageSections {
	linieSection: boolean;
	kspSection: boolean;
	ksSection: boolean;
}

export const pageSectionsState: SessionStore<PageSections> = sessionStore("salesTotalPageSections", {
	linieSection: false,
	kspSection: false,
	ksSection: false,
})
