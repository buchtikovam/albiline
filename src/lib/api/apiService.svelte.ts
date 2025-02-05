import {authDetails} from '$lib/runes/page.svelte';
import {languageTag} from "$lib/paraglide/runtime";


const url = "http://10.2.2.10/albiline.test/api/v1/";
const sessionKey = $derived(authDetails.sessionKey);


export async function apiServiceGET(endpoint: string): Promise<Response> {
	return await fetch(url + endpoint, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'Session-Key': sessionKey || "",
			'Accept-Language' : languageTag(),
		}
	});
}


export async function apiServicePOST(endpoint: string, body = {}): Promise<Response> {
	return await fetch(url + endpoint, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Session-Key': sessionKey || "",
			'Accept-Language' : languageTag(),
		},
		body: body ? JSON.stringify(body) : undefined
	});
}


export async function apiServicePUT(endpoint: string, id: number, body = {}): Promise<Response> {
	return await fetch(url + endpoint, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			'Session-Key': sessionKey || "",
			'Accept-Language' : languageTag(),
		},
		body: body ? JSON.stringify(body) : undefined
	});
}


export async function apiServicePATCH(endpoint: string, body = {}): Promise<Response> {
	return await fetch(url + endpoint, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
			'Session-Key': sessionKey || "",
			'Accept-Language' : languageTag(),
		},
		body: body ? JSON.stringify(body) : undefined
	});
}


export async function apiServiceDELETE(endpoint: string, id: number): Promise<Response> {
	return await fetch(url + endpoint, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			'Session-Key': sessionKey || "",
			'Accept-Language' : languageTag(),
		}
	});
}
