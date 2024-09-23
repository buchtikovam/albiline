import type { PageLoad } from './$types';


export const load: PageLoad = async ({ data, params, fetch }) => {
	
	

	const res = await fetch(`http://10.2.2.10/albiline.test/api/v1/customers/${params.idZakaznika}`)

	
	if (res.ok) {		
		console.log(await res.json());
		console.log(params.idZakaznika);
		
	}
	
	return {
		superforms: data,
		pageData: {}
	};
};
