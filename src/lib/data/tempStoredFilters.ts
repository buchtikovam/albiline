import type { StoredFilters } from '$lib/types/filter';

export const storedFilters: StoredFilters = {
	ksp: {
		value: "",
		colFilter: "starts-with"
	},
	jmeno: {
		value: "em",
		colFilter: "ends-with"
	},
}
