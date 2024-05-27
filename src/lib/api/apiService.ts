export default async function apiService(endpoint: string, method = 'GET', headers = {}, body = null) {
	const url = `http://localhost:3000/${endpoint}`;

	const response = await fetch(url, {
		method,
		headers,
		body: body ? JSON.stringify(body) : undefined,
	});

	return await response.json();
}
