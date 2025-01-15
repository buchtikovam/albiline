import type { Preset } from '$lib/types/components/table/presets';
import type { ColDef, ColGroupDef } from 'ag-grid-community';

/* eslint-disable @typescript-eslint/no-explicit-any */

// k ukládání editovaných dat z tabulky + k disabled tabům, když je editedDataStore.length > 0
export const editedTableData: { value: any[] } = $state({ value:[] });

// defaultní definice sloupečků, která se vytvoří z /lib/data/ag-grid/col-def,
// důležité pro nastavení defaultní šablony přes ribbon
export const defaultColDef: { value: (ColDef<unknown, any> | ColGroupDef<unknown>)[]} = $state({ value: [] });

// boolean pro nastavení defaultní šablony
export const setColDefToDefault: { value: boolean } = $state({ value: false })

// store pro uchovávání filtrů v tabulce, důležité pro ukládání nové sady filtrů
export const filtersToSave: { value: Record<string, any> } = $state({ value: {} });

// po vybrání sady filtrů z ribbonu se nastaví do této proměnné, po jejíž změně se načtou filtry do tabulky
export const selectedFilters: { value: Record<string, any> } = $state({ value: {} });

// store pro uchování rozložení sloupečků v tabulce, pro ukládání nové šablony
export const presetToSave: { value: Preset[] } = $state({ value: [] });

// po vybrání šablony z ribbonu se nastaví do této proměnné, po jejíž změně se načte do tabulky
export const selectedPreset: { value: Preset[] } = $state({ value: [] });

// id vybraného řádku v tabulce
export const storedSelectedRows: { value: Record<string, string|number|boolean|Date>[] }  = $state({ value: [] });

export const activeSelectedRowIndex: { value: number } = $state({ value: 0 });

export const lastVisibleRowIndex: { value: number } = $state({ value: 0 });

export const lastRowAndPositions: { value: { lastRow: number|null, startRow: number|undefined, endRow: number|undefined }[] } = $state({ value: [] });
