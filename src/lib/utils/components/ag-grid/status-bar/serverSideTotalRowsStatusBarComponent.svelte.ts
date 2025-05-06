import type { IStatusPanelComp, IStatusPanelParams } from 'ag-grid-community';
import {hydrate} from "svelte";
import SSTotalRowsStatusBar from "$lib/components/ag-grid/status-bar/SSTotalRowsStatusBar.svelte";


export class ServerSideTotalRowsStatusBarComponent implements IStatusPanelComp {
	params!: IStatusPanelParams;
	eGui!: HTMLDivElement;
	component!: SSTotalRowsStatusBar;

	init(params: IStatusPanelParams) {
		this.params = params;

		this.eGui = document.createElement('div');

		this.component = hydrate(SSTotalRowsStatusBar, {
			target: this.eGui,
		});
	}

	getGui() {
		return this.eGui;
	}

	destroy() {}
}
