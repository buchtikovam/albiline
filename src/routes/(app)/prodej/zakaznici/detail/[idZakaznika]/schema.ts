import { z } from "zod";
 
export const themes = ["light", "dark"] as const;
export const languages = ["en", "es", "fr"] as const;
export const allergies = ["peanuts", "dairy", "gluten", "soy", "shellfish"] as const;
 
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
	paymentTypeCode: z.string(), // typ platby
	dueDays: z.number(), // splatnost
	invoiceCopies: z.number(), // počet faktur
	deliveryNoteCopies: z.number(), // počet dodacích listů
	customerRank: z.string(), // bonita
	retailStoreTypeId: z.string(), // typ prodejny
	isReturnAllowed: z.boolean(), // vratka povolena
	customerStoreCode: z.string(), // id zákazníka dle zákazníka
	customerStoreEan: z.string(), // ean zákazníka
	// používat asortní eany
	// balit do klt
	sendInvoiceViaEmail: z.boolean(), // faktury emailem
	emailForInvoicing: z.string().email(), // email pro fakturaci
	sendDeliveryNoteViaEmail: z.boolean(), // dodací listy emailem
	emailForDeliveryNotes: z.string().email(), // email pro dodací listy
	// provádět kontrolu u vratek
	splitOrderByFood: z.boolean(),


	// POPIS

	// OZ a oblasti

	// STRUKTURA

	// AVÍZA
});