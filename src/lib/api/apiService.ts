export default async function apiService(endpoint: string, method = 'GET', headers = {}, body = null) {
	const url = `http://localhost:3000/${endpoint}`;

	console.log("endpoint", endpoint);
	console.log("method", method);
	console.log("headers", headers);
	console.log("body", body);

	const response = await fetch(url, {
		method,
		headers,
		body: body ? JSON.stringify(body) : undefined,
	});

	return await response.json();
}
