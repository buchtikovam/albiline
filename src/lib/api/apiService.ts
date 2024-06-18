export default async function apiService(endpoint: string, method = 'GET', body = { }) {
	const url = `http://localhost:3000/${endpoint}`;

	return await fetch(url, {
		method,
		headers: { 'Content-Type': 'application/json' },
		body: body ? JSON.stringify(body) : undefined,
	});
}
