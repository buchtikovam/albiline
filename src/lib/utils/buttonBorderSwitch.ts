export function buttonBorderSwitch(category: string) {
	const buttons = document.getElementsByClassName('categoryButton');

	Array.from(buttons).forEach((button) => {
		button.classList.remove('border-b-2');
	});

	const activeButton = document.querySelector(`.${category}`);

	if (activeButton) {
		activeButton.classList.add('border-b-2');
	}
}
