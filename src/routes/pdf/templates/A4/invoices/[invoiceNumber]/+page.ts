import { albiDetails } from '$lib/constants/albiDetails';
import type { InvoiceData } from '$lib/types/pdf/invoiceData';
import type { PageLoad } from '../$types';
import QRCode, { type QRCodeToDataURLOptions } from 'qrcode';

export const load: PageLoad = async ({ params, fetch }) => {
	// const res = await fetch(`http://10.2.2.10/albiline.test/api/v1/invoices/${params.invoiceNumber}/pdf`)
	const res  = await fetch("http://localhost:3000/invoice")

	if (res.ok) {		
		const response: InvoiceData = await res.json()

		let url = "";
		
		if (response.header !== null) {
			url = `http://api.paylibo.com/paylibo/generator/czech/image?accountNumber=${albiDetails.accountNumber}&bankCode=${albiDetails.bankCode}&amount=${response.header.cena_final}&currency=CZK&random${Math.random()}`;
		}

		return {
			response: response,
			qrCode: await QRCode.toDataURL(
				// https://qr-platba.cz/pro-vyvojare/specifikace-formatu/
				'SPD*1.0*',
				// 'SPD*1.0*ACC:CZ4701000001073027490277*AM:65.00*CC:CZK*RN:Eco Face s.r.o.*X-VS:210709117',
				{
					width: 108 * 3,
					margin: 0,
				} as QRCodeToDataURLOptions,
			),
			url: url
		}
	}
	
	return {}
};
