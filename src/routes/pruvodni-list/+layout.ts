import { tableData } from '$lib/stores/tableStore';

export const load = async ({ fetch }) => { // params
	const res = await fetch(`http://localhost:3000/pruvodni-list`);

	// tableData.set(await res.json());

	return await res.json();
};

// TODO: +page.ts, form actions to save data ? ?
