import type {ResizablePageSection} from "$lib/runes/page.svelte";


// function to keep track of pane width in page
export function salesTotalByDivisionHandlePaneLayoutChange(
	currentSections: Record<string, ResizablePageSection>,
	sizes: number[]
) {
	let openedAmount: number = 0;

	if (currentSections) {
		Object.values(currentSections).forEach(section => {
			if (section.open) openedAmount++;
		})

		if (sizes.length === openedAmount) {
			currentSections.divisionSection.size = sizes[0];
			currentSections.linieSection.size = sizes[1] || null;
			currentSections.klpSection.size = sizes[2] || null;
			currentSections.ksSection.size = sizes[3] || null;
		}
	}
}
