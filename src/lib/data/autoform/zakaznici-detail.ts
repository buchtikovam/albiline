import type { AutoForm } from "$lib/types/components/form/autoform/autoform";
import Pencil from "lucide-svelte/icons/pencil";

export const zakazniciDetailFormDef: AutoForm = 
{
	col1 : [
		{ // ?section 1
			id: 1,
			label: "Sekce 1",
			isOpen: true,
			sectionDef: [
				{ // ?row 1
					id: 1,
					rowType: "full",
					rowInputs: [
						{ // ?input 1
							label: "Název",
							type: "text", 
							variableName: "name",
						},
					]
				},
				{ // ?row 2
					id: 2,
					rowType: "full",
					rowInputs: [
						{ // ?input 1
							label: "Jméno",
							type: "text", 
							variableName: "firstName",
						},
						{ // ?input 2
							label: "Příjmení",
							type: "text", 
							variableName: "lastName",
						},
					]
				},
			]
		},

		{ // ?section 2
			id: 2,
			label: "Sekce 2",
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
						{ // ?input 2
							label: "Popis bližší",
							type: "text", 
							variableName: "popis_blizsi",
						},
					]
				},
			]
		},

		{ // ?section 3
			id: 3,
			label: "Sekce 3",
			isOpen: true,
			sectionDef: [
				{ // ?row 1
					id: 1,
					rowType: "full",
					rowInputs: [
						{ 
							label: "Reg. email do eshopu",
							type: "text", 
							variableName: "reg_email",
						},
						{ 
							label: "Typ",
							type: "text", 
							variableName: "typ",
						},
					]
				},
				{ // ?row 2
					id: 2,
					rowType: "full",
					rowInputs: [
						{ 
							label: "Datum narození",
							type: "text", 
							variableName: "dat_nar",
						},
						{
							type: "empty"
						}
					]
				},
			]
		},

		{ // ?section 4
			id: 4,
			label: "Sekce 4",
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
							label: "Smlouva",
							type: "checkbox", 
							variableName: "4",
						},
						{ 
							label: "Účtovat bez DPH",
							type: "checkbox", 
							variableName: "5",
						},
						{ 
							label: "Živnostenský list",
							type: "checkbox", 
							variableName: "6",
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
					]
				},
			]
		},
	],

	col2 : [
		{ // ?section 5
			id: 5,
			label: "Fakturační údaje",
			hasDialog: true,
			dialogId: "customer-detail-invoice-addresses",
			dialogIcon: Pencil,
			isOpen: true,
			sectionDef: [
				{ // ?row 1
					id: 1,
					rowType: "full",
					rowInputs: [
						{ // ?input 1
							label: "Název",
							type: "text", 
							variableName: "i_name",
						},
						{ // ?input 2
							label: "Ulice",
							type: "text", 
							variableName: "i_street",
						},
					]
				},
				{ // ?row 2
					id: 2,
					rowType: "full",
					rowInputs: [
						{ // ?input 1
							label: "Město",
							type: "text", 
							variableName: "i_city",
						},
						{ // ?input 2
							label: "PSČ",
							type: "text", 
							variableName: "i_postalCode",
						},
					]
				},
				{ // ?row 3
					id: 3,
					rowType: "full",
					rowInputs: [
						{ // ?input 1
							label: "Země",
							type: "text", 
							variableName: "i_country",
						},
						{ // ?input 2
							label: "IČO",
							type: "text", 
							variableName: "i_ico",
						},
					]
				},
				{ // ?row 4
					id: 4,
					rowType: "full",
					rowInputs: [
						{ // ?input 1
							label: "DIČ",
							type: "text", 
							variableName: "i_dic",
						},
						{ // ?input 2
							label: "IčDPH",
							type: "text", 
							variableName: "i_icDph",
						},
					]
				},
			]
		},

		{ // ?section 6
			id: 6,
			label: "Sekce 6",
			isOpen: true,
			sectionDef: [
				{ // ?row 1
					id: 1,
					rowType: "full",
					rowInputs: [
						{ 
							label: "EDI EAN schránky",
							type: "text", 
							variableName: "edi_ean_schranky",
						},
						{ 
							label: "EDI EAN centrály",
							type: "text", 
							variableName: "edi_ean_centraly",
						},
					]
				},
				{ // ?row 2
					id: 2,
					rowType: "checkbox",
					rowInputs: [
						{ 
							label: "EDI dodací list",
							type: "checkbox", 
							variableName: "edi_dl",
						},
						{
							label: "EDI dobropis",
							type: "checkbox", 
							variableName: "edi_dobropis",
						},
						{ 
							label: "EDI použít diakritiku",
							type: "checkbox", 
							variableName: "edi_dia",
						},
						{ 
							label: "EDI faktury",
							type: "checkbox", 
							variableName: "edi_faktury",
						},
					]
				},
			]
		},

		{ // ?section 7
			id: 7,
			label: "Sekce 7",
			isOpen: true,
			sectionDef: [
				{ // ?row 1
					id: 1,
					rowType: "full",
					rowInputs: [
						{ 
							label: "Node (siť)",
							type: "text", 
							variableName: "node",
						},
						{ 
							label: "Výchozí FA adresa",
							type: "text", 
							variableName: "vychozi_fa_ad",
						},
					]
				},
				{ // ?row 2
					id: 2,
					rowType: "full",
					rowInputs: [
						{ 
							label: "Typ FA adresy",
							type: "text", 
							variableName: "typ_fa_ad",
						},
						{ 
							type: "empty", 
						},
						
					]
				},
			]
		},

		{ // ?section 8
			id: 8,
			label: "Sekce 8",
			isOpen: true,
			sectionDef: [
				{ // ?row 1
					id: 1,
					rowType: "checkbox",
					rowInputs: [
						{ 
							label: "Země",
							type: "checkbox", 
							variableName: "1",
						},
						{ 
							label: "Aktivní",
							type: "checkbox", 
							variableName: "2",
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
					]
				},
			]
		},
	],

	// col3 : []
}
