import type { PageLoad } from "./$types";


export const load: PageLoad = async ({ params, fetch}) => {
	const res = await fetch(`http://10.2.2.10/albiline.test/api/v1/customers/${params.customerNodeCode}`)

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
	}

	return {
		response: {
			item: {},
			contacts: [],
		},
		state: {
			status: "fail",
			message: "not-found"
		}
	};
};
