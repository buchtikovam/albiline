import { sidebarCategory } from '$lib/runes-global/sidebar.svelte';
import { get } from 'svelte/store';


export function buttonBorderSwitch() {
	const buttons = document.getElementsByClassName('categoryButton');

	Array.from(buttons).forEach((button) => {
		button.classList.remove('border-b-2');
		button.classList.remove('-pt-1');
	});

	const activeButton = document.querySelector(`.${get(sidebarCategory)}`);

	if (activeButton) {
		activeButton.classList.add('border-b-2');
		activeButton.classList.add('-pt-1');
	}
}
