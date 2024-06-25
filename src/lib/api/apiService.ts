export async function apiServiceGET(endpoint: string) {
	const url = `http://localhost:3000/${endpoint}`;

	return await fetch(url, {
		method: "GET",
		headers: { 'Content-Type': 'application/json' },
	});
}


export async function apiServicePOST(endpoint: string, body = {}) {
	const url = `http://localhost:3000/${endpoint}`;

	return await fetch(url, {
		method: "POST",
		headers: { 'Content-Type': 'application/json' },
		body: body ? JSON.stringify(body) : undefined
	});
}


export async function apiServicePUT(endpoint: string, id: number, body = {}) {
	const url = `http://localhost:3000/${endpoint}/${id}`;

	return await fetch(url, {
		method: "PUT",
		headers: { 'Content-Type': 'application/json' },
		body: body ? JSON.stringify(body) : undefined
	});
}


export async function apiServicePATCH(endpoint: string, id: number, body = {}) {
	const url = `http://localhost:3000/${endpoint}/${id}`;

	return await fetch(url, {
		method: "PATCH",
		headers: { 'Content-Type': 'application/json' },
		body: body ? JSON.stringify(body) : undefined
	});
}


export async function apiServiceDELETE(endpoint: string, id: number) {
	const url = `http://localhost:3000/${endpoint}/${id}`;

	return await fetch(url, {
		method: 'DELETE',
		headers: { 'Content-Type': 'application/json' },
	});
}
