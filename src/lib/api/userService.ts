import type { RequestEvent } from "@sveltejs/kit"
// import { PUBLIC_API_ROUTE } from "$env/static/public";


export const authenticateUser = (event: RequestEvent) => {
	const { cookies } = event;
	const user = cookies.get("auth");

	console.log(user)
	// this is where you would check the user token against your database
	// to see if it is valid and return the user object
	if (user) {
		console.log("if")
		return {
			id: 1,
			email: "user@example.com",
			role: "USER",
			userCode: "MBUC"
		}
	}

	return null;
}
