import { i18n } from '$lib/i18n.js';
import { type Handle, type HandleServerError, redirect, type ServerInit } from '@sveltejs/kit';
import { authenticateUser } from '$lib/api/userService';
import { sequence } from '@sveltejs/kit/hooks';

export const i18nHandle = i18n.handle();

export const handleProtectedRoute: Handle = async ({ event, resolve }) => {
	event.locals.user = authenticateUser(event);

	if (event.route.id) {
		if (event.route.id.startsWith('/(app)')) {
			if (!event.locals.user) {
				throw redirect(303, '/login');
			}
		}
	}

	return resolve(event);
};

export const init: ServerInit = async () => {
	// For example database connection
};

export const handleError: HandleServerError = async ({ error, event, status, message }) => {
	// Implement external error logging service here, e.g. Sentry
	// Sentry.captureException(error, {
	// 	extra: { event, crypto.randomUUID(), status }
	// });

	return {
		message: message
	};
};



export const handle = sequence(i18nHandle, handleProtectedRoute);
