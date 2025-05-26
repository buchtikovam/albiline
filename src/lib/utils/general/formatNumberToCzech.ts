export function formatNumberToCzech(number: number) {
	if (!number) return "0";

	return Math.trunc(number)
		.toLocaleString('cs-CZ')
		.replace(/,/g, ' ')
}
