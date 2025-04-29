export interface PageMetaDataType {
	userConfig: {
		language: "cs-CZ" | "en-US";
		theme: "light" | "dark";
	},
	keys: string[],
	layout: any,
	inputs: {
		fulltextEnabled: boolean,
		columnFiltersEnabled: boolean,
	}
}
