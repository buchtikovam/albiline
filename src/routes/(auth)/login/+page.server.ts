import type {Actions} from "../../../../.svelte-kit/types/src/routes/(app)/$types";
import { redirect } from "@sveltejs/kit";
import {apiServicePOST} from "$lib/api/apiService.svelte";
import {customToast} from "$lib/utils/customToast";

export const actions: Actions = {
	default: async ({ cookies, request }) => {
		const data = await request.formData();
		const userCode = data.get("userCode");
		const password = data.get("password");

		const resp = await apiServicePOST("login", {
			userCode: userCode,
			password: password
		});

		const responseData = await resp.json();

		if (resp.status === 200) {
			cookies.set(
				"auth",
				JSON.stringify(
					{
						sessionCode: responseData.sessionCode,
						userName: responseData.userName
					}
				),
				{
					path: "/",
					httpOnly: true,
					sameSite: "strict",
					secure: process.env.NODE_ENV === "production",
					maxAge: 60 * 60 * 24 * 7, // 1 week
				}
			);

			throw redirect(303, "/");
		} else {
			return {
				status: resp.status,
				data: responseData,
			}
		}
	},
} satisfies Actions;
