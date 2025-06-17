import type { ZodSchema, ZodError } from "zod";
import * as m from "$lib/paraglide/messages";

export function validateNumberSchema(
	inputValue: number,
	initialValue: number | null,
	schema: ZodSchema,
	processData: (inputValue: number, initialValue: number|null) => void
): {
	errorMessage: string;
	hasError: boolean;
} {
	let errMessage = "";
	let hasErr = false;

	try {
		schema.parse(inputValue);
		processData(inputValue, initialValue);
	} catch (error) {
		hasErr = true;
		console.log(error)
		const issue = (error as ZodError).errors?.[0];
		errMessage = issue.code;

		switch (issue.code) {
			case "invalid_type":
				errMessage = m.zod_number_error_invalid_type({ expected_type: issue.expected });
				break;


			case "too_big":
				errMessage = m.zod_number_error_too_big({
					maximum: issue.maximum,
				});
				break;

			case "too_small":
				errMessage = m.zod_number_error_too_small({
					minimum: issue.minimum,
				});
				break;

			case "not_multiple_of":
				errMessage = m.zod_number_error_not_multiple_of({
					multiplier: issue.multipleOf,
				});
				break;


			default:
				errMessage = m.zod_number_error_default({
					validation_code: issue.code,
				});
				break;
		}

		processData(inputValue, initialValue);
	}

	return {
		errorMessage: errMessage,
		hasError: hasErr,
	};
}
