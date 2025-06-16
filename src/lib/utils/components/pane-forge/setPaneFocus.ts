import {pageStates, type ResizablePageSection} from "$lib/runes/page.svelte";
import {pageKeys} from "$lib/runes/table.svelte";


// sets current pane focus in session storage and correct pageCode
export function setPaneFocus(
	sections: Record<string, ResizablePageSection>,
	routeId: string,
	sectionKey: string,
) {
	if (!routeId || !sections) return;
	const currentSections = pageStates.value[routeId].resizablePageSections;

	for (const key in currentSections) {
		currentSections[key].focused = key === sectionKey;
	}

	pageKeys.value.index = currentSections ? currentSections[sectionKey].index : 0;
}
