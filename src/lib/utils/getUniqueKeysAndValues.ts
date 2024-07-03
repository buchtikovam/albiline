import type { TableRows } from '$lib/types/table/table';

export function getUniqueValuesForRowDataKeys(data: TableRows) {
	const uniqueValues: Record<string, string[]> = {};

	for (const [key] of Object.entries(data[0])) {
		if (!uniqueValues[key]) {
			uniqueValues[key] = [];
		}
	}

	data.forEach((record) => {
		for (const [key, value] of Object.entries(record)) {
			if (!uniqueValues[key].includes(value as unknown as string)) {
				uniqueValues[key].push(value as unknown as string);
			}
		}
	});

	return uniqueValues;
}
