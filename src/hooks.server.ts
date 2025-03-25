import {type Handle, type HandleServerError, redirect, type ServerInit } from '@sveltejs/kit';
import {authenticateUser } from '$lib/api/userService';
import {sequence } from '@sveltejs/kit/hooks';
import {paraglideMiddleware} from "$lib/paraglide/server";

// creating a handle to use the paraglide middleware
const paraglideHandle: Handle = ({ event, resolve }) =>
	paraglideMiddleware(event.request, ({ request: localizedRequest, locale }) => {
		event.request = localizedRequest;
		return resolve(event, {
			transformPageChunk: ({ html }) => {
				return html.replace('%lang%', locale);
			}
		});
	});


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



export const handle = sequence(paraglideHandle, handleProtectedRoute);
