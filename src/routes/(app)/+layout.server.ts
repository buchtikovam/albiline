import type { LayoutServerLoad } from "./$types"

export const load: LayoutServerLoad = async ({ cookies }) => {
	const authCookies = cookies.get('auth');

	if (!authCookies) {
		return {
			auth: {}
		}
	}

	return {
		auth: JSON.parse(authCookies)
	}
}


