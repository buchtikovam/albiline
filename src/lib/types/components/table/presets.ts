import type { ColDef, ColGroupDef } from "ag-grid-community"

export type StoredPresets = {
	presetId: number,
	presetName: string,
	presetValue: StoredPreset[]
}

export type StoredPreset = {
	field?: string,
	width?: number,
	rowGroup?: boolean,
	hide: boolean,
	rowGroupIndex?: number | null,
	pivot?: boolean,
	pivotIndex?: number | null,
	aggFunc?: any,
	pinned?: boolean | 'left' | 'right' | null,
	sort?: 'asc' | 'desc' | null,
	sortIndex?: number | null,
}

/*
* {
  "field": "customerAddressCode",
  "width": 68,
  "rowGroup": false,
  "rowGroupIndex": null,
  "pivot": false,
  "pivotIndex": null,
  "aggFunc": null,
  "pinned": null,
  "sort": null,
  "sortIndex": null,
},

* */

export type Preset = ColDef<unknown, any> | ColGroupDef<unknown>
