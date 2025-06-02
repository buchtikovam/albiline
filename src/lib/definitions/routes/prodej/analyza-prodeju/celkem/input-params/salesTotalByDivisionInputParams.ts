import type {InputParamsType} from "$lib/types/components/input-params/inputParams";

export const InputParamsSalesTotalByDivision: InputParamsType = {
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
			field: "coverkinokoandbakery",
			type: "boolean",
			label: () => "Vč. Kinoka a Pekařství",
			value: true,
		}
	]
}
