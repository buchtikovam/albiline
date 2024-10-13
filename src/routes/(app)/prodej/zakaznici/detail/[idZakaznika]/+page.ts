import type { PageLoad } from '../../detail/[idZakaznika]/$types';


export const load: PageLoad = async ({ data, params, fetch }) => {
	const res = await fetch(`http://10.2.2.10/albiline.test/api/v1/customers/${params.idZakaznika}`)

	if (res.ok) {		
		return {
			superForms: data,
			response: await res.json()
		};
	}
	
	return {
		superForms: data, 
		response: {}
	}
};
