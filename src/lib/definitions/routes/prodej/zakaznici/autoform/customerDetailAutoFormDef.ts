import { v4 as uuidv4 } from 'uuid';
import type { AutoFormType } from '$lib/types/components/form/autoform';
import Repeat from 'lucide-svelte/icons/repeat';
import * as m from '$lib/paraglide/messages.js';
import {
	customerInvoiceAddressFormDef
} from "$lib/definitions/routes/prodej/zakaznici/form/customerInvoiceAddressFormDef";
import {
	customerInvoiceSettingsFormDef
} from "$lib/definitions/routes/prodej/zakaznici/form/customerInvoiceSettingsFormDef";
import {
	customerFurtherInformationFormDef
} from "$lib/definitions/routes/prodej/zakaznici/form/customerFurtherInformationFormDef";
import {customerEdiFormDef} from "$lib/definitions/routes/prodej/zakaznici/form/customerEdiFormDef";
import {customerSettingsFormDef} from "$lib/definitions/routes/prodej/zakaznici/form/customerSettingsFormDef";


export const customerDetailAutoFormDef: AutoFormType = {
	left: [
		{
			id: uuidv4(),
			field: "section_fakturacni_adresa",
			translation: m.routes_prodej_zakaznici_customer_detail_form_section_fakturacni_adresa,
			hasDialog: true,
			dialogId: "customer-detail-invoice-addresses",
			icon: Repeat,
			isOpen: true,
			rows: customerInvoiceAddressFormDef,
		},
		{
			id: uuidv4(),
			field: "section_invoice_settings",
			translation: m.routes_prodej_zakaznici_customer_detail_form_section_nastaveni_fakturace,
			isOpen: true,
			rows: customerInvoiceSettingsFormDef,
		}
	],
	right: [
		{
			id: uuidv4(),
			field: "section_dalsi_udaje",
			translation: m.routes_prodej_zakaznici_customer_detail_form_section_dalsi_udaje,
			isOpen: true,
			rows: customerFurtherInformationFormDef,
		},

		{
			id: uuidv4(),
			field: "section_edi",
			translation: m.routes_prodej_zakaznici_customer_detail_form_section_edi,
			isOpen: true,
			rows: customerEdiFormDef,
		},
		{
			id: uuidv4(),
			field: "section_nastaveni",
			translation: m.routes_prodej_zakaznici_customer_detail_form_section_nastaveni,
			isOpen: true,
			rows: customerSettingsFormDef,
		}
	]
}
