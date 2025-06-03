export function formatNumberToCzech(number: number) {
	if (!number) return "0";

	return Math.round(number)
		.toLocaleString('cs-CZ')
		.replace(/,/g, ' ');
}
