import type { InvoiceVat } from "$lib/types/pdfs/invoiceData";

export function getVAT(vatInfo: InvoiceVat) {
	let vatArr = []
	
	vatArr.push({
		sazbaDph: vatInfo.sazba_dph_0,
		cenaBezDph: vatInfo.cenabezdph_0,
		dph: vatInfo.cenasdph_0 - vatInfo.cenabezdph_0,
		cenaSDph: vatInfo.cenasdph_0,
	});

	vatArr.push({
		sazbaDph: vatInfo.sazba_dph_l,
		cenaBezDph: vatInfo.cenabezdph_l,
		dph: vatInfo.cenasdph_l - vatInfo.cenabezdph_l,
		cenaSDph: vatInfo.cenasdph_l,
	});

	vatArr.push({
		sazbaDph: vatInfo.sazba_dph_l2,
		cenaBezDph: vatInfo.cenabezdph_l2,
		dph: vatInfo.cenasdph_l2 - vatInfo.cenabezdph_l2,
		cenaSDph: vatInfo.cenasdph_l2,
	});

	vatArr.push({
		sazbaDph: vatInfo.sazba_dph_h,
		cenaBezDph: vatInfo.cenabezdph_h,
		dph: vatInfo.cenasdph_h - vatInfo.cenabezdph_h,
		cenaSDph: vatInfo.cenasdph_h,
	});

	return vatArr;
}