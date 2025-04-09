import {page} from "$app/state";
import {responseDialogMessages} from "$lib/runes/page.svelte";
import {goto} from "$app/navigation";
import {localizeHref} from "$lib/paraglide/runtime";

export function parseUrlErrors() {
	const params = new URLSearchParams(page.url.search);
	const errorMessage = params.get('error');

	if (errorMessage) {
		responseDialogMessages.value = JSON.parse(decodeURIComponent(errorMessage))

		goto(
			localizeHref(page.url.pathname),
			{replaceState: true, keepFocus: true}
		).then(r => {});
	}
}
