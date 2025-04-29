import { type Actions, error, fail, redirect } from "@sveltejs/kit";
import { apiServiceGET, apiServicePATCH } from "$lib/api/apiService.svelte.js";
import { sha512} from "js-sha512";
import { v4 as uuidv4 } from 'uuid';



export const actions: Actions = {
	default: async ({ request }) => {
		try {
			const data = await request.formData();
			const oldPassword = data.get("old-password");
			const newPassword = data.get("new-password");


			// check if inputs are correct
			if (!oldPassword || !newPassword) {
				return fail(400, { messages: [{
						title: "Chybějící údaje",
						content: "Vyplňte všechna povinná pole.",
						type: "Warning",
					}]
				}); // shouldn't run during basic runtime - FE validation
			}


			const regex = new RegExp(/^(?=.*\d)(?=.*[!@#$%^&*_\-+=~`|(){}[\]:;"'<>,.?\/])(?=.*[a-z])(?=.*[A-Z]).{10,}$/);

			if (!regex.test(String(newPassword))) {
				return fail(400, { messages: [{
						title: "Chyba",
						content: "Heslo nesplňuje bezpečnostní požadavky.",
						type: "Critical",
					}]
				}); // shouldn't run during basic runtime - FE validation
			}


			// get old salt
			const userCode = "MBUC"; // PLACEHOLDER
			const getSalt = await apiServiceGET(`login/${userCode}/salt`);
			const saltResp = await getSalt.json().catch(() => null);

			if (!getSalt.ok || !saltResp?.passwordSalt) {
				return fail(getSalt.status, {
					messages: saltResp.messages
				});
			}


			// generate request body
			const passwordHash = sha512(
				`${saltResp.passwordSalt}|${sha512(String(oldPassword)).toUpperCase()}|${userCode}`
			).toUpperCase();

			const newSalt = uuidv4().toUpperCase();
			const body = {
				userCode,
				passwordSalt: newSalt,
				passwordHash,
				passwordHashNew: sha512(
					`${newSalt}|${sha512(String(newPassword)).toUpperCase()}|${userCode}`
				).toUpperCase(),
			};


			// Password update
			const resp = await apiServicePATCH("account/password", body);
			const respData = await resp.json().catch(() => null);

			if (!resp.ok) {
				return fail(resp.status, {
					messages: respData.messages
				});
			}

			redirect(303, '/profil');
		} catch (e) {
			// @ts-ignore
			if (e.status === 303 && e.location) {
				throw e;
			}

			console.error("Unexpected error:", e);

			throw error(500, {
				message: "Internal server error",
			});
		}
	}
} satisfies Actions;
