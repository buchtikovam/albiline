import type {ZodError, ZodSchema} from "zod";
import * as m from "$lib/paraglide/messages";

export function validateStringSchema(
	inputValue: string,
	value: string|null,
	schema: ZodSchema,
	processData: (inputValue: string, value: string) => void
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

		if (value) {
			processData(inputValue, value);
		}
	} catch (e: any) {
		console.log(e);
		hasErr = true;

		const issue = (e as ZodError).errors?.[0];

		errMessage = issue.code;

		if (value) {
			processData(inputValue, value);
		}

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
