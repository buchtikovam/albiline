import type {ColDef} from "ag-grid-community";

export function getColumnHeaderTranslations(
	headerTranslations: Record<string,
		() => string>, colDefs: ColDef[]
) : ColDef[] {
	const updateColumnHeaders = (columns: ColDef[] | undefined) => {
		columns?.forEach((column: ColDef) => {
			// Update current column's header if translation exists
			if (column.field && headerTranslations[column.field]) {
				column.headerName = headerTranslations[column.field]();
			}

			// Recursively process children if they exist
			// @ts-ignore
			if (column.children) {
				// @ts-ignore
				updateColumnHeaders(column.children);
			}
		});
	};

	updateColumnHeaders(colDefs);

	return colDefs;
}
