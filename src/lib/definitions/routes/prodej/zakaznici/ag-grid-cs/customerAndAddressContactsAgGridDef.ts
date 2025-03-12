import {getAgColumn} from "$lib/utils/components/ag-grid/getAgColumn";
import type {GridOptions} from "ag-grid-enterprise";
import * as m from '$lib/paraglide/messages.js'


export const customerAndAddressContactsGridOptions: GridOptions = {
	columnDefs: [
		getAgColumn(
			"isDefault", // Výchozí
			"boolean", 64,
			true, false, false,
			[],
			{ filter: false },
		),

		getAgColumn(
			"enabled", // Aktivní
			"boolean", 60,
			true, false, false,
			[],
			{ filter: false },
		),

		getAgColumn(
			"name", // Jméno
			"text", 120,
			true, false, false,
			[],
			{ filter: false },
		),

		getAgColumn(
			"surname", // Příjmení
			"text", 170,
			true, false, false,
			[],
			{ filter: false },
		),

		getAgColumn(
			"mobile", // Telefon
			"text", 140,
			true, false, false,
			[],
			{ filter: false },
		),

		getAgColumn(
			"phone", // Pevná linka
			"text", 140,
			true, false, false,
			[],
			{ filter: false },
		),

		getAgColumn(
			"email", // Email
			"text", 200,
			true, false, false,
			[],
			{ filter: false },
		),

		getAgColumn(
			"note", // Poznámka
			"text", 140,
			true, false, false,
			[],
			{ filter: false },
		),

		getAgColumn(
			"pdfInvoice", // FA emailem v PDF
			"boolean", 82,
			true, false, false,
			[],
			{ filter: false },
		),

		getAgColumn(
			"pdfDeliveryNote", // DL emailem v PDF
			"boolean", 84,
			true, false, false,
			[],
			{ filter: false },
		),

		getAgColumn(
			"csvInvoice", // FA emailem v CSV
			"boolean", 82,
			true, false, false,
			[],
			{ filter: false },
		),

		getAgColumn(
			"csvDeliveryNote", // DL emailem v CSV
			"boolean", 94,
			true, false, false,
			[],
			{ filter: false },
		),

		getAgColumn(
			"consignmentReturnInfo", // AZ o svozu zásilky
			"boolean", 82,
			true, false, false,
			[],
			{ filter: false },
		),

		getAgColumn(
			"consignmentInfo", // AZ o expedici zásilky
			"boolean", 94,
			true, false, false,
			[],
			{ filter: false },
		),

		getAgColumn(
			"carrierInfo", // Kontakt pro přepravce
			"boolean", 82,
			true, false, false,
			[],
			{ filter: false },
		),
	]
}



export const customerAndAddressContactsHeaderTranslations = {
	name: m.routes_prodej_zakaznici_detail_contacts_input_name,
	surname: m.routes_prodej_zakaznici_detail_contacts_input_surname,
	mobile: m.routes_prodej_zakaznici_detail_contacts_input_mobile,
	phone: m.routes_prodej_zakaznici_detail_contacts_input_phone,
	email: m.routes_prodej_zakaznici_detail_contacts_input_email,
	note: m.routes_prodej_zakaznici_detail_contacts_input_note,
	isDefault: m.routes_prodej_zakaznici_detail_contacts_input_is_default,
	enabled: m.routes_prodej_zakaznici_detail_contacts_input_enabled,
	pdfInvoice: m.routes_prodej_zakaznici_detail_contacts_input_pdf_invoice,
	pdfDeliveryNote: m.routes_prodej_zakaznici_detail_contacts_input_pdf_delivery_note,
	csvInvoice: m.routes_prodej_zakaznici_detail_contacts_input_csv_invoice,
	csvDeliveryNote: m.routes_prodej_zakaznici_detail_contacts_input_csv_delivery_note,
	consignmentReturnInfo: m.routes_prodej_zakaznici_detail_contacts_input_consignment_return_info,
	consignmentInfo: m.routes_prodej_zakaznici_detail_contacts_input_consignment_info,
	carrierInfo: m.routes_prodej_zakaznici_detail_contacts_input_carrier_info,
}
