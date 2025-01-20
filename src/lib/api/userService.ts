import type { RequestEvent } from "@sveltejs/kit"
// import { PUBLIC_API_ROUTE } from "$env/static/public";


export const authenticateUser = (event: RequestEvent) => {
	// get the cookies from the request
	const { cookies } = event;
	console.log("auth");

	// get the user token from the cookie
	const userToken = cookies.get("auth");

	// if the user token is not valid, return null
	// this is where you would check the user token against your database
	// to see if it is valid and return the user object
	if (userToken === "usertoken") {
		return {
			id: 1,
			email: "user@example.com",
			role: "USER",
			userCode: "MBUC"
		}
	}

	return null;
}
