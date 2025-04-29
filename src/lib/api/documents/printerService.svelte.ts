import * as JSPM from 'jsprintmanager'

export async function initializePrinterService() {
	try {
		// Set the license URL (point to your SvelteKit endpoint)
		JSPM.JSPrintManager.license_url = "/api/jspm";

		// Initialize print manager
		await JSPM.JSPrintManager.start();

		// Wait for connection
		JSPM.JSPrintManager.auto_reconnect = true;

		await getAvailablePrinters()
		return true;
	} catch (error) {
		console.error('Print service initialization failed:', error);
		return false;
	}
}

export async function getAvailablePrinters() {
	try {
		console.log("trying to get available printers");
		await JSPM.JSPrintManager.getPrinters()

	} catch (error) {
		console.error('Error fetching printers:', error);
		return [];
	}
}
