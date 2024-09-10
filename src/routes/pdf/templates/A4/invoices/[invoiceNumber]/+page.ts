import { albiConst } from '$lib/constants/albiConst';
import type { InvoiceData } from '$lib/types/pdf/invoiceData';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, fetch }) => {
	const res = await fetch(`http://10.2.2.10/albiline.test/api/v1/invoices/${params.invoiceNumber}/pdf`)
	

	if (res.ok) {
		const data: InvoiceData = await res.json()
		const url = `http://api.paylibo.com/paylibo/generator/czech/image?accountNumber=${albiConst.accountNumber}&bankCode=${albiConst.bankCode}&amount=${data.header.cena_final}&currency=CZK`

		return {
			data: data,
			url: url
		}
	}

	return {}
};