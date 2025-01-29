import {authDetails} from '$lib/runes/page.svelte';

const url = "http://10.2.2.10/albiline.test/api/v1/";
const sessionKey = $derived(authDetails.sessionKey);


export async function apiServiceGET(endpoint: string): Promise<Response> {
	return await fetch(url + endpoint, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'Session-Key': sessionKey || ""
		}
	});
}


export async function apiServicePOST(endpoint: string, body = {}): Promise<Response> {
	console.log(JSON.stringify(body));

	return await fetch(url + endpoint, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Session-Key': sessionKey || ""
		},
		body: body ? JSON.stringify(body) : undefined
	});
}


export async function apiServicePUT(endpoint: string, id: number, body = {}): Promise<Response> {
	// const url = PUBLIC_API_ROUTE + endpoint;

	return await fetch(url + endpoint, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			'Session-Key': sessionKey || ""
		},
		body: body ? JSON.stringify(body) : undefined
	});
}


export async function apiServicePATCH(endpoint: string, body = {}): Promise<Response> {
	// const url = PUBLIC_API_ROUTE + endpoint;
	console.log("PATCH")

	return await fetch(url + endpoint, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
			'Session-Key': sessionKey || ""
		},
		body: body ? JSON.stringify(body) : undefined
	});
}


export async function apiServiceDELETE(endpoint: string, id: number): Promise<Response> {
	// const url = PUBLIC_API_ROUTE + endpoint;

	return await fetch(url + endpoint, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			'Session-Key': sessionKey || ""
		}
	});
}
