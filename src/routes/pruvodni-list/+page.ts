export const load = async ({ fetch }) => {
	try {
		// const res = await fetch(`http://10.2.2.181/productList`);
		const res = await fetch("http://localhost:3000/pruvodni-list-data")
		const resp = await fetch("http://localhost:3000/pruvodni-list-info")

		if (!res.ok || !resp.ok) {
			throw new Error(`Failed to fetch row data: ${res.statusText}`);
		}

		return {
			items: await res.json(),
			columnInfo: await resp.json()
		}
	} catch (error) {
		console.error('Error fetching data:', error);

		return {};
	}
};

