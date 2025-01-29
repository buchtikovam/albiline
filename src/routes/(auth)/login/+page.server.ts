import { authenticateUserLogin } from "$lib/api/userService";
import {apiServiceGET, apiServicePOST} from "$lib/api/apiService.svelte";
import type { Actions, PageServerLoad } from './$types';
import { sha512 } from 'js-sha512';
import { redirect } from "@sveltejs/kit";



export const load: PageServerLoad = ({ cookies }) => {
	if (cookies.get('auth')) {
		if (authenticateUserLogin(cookies.get('auth'))) {
			redirect(303, "/");
		}
	}
};



export const actions = {
	default: async ({ cookies, request }) => {
		const data = await request.formData();
		const userCode = data.get("userCode");
		const password = data.get("password");

		if (password !== null) {
			console.log("password not null")
			const getSalt = await apiServiceGET(`login/${userCode}/salt`);
			const saltResp = await getSalt.json();
			// @ts-ignore
			const passwordHash = sha512(saltResp.passwordSalt + "|" + sha512(password).toUpperCase() + "|" + userCode).toUpperCase();

			console.log("SALT ", saltResp.passwordSalt)
			console.log("USER CODE", userCode);
			// @ts-ignore
			console.log("hashed pass", sha512(password).toUpperCase())
			console.log("PASSWORD", password);


			if (getSalt.ok) {
				console.log("salt ok");

				const resp = await apiServicePOST("login", {
					userCode: userCode,
					passwordHash: passwordHash
				});

				const responseData = await resp.json();

				if (resp.ok) {
					console.log("resp ok");
					cookies.set(
						"auth",
						JSON.stringify(
							{
								sessionKey: responseData.sessionKey,
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
					console.log("resp not ok")

					console.log(resp)

					return {
						status: resp.status,
						data: responseData,
					}
				}
			} else {
				console.log("salt not ok")

				return {
					status: getSalt.status,
					data: saltResp,
				}
			}
		}
	}
} satisfies Actions;
