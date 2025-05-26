import {authDetails, responseDialogMessages} from '$lib/runes/page.svelte';
import {pageKeys} from "$lib/runes/table.svelte";
import {getLocale} from "$lib/paraglide/runtime";
import {triggerLogout} from "$lib/utils/lifecycle/triggerLogout";


const url = "http://10.2.2.10/albiline.test/api/v1/";
const pageKey = $derived(pageKeys.value.value[pageKeys.value.index]);


export async function apiServiceGET(
	endpoint: string,
	pageKeyCustom?: string,
): Promise<Response> {
	// console.log("get", endpoint, pageKey, pageKeyCustom);

	const response = await fetch(url + endpoint, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'Session-Key': authDetails.sessionKey ? authDetails.sessionKey : "",
			'Accept-Language' : getLocale(),
			'Page-Code' : pageKeyCustom ? pageKeyCustom : pageKey,
		},
	});

	if (response.status === 401) {
		await triggerLogout();
		throw new Error("Access denied");
	}

	return response;
}


export async function apiServiceGETHandled(
	endpoint: string,
	pageKeyCustom?: string,
) {
	try {
		let response = await apiServiceGET(endpoint, pageKeyCustom)

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
			content: "Nastala kritická chyba: " + error,
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
	pageKeyCustom?: string,
): Promise<Response> {
	// console.log("post", endpoint, pageKey, pageKeyCustom);

	const response = await fetch(url + endpoint, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Session-Key': authDetails.sessionKey || "",
			'Accept-Language' : getLocale(),
			'Page-Code' : pageKeyCustom ? pageKeyCustom : pageKey,
		},
		body: body ? JSON.stringify(body) : undefined
	});

	if (response.status === 401) {
		await triggerLogout();
		throw new Error("Access denied");
	}

	return response;
}


export async function apiServicePostHandled(
	endpoint: string,
	body = {},
	pageKeyCustom?: string,
) {
	try {
		let response = await apiServicePOST(endpoint, body, pageKeyCustom);

		if (response.ok) {
			return {
				success: true,
				data: response.json(),
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
			content: "Nastala kritická chyba: " + error,
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
	body = {},
	pageKeyCustom?: string,
): Promise<Response> {
	// console.log("patch", endpoint, pageKey);

	const response = await fetch(url + endpoint, {
		method: 'PATCH',
		headers: 	{
			'Content-Type': 'application/json',
			'Session-Key': authDetails.sessionKey || "",
			'Accept-Language' : getLocale(),
			'Page-Code' : pageKeyCustom ? pageKeyCustom : pageKey,
		},
		body: body ? JSON.stringify(body) : undefined
	});

	if (response.status === 401) {
		await triggerLogout();
		throw new Error("Access denied");
	}

	return response;
}


export async function apiServicePatchHandled(
	endpoint: string,
	body = {},
	pageKeyCustom?: string,
) {
	try {
		let response = await apiServicePATCH(endpoint, body, pageKeyCustom)

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
			content: "Nastala kritická chyba: " + error,
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
	body = {},
	pageKeyCustom?: string,
): Promise<Response> {
	// console.log("put", endpoint, pageKey);

	const response = await fetch(url + endpoint + "/" +  id, {
		method: 'PUT',
		headers: 	{
			'Content-Type': 'application/json',
			'Session-Key': authDetails.sessionKey || "",
			'Accept-Language' : getLocale(),
			'Page-Code' : pageKeyCustom ? pageKeyCustom : pageKey,
		},
		body: body ? JSON.stringify(body) : undefined
	});

	if (response.status === 401) {
		await triggerLogout();
		throw new Error("Access denied");
	}

	return response;
}


export async function apiServicePUTHandled(
	endpoint: string,
	id: number,
	body = {},
	pageKeyCustom?: string,
) {
	try {
		let response = await apiServicePUT(endpoint, id, body, pageKeyCustom)

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
			content: "Nastala kritická chyba: " + error,
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
	id: number,
	pageKeyCustom?: string,
): Promise<Response> {
	// console.log("delete", endpoint, pageKey);

	const response = await fetch(url + endpoint + "/" + id, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			'Session-Key': authDetails.sessionKey || "",
			'Accept-Language' : getLocale(),
			'Page-Code' : pageKeyCustom ? pageKeyCustom : pageKey,
		},
	});

	if (response.status === 401) {
		await triggerLogout();
		throw new Error("Access denied");
	}

	return response;
}


export async function apiServiceDELETEHandled(
	endpoint: string,
	id: number,
	pageKeyCustom?: string,
) {
	try {
		let response = await apiServiceDELETE(endpoint, id, pageKeyCustom);

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
			content: "Nastala kritická chyba: " + error,
			type: "Critical",
		}];

		return {
			success: false,
			data: {},
		};
	}
}
