import type {InputParamsInput} from "$lib/types/components/input-params/inputParams";

export function getPageTitleSalesTotalByStore(inputs: InputParamsInput[]|undefined): string {
	if (inputs) {
		const dateFrom = inputs.find(f => f.field === 'datefrom')?.value.toString().replace(" 00:00:00:000", "") || '';
		const dateTo = inputs.find(f => f.field === 'dateto')?.value.toString().replace(" 00:00:00:000", "") || '';
		const countryCode = inputs.find(f => f.field === 'salescountrycode')?.value || '';

		let currency = "CZK";
		if (countryCode === "CZ") currency = "CZK";
		if (countryCode === "SK") currency = "EUR";
		if (countryCode === "PL") currency = "PLN";

		return `Prodeje za období <b>${dateFrom}-${dateTo}</b>. Vše v <b>${currency}</b> bez DPH.`;
	}

	return "";
}
