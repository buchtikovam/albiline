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


export async function apiServiceGetHandeled(endpoint: string) {
	try {
		let response = await apiServiceGET(endpoint)

		if (response.ok) {
			console.log("ok")
			return await response.json();
		}

		console.log("not ok", response.status)
		let respData = await response.json();
		responseDialogMessages.value = respData.messages;
		return {};
	} catch (error) {
		console.error("Unexpected error: ", error);
		responseDialogMessages.value = [{
			title: "Upozornění",
			content: "Nastala kritická chyba" + error,
			type: "Critical",
		}];
		return {};
	}
}


export async function apiServiceGET(
	endpoint: string
): Promise<Response> {
	console.log("page code", headers["Page-Code"])

	return await fetch(url + endpoint, {
		method: 'GET',
		headers: headers,
	});
}


export async function apiServicePOST(
	endpoint: string,
	body = {},
): Promise<Response> {
	console.log("page code", headers["Page-Code"])

	return await fetch(url + endpoint, {
		method: 'POST',
		headers: headers,
		body: body ? JSON.stringify(body) : undefined
	});
}


export async function apiServicePUT(
	endpoint: string,
	id: number,
	body = {}
): Promise<Response> {
	return await fetch(url + endpoint, {
		method: 'PUT',
		headers: headers,
		body: body ? JSON.stringify(body) : undefined
	});
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


export async function apiServiceDELETE(
	endpoint: string,
	id: number
): Promise<Response> {
	return await fetch(url + endpoint + "/" + id, {
		method: 'DELETE',
		headers: headers,
	});
}
