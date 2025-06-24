import type {InputParamsInput} from "$lib/types/components/input-params/inputParams";

export function getPageTitleSalesDocumentByCustomerorstore(inputs: InputParamsInput[]|undefined): string {
	if (inputs) {
		const dateFrom = inputs.find(f => f.field === 'datefrom')?.value || '';
		const dateTo = inputs.find(f => f.field === 'dateto')?.value || '';
		const customerName = inputs.find(f => f.field === 'customernodename')?.value || '';
		let formattedDateFrom = dateFrom.toString().replace(" 00:00:00:000", "");
		let formattedDateTo = dateTo.toString().replace(" 00:00:00:000", "");

		return `
			Přehled faktur za období
			<b>${formattedDateFrom}-${formattedDateTo}</b> za
			<b>${customerName}</b>
		`;
	}

	return "";
}
