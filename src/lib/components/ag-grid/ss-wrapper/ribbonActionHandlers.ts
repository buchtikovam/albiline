import { RibbonActionEnum } from '$lib/enums/ribbon/ribbonAction';
import type { GridDependencies } from './types';
import { handleSSExcelUpload } from '$lib/utils/components/ag-grid/methods/handleSSExcelUpload';

export const handleRibbonAction = (
	action: RibbonActionEnum,
	deps: GridDependencies
) => {
	switch (action) {
		case RibbonActionEnum.EXPORT_EXCEL_DATA:
			handleExcelExport(deps);
			break;
		case RibbonActionEnum.IMPORT:
			deps.excelFileInput.click();
			break;
		// Handle other actions
	}
};

const handleExcelExport = ({ gridApi, authDetails }: GridDependencies) => {
	const columns = gridApi.getAllDisplayedColumns()?.slice(1) || [];
	gridApi.exportDataAsExcel({
		columnKeys: columns.map(col => col.getColId()),
		author: authDetails.userName || "AG Grid"
	});
};
