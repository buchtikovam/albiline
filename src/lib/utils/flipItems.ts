export function flipItems(items: any[]) {
	let temp = items[0];
	items[0] = items[1];
	items[1] = temp;
	items[0].isLast = false;
	items[1].isLast = true;

	return items;
}
