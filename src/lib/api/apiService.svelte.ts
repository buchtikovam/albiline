import {authDetails, pageCode, responseDialogMessages} from '$lib/runes/page.svelte';
import {languageTag} from "$lib/paraglide/runtime";


const url = "http://10.2.2.10/albiline.test/api/v1/";
const headers = $derived(
	{
		'Content-Type': 'application/json',
		'Session-Key': authDetails.sessionKey || "",
		'Accept-Language' : languageTag(),
		'Page-Code' : pageCode.value,
	}
)



export async function apiServiceGET(
	endpoint: string
): Promise<Response> {
	return await fetch(url + endpoint, {
		method: 'GET',
		headers: headers,
	});
}


export async function apiServiceGETHandled(endpoint: string) {
	try {
		let response = await apiServiceGET(endpoint)

		if (response.ok) {
			return {
				success: true,
				data: await response.json(),
			}
		}

		let respData = await response.json();
		responseDialogMessages.value = respData.messages;
		return {
			success: false,
			data: {},
		};
	} catch (error) {
		console.error("Unexpected error: ", error);

		responseDialogMessages.value = [{
			title: "Upozornění",
			content: "Nastala kritická FE chyba" + error,
			type: "Critical",
		}];

		return {
			success: false,
			data: {},
		};
	}
}



export async function apiServicePOST(
	endpoint: string,
	body = {},
): Promise<Response> {
	return await fetch(url + endpoint, {
		method: 'POST',
		headers: headers,
		body: body ? JSON.stringify(body) : undefined
	});
}

export async function apiServicePostHandled(
	endpoint: string,
	body = {},
) {
	try {
		let response = await apiServicePOST(endpoint, body)

		if (response.ok) {
			return {
				success: true,
				data: await response.json(),
			}
		}

		let respData = await response.json();
		responseDialogMessages.value = respData.messages;
		return {
			success: false,
			data: {},
		};
	} catch (error) {
		console.error("Unexpected error: ", error);

		responseDialogMessages.value = [{
			title: "Upozornění",
			content: "Nastala kritická FE chyba" + error,
			type: "Critical",
		}];

		return {
			success: false,
			data: {},
		};
	}
}




export async function apiServicePATCH(
	endpoint: string,
	body = {}
): Promise<Response> {
	return await fetch(url + endpoint, {
		method: 'PATCH',
		headers: headers,
		body: body ? JSON.stringify(body) : undefined
	});
}


export async function apiServicePatchHandled(
	endpoint: string,
	body = {},
) {
	try {
		let response = await apiServicePATCH(endpoint, body)

		if (response.ok) {
			return {
				success: true,
				data: await response.json(),
			}
		}

		let respData = await response.json();
		responseDialogMessages.value = respData.messages;
		return {
			success: false,
			data: {},
		};
	} catch (error) {
		console.error("Unexpected error: ", error);

		responseDialogMessages.value = [{
			title: "Upozornění",
			content: "Nastala kritická FE chyba" + error,
			type: "Critical",
		}];

		return {
			success: false,
			data: {},
		};
	}
}



export async function apiServicePUT(
	endpoint: string,
	id: number,
	body = {}
): Promise<Response> {
	return await fetch(url + endpoint + "/" + id, {
		method: 'PUT',
		headers: headers,
		body: body ? JSON.stringify(body) : undefined
	});
}


export async function apiServicePUTHandled(
	endpoint: string,
	id: number,
	body = {},
) {
	try {
		let response = await apiServicePUT(endpoint, id, body)

		if (response.ok) {
			return {
				success: true,
				data: await response.json(),
			}
		}

		let respData = await response.json();
		responseDialogMessages.value = respData.messages;
		return {
			success: false,
			data: {},
		};
	} catch (error) {
		console.error("Unexpected error: ", error);

		responseDialogMessages.value = [{
			title: "Upozornění",
			content: "Nastala kritická FE chyba" + error,
			type: "Critical",
		}];

		return {
			success: false,
			data: {},
		};
	}
}



export async function apiServiceDELETE(
	endpoint: string,
	id: number
): Promise<Response> {
	return await fetch(url + endpoint + "/" + id, {
		method: 'DELETE',
		headers: headers,
	});
}


export async function apiServiceDELETEHandled(
	endpoint: string,
	id: number,
) {
	try {
		let response = await apiServiceDELETE(endpoint, id)

		if (response.ok) {
			if (response.ok) {
				return {
					success: true,
					data: await response.json(),
				}
			}
		}

		let respData = await response.json();
		responseDialogMessages.value = respData.messages;
		return {
			success: false,
			data: {},
		};
	} catch (error) {
		console.error("Unexpected error: ", error);

		responseDialogMessages.value = [{
			title: "Upozornění",
			content: "Nastala kritická FE chyba" + error,
			type: "Critical",
		}];

		return {
			success: false,
			data: {},
		};
	}
}
