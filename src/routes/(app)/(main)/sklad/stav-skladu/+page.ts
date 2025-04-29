import type { PageLoad } from './$types';
import {getPageMetaData} from "$lib/utils/getPageMetaData";

export const load: PageLoad = async ({ params }) => {
	// console.log(await getPageMetaData())
};
