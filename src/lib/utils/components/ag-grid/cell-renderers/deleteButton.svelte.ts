import type {ICellRendererParams} from "ag-grid-community";
import {pageCompact} from "$lib/runes/page.svelte";


export function deleteButton(
	params: ICellRendererParams,
	deleteFn: (params: ICellRendererParams) => void
): HTMLDivElement {
	const div = document.createElement('div');
	let divClasses = pageCompact.value
		? ["h-full", "mt-[2px]"]
		: ["h-full", "mt-1.5"];

	div.classList.add(...divClasses);

	const link = document.createElement('button');
	const linkClasses = ["size-5", "text-red-600", "hover:text-red-800", "flex", "justify-center", "items-center"];
	div.classList.add(...linkClasses);

	link.innerHTML = pageCompact.value
		? "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"12\" height=\"12\" viewBox=\"0 0 22 22\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-x\"><path d=\"M18 6 6 18\"/><path d=\"m6 6 12 12\"/></svg>"
		: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"18\" height=\"18\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-x\"><path d=\"M18 6 6 18\"/><path d=\"m6 6 12 12\"/></svg>"

	link.addEventListener("click", () => {
		deleteFn(params);
	})

	div.appendChild(link);
	return div;
}
