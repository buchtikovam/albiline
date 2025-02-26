import {parseDate} from "@internationalized/date";


export function parseStringToDateValue(dateString: string) {
	// Extract the date portion "20.02.2025"
	const [day, month, year] = dateString.split(" ")[0].split(".").map(Number);

	// Convert it to "YYYY-MM-DD" for `parseDate`
	const isoString = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

	return parseDate(isoString); // Now it matches ISO 8601
}
