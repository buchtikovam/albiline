import { type Actions, redirect } from "@sveltejs/kit";

export const actions: Actions = {
	default: async ({ cookies }) => {
	 	cookies.delete('auth', { path: '/' });
		redirect(303, '/login');
	}
} satisfies Actions;
