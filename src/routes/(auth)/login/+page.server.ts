import { authenticateUserLogin } from "$lib/api/userService";
import { apiServiceGET, apiServicePOST } from "$lib/api/apiService.svelte";
import { error, fail, redirect } from "@sveltejs/kit";
import { sha512 } from 'js-sha512';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = ({ cookies }) => {
	if (cookies.get('auth') && authenticateUserLogin(cookies.get('auth'))) {
		throw redirect(303, "/");
	}
};

export const actions = {
	default: async ({ cookies, request }) => {
		try {
			const data = await request.formData();
			const userCode = data.get("userCode")?.toString().trim();
			const password = data.get("password")?.toString();

			// Input validation
			if (!userCode || !password) {
				return fail(400, {
					messages: [{
						title: "Chybějící údaje",
						content: "Vyplň všechna povinná pole",
						type: "Warning",
					}],
					userCode: userCode,
				});
			}


			// Get salt with error handling
			const getSalt = await apiServiceGET(`login/${userCode}/salt`);
			const saltResp = await getSalt.json().catch(() => null);

			if (!getSalt.ok || !saltResp?.passwordSalt) {
				console.log("salt not ok", getSalt)
				return fail(getSalt.status, {
					messages: saltResp?.messages,
					userCode: userCode,
				});
			}


			// Password processing
			const passwordHash = sha512(
				`${saltResp.passwordSalt}|${sha512(password).toUpperCase()}|${userCode.toUpperCase()}`
			).toUpperCase();


			// Login attempt
			const resp = await apiServicePOST("login", {
				userCode: userCode,
				passwordHash: passwordHash
			});

			const responseData = await resp.json().catch(() => null);

			if (!resp.ok) {
				console.log("login not ok ", resp, JSON.stringify({
					userCode: userCode,
					passwordHash: passwordHash
				}));

				return fail(resp.status, {
					messages: responseData?.messages,
					userCode: userCode,
				});
			}

			if (responseData.sessionKey) {
				// Set session cookie
				cookies.set("auth", JSON.stringify({
					sessionKey: responseData.sessionKey,
					userName: responseData.userName,
					email: responseData.email,
					icon: responseData.icon,
				}), {
					httpOnly: true,
					path: "/",
					secure: false,
					maxAge: 60 * 60 * 24 * 7,
				});
			} else {
				return fail(resp.status, {
					messages: [{
						title: "Kritická chyba",
						content: "Nepovedlo se přihlásit",
						type: "Critical",
				}],
					userCode: userCode,
				});
			}

			redirect(303, "/");
		} catch (e) {
			// @ts-ignore
			if (e.status === 303 && e.location) {
				throw e;
			}

			throw error(500, {
				message: "Other error",
			});
		}
	}
} satisfies Actions;
