import { authenticateUserLogin } from "$lib/api/userService";
import {apiServiceGET, apiServicePOST} from "$lib/api/apiService.svelte";
import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from './$types';
import type { Actions } from "../../../../.svelte-kit/types/src/routes/(app)/$types";
import {sha512} from "js-sha512";


export const load: PageServerLoad = ({ cookies }) => {
	if (cookies.get('auth')) {
		if (authenticateUserLogin(cookies.get('auth'))) {
			redirect(303, "/");
		}
	}
};


export const actions: Actions = {
	default: async ({ cookies, request }) => {
		const data = await request.formData();
		const userCode = data.get("userCode");
		const password = data.get("password");

		const getSalt = await apiServiceGET(`login/${userCode}/salt`);
		const saltResp = await getSalt.json();

		console.log("usercode", userCode);
		console.log("password", password);
		console.log("salt", saltResp.passwordSalt);
		console.log("hashed pass", sha512(password).toUpperCase());
		console.log("pass w salt", saltResp.passwordSalt + "|" + sha512(password).toUpperCase() + "|" + userCode)

		const upperCasedHashedPassword = sha512(password).toUpperCase();

		const passwordHash = sha512(saltResp.passwordSalt + "|" + sha512(password).toUpperCase() + "|" + userCode);
		const passwordHash2 = sha512(saltResp.passwordSalt + "|" + upperCasedHashedPassword + "|" + userCode);

		console.log("passwordHash", passwordHash);
		console.log("passwordHash2", passwordHash2);




		// if (saltResp.ok) {


			// const resp = await apiServicePOST("login", {
			// 	userCode: userCode,
			// 	passwordHash: passwordHash
			// });

			//
			// const responseData = await resp.json();
			//
			// if (resp.status === 200) {
			// 	cookies.set(
			// 		"auth",
			// 		JSON.stringify(
			// 			{
			// 				sessionCode: responseData.sessionCode,
			// 				userName: responseData.userName
			// 			}
			// 		),
			// 		{
			// 			path: "/",
			// 			httpOnly: true,
			// 			sameSite: "strict",
			// 			secure: process.env.NODE_ENV === "production",
			// 			maxAge: 60 * 60 * 24 * 7, // 1 week
			// 		}
			// 	);
			//
			// 	throw redirect(303, "/");
			// } else {
			// 	return {
			// 		status: resp.status,
			// 		data: responseData,
			// 	}
			// }
		// }
	},
} satisfies Actions;
