// @ts-ignore
export const textFilterIncludes = ({ filterValue, value }) => {
		return String(value).toLowerCase().includes(String(filterValue).toLowerCase());
};

// @ts-ignore
export const textFilterStartsWith = ({ filterValue, value }) => {
	return String(value).toLowerCase().startsWith(String(filterValue).toLowerCase());
};

// @ts-ignore
export const textFilterEndsWith = ({ filterValue, value }) => {
	return String(value).toLowerCase().endsWith(String(filterValue).toLowerCase());
};
