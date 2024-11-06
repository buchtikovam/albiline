import type { PageLoad } from '../../../../../../../../.svelte-kit/types/src/routes/(app)/$types';


export const load: PageLoad = async ({ params, fetch }) => {
	console.log(params);

	const res = await fetch(`http://10.2.2.10/albiline.test/api/v1/customers/${params.idZakaznika}/addresses/${params.idProdejny}/`)

	if (res.ok) {
		return {
			response: await res.json(),
		};
	}
	
	return {
		response: {}
	}
};
