import {pageCompact} from "$lib/runes/page.svelte";
import type {ICellRendererParams} from "ag-grid-community";


export function selectButtonWithUrl(
	params: ICellRendererParams,
	url: any,
	onclickFn: (params: ICellRendererParams) => void,
): HTMLDivElement {
	const div = document.createElement('div');
	let divClasses = pageCompact.value
		? ["h-full", "mt-[3px]"]
		: ["h-full", "mt-1.5"]

	div.classList.add(...divClasses);


	const link = document.createElement('a');
	const linkClasses = ["size-5", "text-albi-500", "hover:text-albi-700"];
	div.classList.add(...linkClasses);

	link.href = url;
	link.innerHTML = pageCompact.value
		? "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"14\" height=\"14\" viewBox=\"0 0 22 22\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-external-link\"><path d=\"M15 3h6v6\"/><path d=\"M10 14 21 3\"/><path d=\"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6\"/></svg>"
		:  "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"18\" height=\"18\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-external-link\"><path d=\"M15 3h6v6\"/><path d=\"M10 14 21 3\"/><path d=\"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6\"/></svg>";

	link.addEventListener("click", () => {
		onclickFn(params);
	})

	div.appendChild(link);
	return div;
}
