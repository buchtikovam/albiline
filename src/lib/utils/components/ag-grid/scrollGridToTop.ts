export function scrollGridToTop() {
	const grid = document.querySelector(".ag-body-viewport");

	if (grid) {
		grid.scrollTop = 0;
	}
}
