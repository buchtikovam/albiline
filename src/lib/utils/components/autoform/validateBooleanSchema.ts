import type { ZodSchema, ZodError } from "zod";
import * as m from "$lib/paraglide/messages";

export function validateBooleanSchema(
	inputValue: boolean,
	value: boolean | null,
	schema: ZodSchema,
	processData: (inputValue: boolean, value: boolean) => void
): {
	errorMessage: string;
	hasError: boolean;
} {
	let errMessage = "";
	let hasError = false;

	try {
		schema.parse(inputValue);
		if (value !== null) processData(inputValue, value);
	} catch (error) {
		hasError = true;
		console.log(error);
		const issue = (error as ZodError).errors?.[0];

		switch (issue.code) {
			case "invalid_type":
				errMessage = m.zod_boolean_error_invalid_type({
					expected_type: issue.expected,
				});
				break;
		}

		if (value !== null) processData(inputValue, value);
	}

	return {
		errorMessage: errMessage,
		hasError,
	};
}
