import { activeCategoryStore } from '$lib/stores/sidebarStore';
import { get } from 'svelte/store';

export function buttonBorderSwitch() {
	const buttons = document.getElementsByClassName('categoryButton');

	Array.from(buttons).forEach((button) => {
		button.classList.remove('border-b-2');
	});

	const activeButton = document.querySelector(`.${get(activeCategoryStore)}`);

	if (activeButton) {
		activeButton.classList.add('border-b-2');
	}
}
