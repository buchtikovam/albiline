import type { AutoForm } from "$lib/types/components/form/autoform/autoform";
import Pencil from "lucide-svelte/icons/pencil";
import { z } from "zod";



// "customers": [
// 	"details": [
// 		"form": [
// 			"section_1": [
// 				"label": "sekce první",
// 				"fields": [
// 					"first_name": "Jméno",
// 				],
// 			]
// 		]
// 	]
// ]


//
// const form = [
// 	"section_1": [
// 		"first_name": [
// 			size: 3,
// 			schema: z.string().max(250),
// 		],
// 		"last_name": [
// 			size: 3,
// 			schema: z.enum(["Salmon", "Tuna", "Trout"]),
// 		],
// 		"stores": [
// 			size: 3,
// 			schema: z.string().required(),
// 		],
// 	},
// 	"section_2": [
// 		"order_count": [
// 			size: 3,
// 			schema: z.number().max(250),
// 		],
// 		"last_name": [
// 			size: 3,
// 			schema: z.string().max(250),
// 		],
// 	},
// };
//
//
// const form = z.object({
// 	z.discriminatedUnion("section_1", [
// 		first_name: z.string().max(250).
// 	})
// })
//
// //
// // //forms[0].["first_name"]
// //
// // foreach(sections as seciton => key)  {
// // 	foreach(setions.fields as field => $key) {
// // 		// key je "first_name"
// // 		// field je [size:3,schema:Z]
// //
//
// stores = wawait fetch('api/stores').json();
//
// field.schema.enum(stores)
//
// field.schema.optins


// 		<Input on:change="field.schema.parse($this.value)"
// 	}
//
// }

// {
// 	first_name: "pepík"
// }

// export const zakazniciDetailFormDef: AutoForm = [
// 	"Sekce 1" : {
// 		id: 1,


// 	},

// ]


