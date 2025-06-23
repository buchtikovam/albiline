import type { AutoFormType } from '$lib/types/components/form/autoform';
import { v4 as uuidv4 } from 'uuid';
import * as m from '$lib/paraglide/messages.js'
import {customerAddressDetailFormDef} from "$lib/definitions/routes/prodej/zakaznici/form/customerAddressDetailFormDef";
import {customerAddressOZFormDef} from "$lib/definitions/routes/prodej/zakaznici/form/customerAddressOZFormDef";
import {
	customerAddressSettingsFormDef
} from "$lib/definitions/routes/prodej/zakaznici/form/customerAddressSettingsFormDef";
import {
	customerAddressOtherFormDef
} from "$lib/definitions/routes/prodej/zakaznici/form/customerAddressOtherFormDef";


export const customerAddressDetailAutoFormDef: AutoFormType = {
	left : [
		{
			id: uuidv4(),
			field: "section_addressDetail",
			translation: m.routes_prodej_zakaznici_address_detail_form_section_address_detail,
			isOpen: true,
			rows: customerAddressDetailFormDef,
		},
		{
			id: uuidv4(),
			field: "section_oz",
			translation: m.routes_prodej_zakaznici_address_detail_form_section_oz,
			isOpen: true,
			rows: customerAddressOZFormDef,
		}
	],

	right : [
		{
			id: uuidv4(),
			field: "section_settings",
			translation: m.routes_prodej_zakaznici_address_detail_form_section_settings,
			isOpen: true,
			rows: customerAddressSettingsFormDef,
		},
		{
			id: uuidv4(),
			field: "section_other",
			translation: m.routes_prodej_zakaznici_address_detail_form_section_other,
			isOpen: true,
			rows: customerAddressOtherFormDef,
		}
	]
}
