import type {ZodError, ZodSchema} from "zod";
import * as m from "$lib/paraglide/messages";


export function validateStringSchema(
	inputValue: string,
	initialValue: string|null,
	schema: ZodSchema,
	processData: (inputValue: string, initialValue: string|null) => void
): {
	errorMessage: string;
	hasError: boolean;
} {
	let errMessage: string;
	let hasErr: boolean;

	try {
		schema.parse(inputValue);
		errMessage = "";
		hasErr = false;
		processData(inputValue, initialValue);
	} catch (e: any) {
		const issue = (e as ZodError).errors?.[0];
		console.error(issue.code);

		hasErr = true;
		errMessage = issue.code;

		processData(inputValue, initialValue);

		switch (issue.code) {
			case "invalid_string":
				switch (issue.validation) {
					case "email":
						errMessage = m.zod_string_error_invalid_email();
						break;

					case "regex":
						errMessage = m.zod_string_error_regex({
							regex: issue.message
						});
						break;


					// @ts-ignore
					case issue.validation as typeof Object:
						if (issue.validation["includes"]) {
							errMessage = m.zod_string_error_includes({ text_include: issue.validation["includes"] });
						}

						if (issue.validation["startsWith"]) {
							errMessage = m.zod_string_error_starts_with({ text_start: issue.validation["startsWith"] });
						}

						if (issue.validation["endsWith"]) {
							errMessage = m.zod_string_error_ends_with({ text_end: issue.validation["endsWith"] });
						}

						break;
					default: // handles url, uuid, regex, ...
						errMessage = m.zod_string_error_default({ validation_code: issue.validation });
						break;
				}
				break;

			case "too_big":
				errMessage = m.zod_string_error_too_big({
					length: issue.maximum
				});
				break;

			case "too_small":
				errMessage = m.zod_string_error_too_small({ length: issue.minimum });
				break;

			case "invalid_type":
				errMessage = m.zod_string_error_invalid_type({ expected_type: issue.expected });
				break;
		}
	}


	return {
		errorMessage: errMessage,
		hasError: hasErr,
	}
}
