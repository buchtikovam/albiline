import * as JSPM from 'jsprintmanager'
import {browser} from "$app/environment";
import {availablePrinters, jspmError, jspmInitialized} from '$lib/runes/printer.svelte.js';



export async function initializeJSPM() {
	if (!browser) return;

	console.log("jspm init");

	try {
		// License configuration
		JSPM.JSPrintManager.license_url = 'YOUR_LICENSE_KEY';
		JSPM.JSPrintManager.auto_reconnect = true;

		// Start connection
		await JSPM.JSPrintManager.start();

		// Wait for connection
		await new Promise<void>((resolve, reject) => {
			const timeout = setTimeout(() => {
				reject('Connection timeout - JSPM not responding');
			}, 5000);

			if (JSPM.JSPrintManager.WS) {
				JSPM.JSPrintManager.WS.onStatusChanged = () => {
					if (JSPM.JSPrintManager.websocket_status === JSPM.WSStatus.Open) {
						clearTimeout(timeout);
						jspmInitialized.value = true;
						resolve();
					} else if (JSPM.JSPrintManager.websocket_status === JSPM.WSStatus.Closed) {
						clearTimeout(timeout);
						reject('JSPM Client not installed or running');
					}
				};
			}
		});

		// Fetch initial printers list
		// @ts-ignore
		availablePrinters.value = await JSPM.JSPrintManager.getPrinters();
	} catch (error) {
		jspmError.value = error;
		console.error('JSPM Initialization Error:', error);
	}
}






export function getPrintManagerStatus() {
	if (JSPM.JSPrintManager.websocket_status == JSPM.WSStatus.Open)
		return true;
	else if (JSPM.JSPrintManager.websocket_status == JSPM.WSStatus.Closed) {
		alert('JSPrintManager (JSPM) is not installed or not running! Download JSPM Client App from https://neodynamic.com/downloads/jspm');
		return false;
	}
	else if (JSPM.JSPrintManager.websocket_status == JSPM.WSStatus.Blocked) {
		alert('JSPM has blocked this website!');
		return false;
	}
}



export function getPrinters() {
	console.log("GET printers")
	if (JSPM.JSPrintManager.WS) {
		JSPM.JSPrintManager.WS.onStatusChanged = function () {
			if (JSPM.JSPrintManager.websocket_status == JSPM.WSStatus.Open) {
				JSPM.JSPrintManager.getPrinters().then(function (e) {
					console.log(e);
				});
			}
		};
	}
}
