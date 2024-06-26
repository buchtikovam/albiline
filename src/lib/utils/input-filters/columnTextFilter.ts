import type { Writable } from 'svelte/store';
import type { TextFilters } from '$lib/types/table/filter';

export const columnTextFilter = (columnFilter: Writable<TextFilters>) => {
	let currentFilter: TextFilters;

	columnFilter.subscribe((data) => {
		currentFilter = data;
	});

	return ({ filterValue, value }: { filterValue: string, value: string }) => {

		if (currentFilter === 'contains') {
			return String(value).toLowerCase().includes(String(filterValue).toLowerCase());
		}

		if (currentFilter === 'starts-with') {
			return String(value).toLowerCase().startsWith(String(filterValue).toLowerCase());
		}

		if (currentFilter === 'ends-with') {
			return String(value).toLowerCase().endsWith(String(filterValue).toLowerCase());
		}

		// default
		return String(value).toLowerCase().includes(String(filterValue).toLowerCase());
	};
};
