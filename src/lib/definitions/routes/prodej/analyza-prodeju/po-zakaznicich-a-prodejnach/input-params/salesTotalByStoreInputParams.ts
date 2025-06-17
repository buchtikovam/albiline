import type {InputParamsType} from "$lib/types/components/input-params/inputParams";

export const SalesTotalByStoreInputParams: InputParamsType = {
	fulltext: "",

	inputs: [
		{
			field: "datefrom",
			type: "date",
			label: () => "Datum od",
			value: "01.04.2024"
		},
		{
			field: "dateto",
			type: "date",
			label: () => "Datum do",
			value: "02.04.2024"
		},
		{
			field: "salescountrycode",
			type: "enum",
			label: () => "Země",
			value: "CZ",
			dropdownOptions: ["CZ", "SK", "PL", "Vše"]
		},

		{
			field: "customerorstorecode",
			type: "number",
			label: () => "ID zákazníka či prodejny",
			value: -1,
		},
		{
			field: "customerorstorename",
			type: "text",
			label: () => "Název zákazníka",
			value: "",
		},
		{
			field: "coverwholesaleexport",
			type: "boolean",
			label: () => "Vč. exportu",
			value: false,
		},
		{
			field: "coverb2c",
			type: "boolean",
			label: () => "Vč. B2C klientů",
			value: false,
		},
		{
			field: "onlyconsignments",
			type: "boolean",
			label: () => "Pouze Komise",
			value: false,
		},
		{
			field: "covercreditnotes",
			type: "boolean",
			label: () => "Včetně dobropisů",
			value: true,
		},
		{
			field: "bystores",
			type: "boolean",
			label: () => "Dle prodejen",
			value: true,
		},
	]
}
