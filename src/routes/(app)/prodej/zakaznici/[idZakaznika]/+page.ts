import type { PageLoad } from "./$types";


export const load: PageLoad = async ({ params, fetch }) => {
	const res = await fetch(`http://localhost:3000/autoforms`)

	if (res.ok) {		
		return {
			response: await res.json()
		};
	}
	
	return {
		response: {}
	}
};
