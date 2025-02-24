import {authDetails, pageKey} from '$lib/runes/page.svelte';
import {languageTag} from "$lib/paraglide/runtime";


const url = "http://10.2.2.10/albiline.test/api/v1/";
const headers = $state(
	{
		'Content-Type': 'application/json',
		'Session-Key': authDetails.sessionKey || "",
		'Accept-Language' : languageTag(),
		'Page-Code' : pageKey.value,
	}
)





export async function apiServiceGET(
	endpoint: string
): Promise<Response> {
	console.log(pageKey.value)
	return await fetch(url + endpoint, {
		method: 'GET',
		headers: headers,
	});
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
	return await fetch(url + endpoint, {
		method: 'DELETE',
		headers: headers,
	});
}
