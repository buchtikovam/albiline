import type { InvoiceData } from '$lib/types/pdfs/invoiceData';
import QRCode, { type QRCodeToDataURLOptions } from 'qrcode';
import type { PageLoad } from './$types';
import { albiInfo } from '$lib/constants/info/albiInfo';


export const load: PageLoad = async ({ params, fetch }) => {
	const res = await fetch(`http://10.2.2.10/albiline.test/api/v1/invoices/${params.invoiceNumber}/pdf`)

	console.log("LOAD")


	if (res.ok) {		
		const response: InvoiceData = await res.json();
		// const iban = albiInfo.iban;

		const header = response.header === null ? {} : response.header;
		const price = header.cena_final || 0;

		return {
			response: response,
			qrCode: await QRCode.toDataURL(
				// https://qr-platba.cz/pro-vyvojare/specifikace-formatu/
				// 'SPD*1.0*',
				`SPD*1.0*ACC:${albiInfo.iban}*AM:${price}*CC:CZK`,
				{
					width: 108 * 3,
					margin: 0,
				} as QRCodeToDataURLOptions,
			),
		}
	}
	
	return {}
};
