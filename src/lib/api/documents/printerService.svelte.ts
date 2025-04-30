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
		let printers: string[] = await JSPM.JSPrintManager.getPrinters();

		for (const printer of printers) {
			let info = await JSPM.JSPrintManager.getPrintersInfo(1, printer, 0);

			console.log(info);
		}

		return printers;

	} catch (error) {
		console.error('Error fetching printers:', error);
		return [];
	}
}