export const customerDetailFormDef: AutoForm = {
	col1 : [
		{ // ?section 5
			id: 5,
			label: "Fakturační adresa",
			hasDialog: true,
			dialogId: "customer-detail-invoice-addresses",
			dialogIcon: Pencil,
			isOpen: true,
			sectionDef: [
				{ // ?row 4
					id: 5,
					rowType: "full",
					rowInputs: [
						{ // ?input 1
							label: "Název",
							type: "text",
							variableName: "i_name",
						},
						{ // ?input 1
							label: "Společnost",
							type: "text",
							variableName: "i_dic",
						},
					]
				},
				{ // ?row 1
					id: 0,
					rowType: "full",
					rowInputs: [
						{ // ?input 1
							label: "Platnost od",
							type: "text",
							variableName: "platnostOd",
						},
						{ // ?input 2
							label: "Platnost do",
							type: "text",
							variableName: "platnostDo",
						},
					]
				},
				{ // ?row 1
					id: 1,
					rowType: "full",
					rowInputs: [

						{ // ?input 2
							label: "Ulice",
							type: "text",
							variableName: "i_street",
						},
						{ // ?input 1
							label: "Město",
							type: "text",
							variableName: "i_city",
						},
					]
				},
				{ // ?row 2
					id: 2,
					rowType: "full",
					rowInputs: [
						{ // ?input 2
							label: "PSČ",
							type: "text",
							variableName: "i_postalCode",
						},
						{ // ?input 1
							label: "Země",
							type: "text",
							variableName: "i_country",
						},
					]
				},
				{ // ?row 3
					id: 3,
					rowType: "full",
					rowInputs: [
						{ // ?input 2
							label: "IČO",
							type: "text",
							variableName: "i_ico",
						},
						{ // ?input 1
							label: "DIČ",
							type: "text",
							variableName: "i_dic",
						},
					]
				},
				{ // ?row 4
					id: 4,
					rowType: "full",
					rowInputs: [

						{ // ?input 2
							label: "IčDPH",
							type: "text",
							variableName: "i_icDph",
						},
						{
							type: "empty"
						}
					]
				},

			]
		},

		{ // ?section 5
			id: 3,
			label: "Nastavení fakturace",
			isOpen: true,
			sectionDef: [
				{ // ?row 1
					id: 1,
					rowType: "full",
					rowInputs: [
						{ // ?input 1
							label: "Typ platby",
							type: "text",
							variableName: "payment_code",
							schema: z.string().min(3).max(9),
						},
						{ // ?input 2
							label: "Splatnost",
							type: "text",
							variableName: "due_days",
							schema: z.string().min(3).max(9),
						},
					]
				},
				{ // ?row 2
					id: 2,
					rowType: "full",
					rowInputs: [
						{ // ?input 1
							label: "Počet faktur",
							type: "number",
							variableName: "invoice_no",
							schema: z.string().min(3).max(9),
						},
						{ // ?input 2
							label: "Počet dodacích listů",
							type: "number",
							variableName: "dl_no",
							schema: z.string().min(3).max(9),
						},
					]
				},
				{ // ?row 4
					id: 4,
					rowType: "full",
					rowInputs: [
						{ // ?input 1
							label: "ID zákazníka dle zákazníka",
							type: "text",
							variableName: "customerStoreCode",
							schema: z.string().min(3).max(9),
						},
						{
							type: "empty",
						}
					]
				},


				{ // ?row 4
					id: 5,
					rowType: "checkbox",
					rowInputs: [
						{
							label: "Komise",
							type: "checkbox",
							variableName: "consignmentSaleEnabled",
							schema: z.boolean(),
						},
						{
							label: "Vratka povolena",
							type: "checkbox",
							variableName: "Vratka povolena",
							schema: z.boolean(),
						},

						{
							label: "Požívat as. EANy",
							type: "checkbox",
							variableName: "Požívat as. EANy",
							schema: z.boolean(),
						},

					]
				},
			]
		},
	],

	col2 : [
		{ // ?section 2
			id: 2,
			label: "Další údaje",
			isOpen: true,
			sectionDef: [
				{ // ?row 1
					id: 1,
					rowType: "full",
					rowInputs: [
						{ // ?input 1
							label: "ID ALBI dodavatel",
							type: "text",
							variableName: "id_albi_dodavatel",
							schema: z.string(),
						},
						{ // ?input 2
							label: "Typ KZ",
							type: "text",
							variableName: "typ_kz",
						},
					]
				},
				{ // ?row 2
					id: 2,
					rowType: "full",
					rowInputs: [
						{ // ?input 1
							label: "Úvěrový rámec",
							type: "text",
							variableName: "uverovy_ramec",
						},
						{ // ?input 2
							label: "Nesplaceno",
							type: "text",
							variableName: "nesplaceno",
						},
					]
				},
				{ // ?row 3
					id: 3,
					rowType: "full",
					rowInputs: [
						{ // ?input 1
							label: "Poslední platba",
							type: "text",
							variableName: "posledni_platba",
						},
						{
							label: "Reg. email do eshopu",
							type: "text",
							variableName: "reg_email",
						},
					]
				},
			]
		},

		{ // ?section 6
			id: 6,
			label: "EDI",
			isOpen: true,
			sectionDef: [
				{ // ?row 1
					id: 1,
					rowType: "full",
					rowInputs: [
						{
							label: "EAN schránky",
							type: "text",
							variableName: "edi_ean_schranky",
						},
						{
							label: "EAN centrály",
							type: "text",
							variableName: "edi_ean_centraly",
						},
					]
				},
				{ // ?row 1
					id: 9,
					rowType: "full",
					rowInputs: [
						{ // ?input 2
							label: "EAN zákazníka",
							type: "text",
							variableName: "customerStoreEan",
							schema: z.string().min(3).max(9),
						},
						{
							type: "empty",
						}
					]
				},
				{ // ?row 2
					id: 2,
					rowType: "checkbox",
					rowInputs: [
						{
							label: "Dodací list",
							type: "checkbox",
							variableName: "edi_dl",
						},
						{
							label: "Dobropis",
							type: "checkbox",
							variableName: "edi_dobropis",
						},
						{
							label: "Použít diakritiku",
							type: "checkbox",
							variableName: "edi_dia",
						},
						{
							label: "Faktury",
							type: "checkbox",
							variableName: "edi_faktury",
						},
					]
				},
			]
		},


		{ // ?section 4
			id: 4,
			label: "Nastavení",
			isOpen: true,
			sectionDef: [
				{ // ?row 1
					id: 1,
					rowType: "checkbox",
					rowInputs: [
						{
							label: "Výstupní kontrola",
							type: "checkbox",
							variableName: "1",
						},
						{
							label: "DL tisk cena",
							type: "checkbox",
							variableName: "2",
						},
						{
							label: "Faktury dodatečně",
							type: "checkbox",
							variableName: "3",
						},

						{
							label: "Účtovat bez DPH",
							type: "checkbox",
							variableName: "5",
						},

						{
							label: "Neblokovat",
							type: "checkbox",
							variableName: "7",
						},
						{
							label: "Nevyžadovat potvrzení faktury",
							type: "checkbox",
							variableName: "8",
						},
						{
							label: "Neupomínat",
							type: "checkbox",
							variableName: "9",
						},
						{
							label: "Zasílat novinky",
							type: "checkbox",
							variableName: "10",
						},
						{
							label: "B2B aktivní",
							type: "checkbox",
							variableName: "11",
						},
						{
							label: "Blokovaný zákazník",
							type: "checkbox",
							variableName: "3",
						},
						{
							label: "Neplatič",
							type: "checkbox",
							variableName: "4",
						},
						{
							label: "Schváleno",
							type: "checkbox",
							variableName: "5",
						},
						{
							label: "Smlouva",
							type: "checkbox",
							variableName: "4",
						},
						{
							label: "Živnostenský list",
							type: "checkbox",
							variableName: "6",
						},
					]
				},
			]
		},
	],

	// col3 : []
}
