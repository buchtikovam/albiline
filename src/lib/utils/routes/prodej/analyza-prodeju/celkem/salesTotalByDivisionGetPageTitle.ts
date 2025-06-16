import type {InputParamsInput} from "$lib/types/components/input-params/inputParams";

export function salesTotalByDivisionGetPageTitle(inputs: InputParamsInput[]): string { // todo překlad
	const dateFrom = inputs.find(f => f.field === 'datefrom')?.value || '';
	const dateTo = inputs.find(f => f.field === 'dateto')?.value || '';
	const countryCode = inputs.find(f => f.field === 'salescountrycode')?.value || '';
	let currency = "CZK";
	let formattedDateFrom = dateFrom.toString().replace(" 00:00:00:000", "");
	let formattedDateTo = dateTo.toString().replace(" 00:00:00:000", "");

	if (countryCode === "CZ") currency = "CZK";
	if (countryCode === "SK") currency = "EUR";
	if (countryCode === "PL") currency = "PLN";

	let lastSentance = countryCode === "Vše" ? " Částky z cizích měn přepočteny do CZK kurzem příslušného měsíce." : "";

	return `Prodeje za období <b>${formattedDateFrom}-${formattedDateTo}</b>. Vše v <b>${currency}</b> bez DPH.${lastSentance}`;
}
