import CustomToolPanel from "../../../components/ag-grid/tool-panels/CustomToolPanel.svelte";
import {hydrate} from "svelte";
import type {IToolPanelComp, IToolPanelParams} from "ag-grid-community";

export interface CustomStatsToolPanelParams extends IToolPanelParams {
	title: string;
}

export class CustomStatsToolPanel implements IToolPanelComp {
	eGui!: HTMLDivElement;
	component!: CustomToolPanel;

	init(params: CustomStatsToolPanelParams) {
		this.eGui = document.createElement("div");

		this.eGui.classList.add("w-full");
		this.eGui.classList.add("p-0");
		this.eGui.classList.add("m-0");

		this.component = hydrate(CustomToolPanel, {
			target: this.eGui,
		});
	}

	getGui() {
		return this.eGui;
	}

	refresh(): void {}
}
