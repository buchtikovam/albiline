export const load = async ({ fetch }) => {
	try {
		console.time("try fetch")
		const res = await fetch(`http://10.2.2.181/productList`);
		// const res = await fetch("http://localhost:3000/pruvodni-list-data")
		// const resp = await fetch("http://localhost:3000/pruvodni-list-info")

		if (!res.ok) {
			throw new Error(`Failed to fetch row data: ${res.statusText}`);
		}

		console.timeEnd("try fetch")
		return await res.json()
	} catch (error) {
		console.error('Error fetching data:', error);

		return {};
	}
};

