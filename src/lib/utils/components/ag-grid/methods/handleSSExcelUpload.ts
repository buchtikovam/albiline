import * as XLSX from "xlsx";
import type {GridApi} from "ag-grid-enterprise";


export function handleSSExcelUpload(
	event: Event,
	gridApi: GridApi
) {
	const target = event.target as HTMLInputElement;
	if (target.files && target.files.length > 0) {
		const file = target.files[0];
		const reader = new FileReader();
		reader.onload = (e) => {
			const result = e.target?.result;
			if (!result) return;

			const data = new Uint8Array(result as ArrayBuffer);
			const workbook = XLSX.read(data, { type: "array" });
			const sheetName = workbook.SheetNames[0];
			const sheet = workbook.Sheets[sheetName];

			let columnFields = gridApi.getColumnDefs()?.map(colDef => {
				return {
					// @ts-ignore
					field: colDef.colId,
					headerName: colDef.headerName,
				}
			})


			let jsonData = XLSX.utils.sheet_to_json(sheet);

			const rowDataExc = jsonData.map((row) => {
				const importedRow: Record<string, any> = {};

				if (!columnFields) return;
				columnFields.forEach((columnField) => {
					// @ts-ignore
					importedRow[columnField.field] = row[columnField.headerName];
				})

				return importedRow;
			});

			console.log(rowDataExc);
		};

		reader.readAsArrayBuffer(file);
	}
}
