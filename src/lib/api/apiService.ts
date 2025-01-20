import { sessionKey } from '$lib/runes/page.svelte';
import { PUBLIC_API_ROUTE } from "$env/static/public";

export async function apiServiceGET(endpoint: string): Promise<Response> {
	const url = PUBLIC_API_ROUTE + endpoint;

	return await fetch(url, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'Session-Key': sessionKey.value
		}
	});
}


export async function apiServicePOST(endpoint: string, body = {}): Promise<Response> {
	const url = PUBLIC_API_ROUTE + endpoint;

	return await fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Session-Key': sessionKey.value
		},
		body: body ? JSON.stringify(body) : undefined
	});
}


export async function apiServicePUT(endpoint: string, id: number, body = {}): Promise<Response> {
	const url = PUBLIC_API_ROUTE + endpoint;

	return await fetch(url, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			'Session-Key': sessionKey.value
		},
		body: body ? JSON.stringify(body) : undefined
	});
}


export async function apiServicePATCH(endpoint: string, id: number, body = {}): Promise<Response> {
	const url = PUBLIC_API_ROUTE + endpoint;

	return await fetch(url, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
			'Session-Key': sessionKey.value
		},
		body: body ? JSON.stringify(body) : undefined
	});
}


export async function apiServiceDELETE(endpoint: string, id: number): Promise<Response> {
	const url = PUBLIC_API_ROUTE + endpoint;

	return await fetch(url, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			'Session-Key': sessionKey.value
		}
	});
}
