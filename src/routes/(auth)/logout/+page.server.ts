import { type Actions, redirect, fail } from "@sveltejs/kit";
import { apiServicePOST } from "$lib/api/apiService.svelte";

export const actions: Actions = {
	default: async ({ cookies }) => {
		try {
			const response = await apiServicePOST("logout");

			let respData: any;

			try {
				respData = await response.json();
			} catch (jsonError) {
				console.error("Failed to parse logout response JSON:", jsonError);
				return fail(500, {
					messages: [
						{
							title: "Chyba serveru",
							content: "Neplatná odpověď ze serveru.",
							type: "Critical"
						}
					]
				});
			}

			if (!response.ok) {
				console.error("Logout API error:", respData);
				return fail(response.status, {
					messages: [
						{
							title: "Chyba odhlášení",
							content: respData?.message ?? "Odhlášení se nezdařilo.",
							type: "Warning"
						}
					]
				});
			}

			// Clear the cookie
			cookies.set("auth", "", {
				httpOnly: true,
				path: "/",
				secure: false,
				maxAge: 0
			});

			// Redirect on success
			redirect(303, "/login");
		} catch (err) {
			// @ts-ignore
			if (err.status === 303 && err.location) {
				throw err;
			}

			console.error("Unexpected logout error:", err);

			return fail(500, {
				messages: [
					{
						title: "Neočekávaná chyba",
						content: "Něco se pokazilo při odhlašování.",
						type: "Critical"
					}
				]
			});

		}
	}
} satisfies Actions;
