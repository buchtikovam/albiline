import type { RibbonType } from '$lib/types/components/ribbon/ribbon';
import { RibbonTypeEnum } from '$lib/enums/ribbon/ribbonType';

export function filterRibbonItems(items: RibbonType, arr: string[]) {
	const newRibbon: RibbonType = [];

	arr.forEach((arrItem) => {
		const foundItem = items.find((item) => {
			if (Array.isArray(item)) {
				// return item.find((subItem) => subItem.field === arrItem);
			} else {
				if (item.type === RibbonTypeEnum.ITEM || item.type === RibbonTypeEnum.DROPDOWN) {
					if (item.field === arrItem) return item;
				}

				if (arrItem === "separator" && item.type === RibbonTypeEnum.SEPARATOR) {
					return item;
				}
			}
		})

		if (foundItem) newRibbon.push(foundItem);
	})

	return newRibbon;
}
