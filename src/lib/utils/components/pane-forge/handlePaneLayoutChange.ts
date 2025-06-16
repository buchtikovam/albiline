import type {ResizablePageSection} from "$lib/runes/page.svelte.js";


// function to keep track of pane width in page
export function handlePaneLayoutChange(
	currentSections: Record<string, ResizablePageSection>,
	sizes: number[]
) {
	let openedAmount: number = 0;

	if (currentSections) {
		Object.values(currentSections).forEach(section => {
			if (section.open) openedAmount++;
		})

		if (sizes.length === openedAmount) {
			Object.values(currentSections).forEach((section, index) => {
				section.size = sizes[index] || null;
			})
		}
	}
}
