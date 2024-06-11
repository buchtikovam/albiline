export const load = async ({ fetch }) => { // params
	const res = await fetch(`http://localhost:3000/pruvodni-list-data`);
	const resp = await fetch(`http://localhost:3000/pruvodni-list-info`);

	return {
		columnData: await res.json(),
		columnInfo: await resp.json()
	}
};
