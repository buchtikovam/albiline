// @ts-ignore
export const textPrefixFilter = ({ filterValue, value }) => {
	return String(value).toLowerCase().includes(String(filterValue).toLowerCase());
};
