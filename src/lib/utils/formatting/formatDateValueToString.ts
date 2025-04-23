import type {DateValue} from "@internationalized/date";



export function formatDateValueToString(dateValue: DateValue|undefined) {
	if (!dateValue) return "Invalid Date";

	const day = String(dateValue.day).padStart(2, "0");
	const month = String(dateValue.month).padStart(2, "0");
	const year = String(dateValue.year);

	return `${day}.${month}.${year} 00:00:00:000`;
}
