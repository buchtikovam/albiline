export const load = async ({ fetch }) => {
	try {
		const res = await fetch(`http://10.2.2.181/productList`);

		if (!res.ok) {
			throw new Error(`Failed to fetch row data: ${res.statusText}`);
		}

		return await res.json();
	} catch (error) {
		console.error('Error fetching data:', error);

		return {};
	}
};
