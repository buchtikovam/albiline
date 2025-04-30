export interface PageMetaDataType {
	userConfig: {
		language: "cs-CZ" | "en-US";
		theme: "light" | "dark";
	},
	keys: string[],
	layout: any,
	inputs: PageMetaDataInputs,
}

export interface PageMetaDataInputs {
	fulltextEnabled: boolean,
	columnFiltersEnabled: boolean,
}
