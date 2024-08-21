
export const load = async ({ fetch }) => { // params
	const res = await fetch(`https://dummyjson.com/products?limit=1000`);

	return await res.json()
};