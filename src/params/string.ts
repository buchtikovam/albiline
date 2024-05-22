import type { ParamMatcher } from '@sveltejs/kit';

export const match: ParamMatcher = (param) => {
	// Allow letters, underscores, and dashes
	return /^[a-zA-Z-_+]+$/.test(param);
};
