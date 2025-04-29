import { sha512_256 } from 'js-sha512';

export function GET({ url }) {
	// SET YOUR LICENSE INFORMATION HERE
	const licence_owner = "Albi Ceska republika a.s. - 1 WebApp Lic - 2 WebServer Lic - (Basic Edition)";
	const licence_key = "FDE0FF07E9960E130A7ADCD33762EE657942F525";

	// Get timestamp from query parameters
	const timestamp = url.searchParams.get('timestamp');

	// Generate the license hash
	const licence_hash = sha512_256(licence_key + timestamp);

	console.log(licence_hash)

	// Return the response
	return new Response(`${licence_owner}|${licence_hash}`, {
		headers: {
			'Content-Type': 'text/plain'
		}
	});
}
