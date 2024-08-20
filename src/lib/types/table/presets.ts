/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ColDef, ColGroupDef } from "ag-grid-community"

export type FetchedPreset = {
	id: number,
	pageOrigin: string,
	presetName: string,
	presets: ColDef<unknown, any> | ColGroupDef<unknown> 
}

export type Preset = ColDef<unknown, any> | ColGroupDef<unknown> 