import { type Actions, redirect } from "@sveltejs/kit";

export const actions: Actions = {
	default: async ({ cookies }) => {
		console.log("BEFORE", cookies.get("auth"))

		console.log(cookies.getAll());


	 	cookies.delete('auth', { path: '/' });
		console.log("AFTER", typeof(cookies.get("auth")))
		redirect(303, '/login');
	}
} satisfies Actions;
