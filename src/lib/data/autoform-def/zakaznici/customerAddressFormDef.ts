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
							schema: z.string(),
						},
					}
				},
				{ // row 2
					rowType: "full",
					inputs: {
						"customerAddressCode": {
							type: "text",
							schema: z.string(),
						},
						"companyName": {
							type: "text",
							schema: z.string(),
						},
					}
				},
				{ // row 3
					rowType: "full",
					inputs: {
						"street": {
							type: "text",
							schema: z.string(),
						},
						"city": {
							type: "text",
							schema: z.string(),
						},
					}
				},
				{ // row 4
					rowType: "full",
					inputs: {
						"postalCode": {
							type: "text",
							schema: z.string(),
						},
						"countryCode": {
							type: "text",
							schema: z.string(),
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
							type: "text",
							schema: z.string(),
						},
						"areaCode": {
							type: "text",
							schema: z.string(),
						},
					}
				},
				{ // row 2
					rowType: "full",
					inputs: {
						"areaId": {
							type: "text",
							schema: z.string(),
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
							type: "text",
							schema: z.string(),
						},
						"dueDays": {
							type: "text",
							schema: z.string(),
						},
					}
				},
				{ // row 2
					rowType: "full",
					inputs: {
						"invoiceCopies": {
							type: "text",
							schema: z.string(),
						},
						"deliveryNoteCopies": {
							type: "text",
							schema: z.string(),
						},
					}
				},
				{ // row 3
					rowType: "full",
					inputs: {
						"customerRank": {
							type: "text",
							schema: z.string(),
						},
						"retailStoreTypeId": {
							type: "text",
							schema: z.string(),
						},
					}
				},
				{ // row 4
					rowType: "full",
					inputs: {
						"customerStoreCode": {
							type: "text",
							schema: z.string(),
						},
						"customerStoreEan": {
							type: "text",
							schema: z.string(),
						},
					}
				},
				{ // row 5
					rowType: "full",
					inputs: {
						"packingNote": {
							type: "text",
							schema: z.string(),
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
							schema: z.string(),
						},
					}
				},
			]
		}
	]
}
