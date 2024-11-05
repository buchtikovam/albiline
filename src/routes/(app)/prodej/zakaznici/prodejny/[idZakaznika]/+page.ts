import type { PageLoad } from "./$types";


export const load: PageLoad = async ({ params, fetch }) => {
	// const res = await fetch(`http://localhost:3000/autoforms`)
	const res = await fetch(`http://10.2.2.10/albiline.test/api/v1/customers/43/addresses/401730/`)

	if (res.ok) {
		return {
			response: await res.json(),
		};
	}
	
	return {
		response: {}
	}
};
