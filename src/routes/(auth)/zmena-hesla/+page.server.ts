// import { authenticateUserLogin } from "$lib/api/userService";
// import {apiServiceGET, apiServicePOST} from "$lib/api/apiService.svelte";
// import type { PageServerLoad } from './$types';
// import { sha512 } from 'js-sha512';
import { type Actions, redirect } from "@sveltejs/kit";
import { apiServiceGET, apiServicePATCH } from "$lib/api/apiService.svelte";
import { sha512} from "js-sha512";
import { v4 as uuidv4 } from 'uuid';



export const actions: Actions = {
	default: async ({ cookies, request }) => {
		const data = await request.formData();
		const userCode = "MBUC";

		const oldPassword = data.get("old-password");
		const newPassword = data.get("new-password");

		console.log(userCode, oldPassword, newPassword);

		const getSalt = await apiServiceGET(`login/${userCode}/salt`);
		const saltResp = await getSalt.json();

		if (getSalt.ok) {
			console.log("SALT OK");

			// @ts-ignore
			const passwordHash = sha512(saltResp.passwordSalt + "|" + sha512(oldPassword).toUpperCase() + "|" + userCode).toUpperCase();


			const body = {
				userCode: userCode,
				passwordSalt: uuidv4().toUpperCase(),
				passwordHash: passwordHash,
				// @ts-ignore
				passwordHashNew: sha512(newPassword).toUpperCase()
			}

			console.log(JSON.stringify(body, null, 1));

			const resp = await apiServicePATCH("account/password", body);
			console.log(resp)
			const respData = await resp.json();

			if (resp.ok) {
				console.log("RESP OK");
				console.log(respData);
				console.log(respData.messages)
				redirect(303, '/profil');
			}
		}


		redirect(303, '/profil');



	}
} satisfies Actions;
