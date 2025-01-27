import type {PageServerLoad} from "../../../../../../.svelte-kit/types/src/routes/(app)/prodej/zakaznici/vstup/$types";
import type {Actions} from "@sveltejs/kit";


export const load: PageServerLoad = async ({ params }) => {
	// return {
	// 	post: await db.getPost(params.slug)
	// };
};



export const actions = {
	default: async (event) => {
		return;
	}
} satisfies Actions;
