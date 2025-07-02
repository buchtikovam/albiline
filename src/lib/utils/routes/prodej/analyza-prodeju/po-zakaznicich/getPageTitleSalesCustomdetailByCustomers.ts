import type {InputParamsInput} from "$lib/types/components/input-params/inputParams";

export function getPageTitleSalesCustomdetailByCustomers(inputs: InputParamsInput[]|undefined) {
	if (inputs) {
		const dateFrom = inputs.find(f => f.field === 'datefrom')?.value || '';
		const dateTo = inputs.find(f => f.field === 'dateto')?.value || '';

		return `
			Detail pro: období <b>${dateFrom.toString().replace(" 00:00:00:000", "")}-${dateTo.toString().replace(" 00:00:00:000", "")}</b>,
			země = <b>${inputs.find(f => f.field === 'salescountrycode')?.value || 'vše'}</b>,
			prodejní kanál = <b>${inputs.find(f => f.field === 'saleschannel')?.value || 'vše'}</b>,
			divize = <b>${inputs.find(f => f.field === 'divisionid')?.value || ""}</b>,
			linie = <b>${inputs.find(f => f.field === 'productlineid')?.value === -1 ? 'vše' : inputs.find(f => f.field === 'productlineid')?.value || ""}</b>,
			KLP = <b>${inputs.find(f => f.field === 'costlevelcode')?.value || 'vše'}</b>`;
	}

	return "";
}
