export default async function apiService(endpoint: string, method = 'GET', headers = {}, body = null) {
	const url = `http://localhost:3000/${endpoint}`;

	try {
		const response = await fetch(url, {
			method,
			headers,
			body: body ? JSON.stringify(body) : undefined,
		});

		if (!response.ok) {
			throw new Error(`API request failed with status ${response.status}`);
		}

		return await response.json();
	} catch (error) {
		console.error('API request error:', error);
		throw error;
	}
}
