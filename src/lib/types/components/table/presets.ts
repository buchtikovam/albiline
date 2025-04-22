import type { ColDef, ColGroupDef } from "ag-grid-community"
import type {ColumnState} from "ag-grid-enterprise";

export type StoredPresets = {
	pagePresetId: number,
	pagePresetName: string,
	pagePresetValue: ColumnState[]
}

export type Preset = ColDef<unknown, any> | ColGroupDef<unknown>
