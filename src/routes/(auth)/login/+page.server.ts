import type {Actions} from "../../../../.svelte-kit/types/src/routes/(app)/$types";
import { redirect } from "@sveltejs/kit";
import {apiServicePOST} from "$lib/api/apiService";
import {customToast} from "$lib/utils/customToast";

export const actions: Actions = {
	default: async ({ cookies, request }) => {
		const data = await request.formData();

		const userCode = data.get("userCode");
		const password = data.get("password");

		console.log("login action", userCode, password);

		const resp = await apiServicePOST("login", {
			userCode: userCode,
			password: password
		});

		const status = resp.status;
		const resData = await resp.json();

		if (resp.status === 200) {
			cookies.set("auth", "usertoken", {
				path: "/",
				httpOnly: true,
				sameSite: "strict",
				secure: process.env.NODE_ENV === "production",
				maxAge: 60 * 60 * 24 * 7, // 1 week
			});

			throw redirect(303, "/");
		} else {
			return {
				status: status,
				data: resData
			}
		}
	},
} satisfies Actions;
