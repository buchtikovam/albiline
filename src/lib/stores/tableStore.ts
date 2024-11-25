import type { ColumnFilters } from '$lib/types/components/table/columnFilter';
import { writable, type Writable } from 'svelte/store';
import type { Preset } from '$lib/types/components/table/presets';

// k ukládání editovaných dat z tabulky + k disabled tabům, když je editedDataStore.length > 0
export const editedTableDataStore: Writable<never[]> = writable([]);

// defaultní definice sloupečků, která se vytvoří z /lib/data/ag-grid/col-def,
// důležité pro nastavení defaultní šablony přes ribbon
export const defaultColDef = writable([])

// boolean pro nastavení defaultní šablony
export const setColDefToDefault: Writable<boolean> = writable(false)

// store pro uchovávání filtrů v tabulce, důležité pro ukládání nové sady filtrů
export const filtersStore: Writable<ColumnFilters> = writable({});

// po vybrání sady filtrů z ribbonu se nastaví do této proměnné, po jejíž změně se načtou filtry do tabulky
export const selectedFilterStore: Writable<ColumnFilters> = writable({});

// store pro uchování rozložení sloupečků v tabulce, pro ukládání nové šablony
export const presetStore: Writable<Preset[]> = writable([]);

// po vybrání šablony z ribbonu se nastaví do této proměnné, po jejíž změně se načte do tabulky
export const selectedPresetStore: Writable<Preset> = writable();

// boolean store pro zobrazení fulltextového vyhledávání
export const showFulltextSearchStore: Writable<boolean> = writable(false);

// store pro uhování hodnoty fulltextového vyhledávání, po změně se po debounce provolá rq na BE
export const fulltextFilterValueStore: Writable<string> = writable();

// id vybraného řádku v tabulce
export const selectedRowsStore: Writable<Record<string, never>[]> = writable([]);

export const activeSelectedRowIndexStore: Writable<number> = writable(0);
