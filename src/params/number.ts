import type { ParamMatcher } from '@sveltejs/kit';

export const match = ((param: string) => {
	return Number.isInteger(Number(param)) || param === "null";
}) satisfies ParamMatcher;
