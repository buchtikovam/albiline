// import type { PageLoad } from '../../../../.svelte-kit/types/src/routes';

export const load = async ({ fetch, params }) => {
	const res = await fetch(`http://localhost:3000/pruvodni-list`);
	return await res.json();
};
