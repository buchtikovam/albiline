import type { Writable } from 'svelte/store';

export const textFilter = (columnFilter: Writable<string>) => {
	let currentFilter: string;

	columnFilter.subscribe((data: string) => {
		currentFilter = data;
	});

	return ({ filterValue, value }: { filterValue: string, value: string }) => {

		if (currentFilter === "contains") {
			return String(value).toLowerCase().includes(String(filterValue).toLowerCase())
		}

		if (currentFilter === "starts-with") {
			return String(value).toLowerCase().startsWith(String(filterValue).toLowerCase());
		}

		if (currentFilter === "ends-with") {
			return String(value).toLowerCase().endsWith(String(filterValue).toLowerCase());
		}

		return String(value).toLowerCase().includes(String(filterValue).toLowerCase())
	};
};
