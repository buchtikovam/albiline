import { v1 as uuidv1 } from 'uuid';
import { createHash } from "crypto";



export function GET({ url }) {
	// SET YOUR LICENSE INFORMATION HERE
	console.log("GET")

	const licence_owner = 'Albi Ceska republika a.s. - 1 WebApp Lic - 2 WebServer Lic - (Basic Edition)';
	const licence_key = 'FDE0FF07E9960E130A7ADCD33762EE657942F525';

	let uid = uuidv1(); //licence_key + uid
	let licence_hash = createHash("sha256").update(licence_key + uid).digest('hex');

	console.log(licence_hash)
	let output = licence_owner + "|" + licence_hash + "|" + uid;

	console.log(output)
	// Return the response
	return new Response(`${output}`, {
		headers: {
			'Content-Type': 'text/plain',
		}
	});
}
