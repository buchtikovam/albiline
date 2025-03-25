import {type Actions, redirect} from "@sveltejs/kit";

export const actions: Actions = {
	default: async ({ cookies }) => {
		cookies.set("auth", "", {
			httpOnly: true,
			path: "/",
			secure: false,
			maxAge: 0,
		})

		redirect(303, '/login');
	}
} satisfies Actions;
