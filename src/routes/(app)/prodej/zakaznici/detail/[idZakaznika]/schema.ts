import { z } from "zod";

export const schema = z.object({
	// FAKTURAČNÍ ÚDAJE
	i_Name: z.string(),
	i_Street: z.string(),
	i_City: z.string(),
	i_PostalCode: z.string(),
	i_CountryCode: z.string(),
	i_ICO: z.string(),
	i_DIC: z.string(),
	i_IcDph: z.string(),
	

	// DODACÍ ADRESA
	customerAddressCode: z.number(),	
	name: z.string(),
	companyName: z.string(),
	street: z.string(),
	city: z.string(),
	postalCode: z.string(),
	countryCode: z.string(),


	// NASTAVENÍ
	consignmentSaleEnabled: z.boolean(), // komise ?
	paymentTypeCode: z.enum(['V', 'U', 'K', 'D']), // typ platby
	dueDays: z.number(), // splatnost
	invoiceCopies: z.number(), // počet faktur
	deliveryNoteCopies: z.number(), // počet dodacích listů
	customerRank: z.enum(['A', 'B', 'C', 'D', 'E', 'T']), // bonita
	retailStoreTypeId: z.number(), // typ prodejny
	retailStoreTypeName: z.string(), // jméno prodejny
	isReturnAllowed: z.boolean(), // vratka povolena
	customerStoreCode: z.string(), // id zákazníka dle zákazníka
	customerStoreEan: z.string(), // ean zákazníka
	useAssortedEanCodes: z.boolean(), // používat asortní eany
	pickingBoxPackaging: z.boolean(), // balit do klt
	sendInvoiceViaEmail: z.boolean(), // faktury emailem
	emailForInvoicing: z.string().email(), // email pro fakturaci
	sendDeliveryNoteViaEmail: z.boolean(), // dodací listy emailem
	emailForDeliveryNotes: z.string().email(), // email pro dodací listy
	// provádět kontrolu u vratek
	splitOrderByFood: z.boolean(),


	// POPIS
	description: z.string(), // bližší popis
	note: z.string(), // poznámka
	responsiblePerson: z.string(), // zodpovědná osoba
	packingNote: z.string(), // poznámka pro balení


	// OZ A OBLASTI
	// oz
	// om
	// oblast
	// merchendiser


	// STRUKTURA
	customerNodeCode: z.number(), // customerNodeCode
	addressType: z.string(), // addressType


	// AVÍZA
	// avízo o svozu zásilky 
	// avízo o expedici objednávky
	// email pro avíza
});
