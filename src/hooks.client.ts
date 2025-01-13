import type { HandleClientError, ServerInit } from '@sveltejs/kit';

export const init: ServerInit = async () => {
	// For example database connection
};

export const handleError: HandleClientError = async ({ error, event, status, message }) => {
	// Implement external error logging service here, e.g. Sentry
	// Sentry.captureException(error, {
	// 	extra: { event, crypto.randomUUID(), status }
	// });

	return {
		message: message,
	};
};
