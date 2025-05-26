export function formatPercentage(
	number: number,
	fractionDigits = 2,
): string {
	if (number === null || number === undefined || isNaN(number)) return "0%";

	const percentValue = number * 100;

	const formattedNumber = percentValue.toLocaleString('cs-CZ', {
		style: 'decimal',
		maximumFractionDigits: fractionDigits,
		useGrouping: true,
	});

	return `${formattedNumber}%`; // Append % without space
}
