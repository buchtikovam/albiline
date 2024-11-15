import type { PageLoad } from './$types';


export const load: PageLoad = async ({ params, fetch }) => {
	const res = await fetch(`http://10.2.2.10/albiline.test/api/v1/customers/${params.idZakaznika}/addresses/${params.idProdejny}/`)
	console.log("load");


	if (res.ok) {
		const response = await res.json();
		const contacts = response.contacts;
		const item = response.item;

		if (contacts && item) {
			return {
				response: {
					item: item,
					contacts: contacts
				},
				state: {
					status: "success",
					message: ""
				}
			};
		}

		return {
			response: {
				item: getObject(),
				contacts: [],
			},
			state: {
				status: "fail",
				message: "no-address"
			}
		};
	}

	return {
		response: {
			item: getObject(),
			contacts: [],
		},
		state: {
			status: "fail",
			message: "not-found"
		}
	};
};


function getObject() {
	return {
		id: null,
		customerNodeCode: "",
		customerName: "",
		name: "",
		customerAddressCode: null,
		companyName: null,
		street: "",
		city: "",
		postalCode: "",
		countryCode: "",
		note: null,
		paymentTypeCode: "",
		dueDays: null,
		invoiceCopies: null,
		deliveryNoteCopies: null,
		customerRank: "",
		retailStoreTypeId: null,
		customerStoreCode: null,
		customerStoreEan: "",
		packingNote: null,
		consignmentSaleEnabled: false,
		isReturnAllowed: false,
		isForConsignmentReturn: false,
		useAssortedEanCodes: false,
		pickingBoxPacking: false,
		splitOrderByFood: false,
		dealerCode: null,
		areaCode: null,
		areaId: null
	}
}
