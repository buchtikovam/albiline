import { i18n } from '$lib/i18n.js';
import type { HandleServerError, ServerInit } from '@sveltejs/kit';


export const handle = i18n.handle();

export const init: ServerInit = async () => {
	// For example database connection
};

export const handleError: HandleServerError = async ({ error, event, status, message }) => {
	// Implement external error logging service here, e.g. Sentry
	// Sentry.captureException(error, {
	// 	extra: { event, crypto.randomUUID(), status }
	// });

	return {
		message: message,
	};
};
