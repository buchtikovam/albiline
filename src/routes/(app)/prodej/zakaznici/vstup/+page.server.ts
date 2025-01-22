import type {PageServerLoad} from "../../../../../../.svelte-kit/types/src/routes/(app)/prodej/zakaznici/vstup/$types";
import type {Actions} from "@sveltejs/kit";


export const load: PageServerLoad = async ({ params }) => {
	console.log("LOAD")

	// return {
	// 	post: await db.getPost(params.slug)
	// };
};



export const actions = {
	default: async (event) => {
		console.log("ACTION")

		return;
	}
} satisfies Actions;
