import type { RequestEvent } from "@sveltejs/kit"

export const authenticateUser = (event: RequestEvent) => {
	const { cookies } = event;
	const user = cookies.get("auth");

	// this is where you would check the user token against your database
	// to see if it is valid and return the user object
	if (user) {
		return {
			id: 1,
			email: "user@example.com",
			role: "USER",
			userCode: "MBUC"
		}
	}

	return null;
}


export const authenticateUserLogin = (user: string|undefined)=> {
	// this is where you would check the user token against your database
	// to see if it is valid and return the user object
	if (user) {
		return {
			id: 1,
			email: "user@example.com",
			role: "USER",
			userCode: "MBUC"
		}
	}

	return null;
}
