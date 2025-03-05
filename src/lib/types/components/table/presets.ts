import type { ColDef, ColGroupDef } from "ag-grid-community"

export type StoredPresets = {
	pagePresetId: number,
	pagePresetName: string,
	pagePresetValue: StoredPreset[]
}

export type StoredPreset = {
	field: string,
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

export type Preset = ColDef<unknown, any> | ColGroupDef<unknown>
