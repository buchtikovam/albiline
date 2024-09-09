import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, fetch }) => {
	const res = await fetch(`http://10.2.2.10/albiline.test/api/v1/invoices/${params.invoiceNumber}/pdf`)
	
	if (res.ok) {
		return await res.json()
	}

	return {}
};