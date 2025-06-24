import type {ICellRendererParams} from "ag-grid-community";
import {hydrate} from "svelte";
import ArrowRightCellRenderer from "$lib/components/ag-grid/cell-renderer/ArrowRightCellRenderer.svelte";


export class ArrowRightComp {
	eGui!: HTMLDivElement;
	component!: ArrowRightCellRenderer;
	eventListener!: () => void;

	init(params: ICellRendererParams) {
		this.eGui = document.createElement('div');

		this.eGui.classList.add("w-full");
		this.eGui.classList.add("h-full");
		// this.eGui.classList.add("p-0");
		// this.eGui.classList.add("m-0");

		// @ts-ignore
		this.component = hydrate(ArrowRightCellRenderer, {
			target: this.eGui,
			props: {
				params: params
			},
		});
	}

	getGui() {
		return this.eGui;
	}

	refresh(): void {}
}
