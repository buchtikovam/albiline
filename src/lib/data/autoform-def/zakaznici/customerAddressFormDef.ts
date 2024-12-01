import { z } from "zod";
import type { AutoFormType } from '$lib/types/components/form/autoform/autoform';
import { v4 as uuidv4 } from 'uuid';


export const customerAddressDetailFormDef: AutoFormType = {
	col1 : [
		{
			field: "section_addressDetail",
			id: uuidv4(),
			isOpen: true,
			rows: [
				{ // row 1
					rowType: "full",
					inputs: {
						"name": {
							type: "text",
							schema: z.string().max(255),
						},
					}
				},
				{ // row 2
					rowType: "full",
					inputs: {
						"customerAddressCode": {
							type: "number",
							schema: z.number(),
						},
						"companyName": {
							type: "text",
							schema: z.string().max(255),
						},
					}
				},
				{ // row 3
					rowType: "full",
					inputs: {
						"street": {
							type: "text",
							schema: z.string().max(255),
						},
						"city": {
							type: "text",
							schema: z.string().max(255),
						},
					}
				},
				{ // row 4
					rowType: "full",
					inputs: {
						"postalCode": {
							type: "text",
							schema: z.string().max(10),
						},
						"countryCode": {
							type: "dropdown",
							dropdownOptions: ["CZ", "SK", "PL"],
							schema: z.enum(["CZ", "SK", "PL"]),
						},
					}
				}
			]
		},

		{
			field: "section_oz",
			id: uuidv4(),
			isOpen: true,
			rows: [
				{ // row 1
					rowType: "full",
					inputs: {
						"dealerCode": {
							type: "number",
							schema: z.number(),
						},
						"areaCode": {
							type: "number",
							schema: z.number(),
						},
					}
				},
				{ // row 2
					rowType: "full",
					inputs: {
						"areaId": {
							type: "number",
							schema: z.number(),
						},
						"_areaId": {
							type: "empty",
						},
					}
				}
			]
		}
	],

	col2 : [
		{
			field: "section_settings",
			id: uuidv4(),
			isOpen: true,
			rows: [
				{ // row 1
					rowType: "full",
					inputs: {
						"paymentTypeCode": {
							type: "dropdown",
							dropdownOptions: ["V", "A", "B", "C"],
							schema: z.enum(["V", "A", "B", "C"]),
						},
						"dueDays": {
							type: "number",
							schema: z.number(),
						},
					}
				},
				{ // row 2
					rowType: "full",
					inputs: {
						"invoiceCopies": {
							type: "number",
							schema: z.number(),
						},
						"deliveryNoteCopies": {
							type: "number",
							schema: z.number(),
						},
					}
				},
				{ // row 3
					rowType: "full",
					inputs: {
						"customerRank": {
							type: "dropdown",
							dropdownOptions: ["A", "B", "C", "D", "E", "F"],
							schema: z.enum(["A", "B", "C", "D", "E", "F"]),
						},
						"retailStoreTypeId": {
							type: "dropdown",
							dropdownOptions: ["1", "2", "3", "4", "5"],
							schema: z.enum(["1", "2", "3", "4", "5"]),
						},
					}
				},
				{ // row 4
					rowType: "full",
					inputs: {
						"customerStoreCode": {
							type: "number",
							schema: z.number(),
						},
						"customerStoreEan": {
							type: "text",
							schema: z.string().max(255),
						},
					}
				},
				{ // row 5
					rowType: "full",
					inputs: {
						"packingNote": {
							type: "text",
							schema: z.string().max(255),
						},
					}
				},
				{ // row 6
					rowType: "checkbox",
					inputs: {
						"consignmentSaleEnabled": {
							type: "checkbox",
							schema: z.boolean(),
						},
						"isReturnAllowed": {
							type: "checkbox",
							schema: z.boolean(),
						},
						"isForConsignmentReturn": {
							type: "checkbox",
							schema: z.boolean(),
						},
						"useAssortedEanCodes": {
							type: "checkbox",
							schema: z.boolean(),
						},
						"pickingBoxPacking": {
							type: "checkbox",
							schema: z.boolean(),
						},
						"splitOrderByFood": {
							type: "checkbox",
							schema: z.boolean(),
						},
					}
				}
			]
		},
		{
			field: "section_other",
			id: uuidv4(),
			isOpen: true,
			rows: [
				{ // row 1
					rowType: "full",
					inputs: {
						"note": {
							type: "text",
							schema: z.string().max(255),
						},
					}
				},
			]
		}
	]
}
