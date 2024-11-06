import type { PageLoad } from "./$types";


export const load: PageLoad = async ({ fetch, params }) => {
	// const res = await fetch(`http://localhost:3000/autoforms`)
	const res = await fetch(`http://10.2.2.10/albiline.test/api/v1/customers/${params.idZakaznika}`)

	if (res.ok) {		
		return {
			response: await res.json()
		};
	}
	
	return {
		response: {}
	}
};
