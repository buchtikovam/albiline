export function parseStringToDateLong(dateString: string) {
	const date = new Date(dateString);

	const day = date.getDate(); // Get the day (UTC)
	const month = date.getMonth(); // Get the month (UTC, 0-indexed so we add 1)
	const year = date.getFullYear(); // Get the full year (UTC)
	const hours = date.getHours(); // Get the hours (UTC)
	const minutes = date.getMinutes(); // Get the minutes (UTC)
	const seconds = date.getSeconds(); // Get the seconds (UTC)
	const milliseconds = date.getMilliseconds(); // Local milliseconds

	const pad = (value: number) => value.toString().padStart(2, '0');
	const padMilliseconds = (value: number) => value.toString().padStart(3, '0');

	return `${pad(day)}.${pad(month)}.${year} ${pad(hours)}:${pad(minutes)}:${pad(seconds)}:${padMilliseconds(milliseconds)}`
}
