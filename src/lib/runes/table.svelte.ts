import type {AgGridTables} from "$lib/types/components/table/table";
import {SessionStore, sessionStore} from "$lib/utils/browser-storage/sessionStorage.svelte";

export interface TableSettings {
	headerHeight: number;
	headerFontSize: number;
	spacing: number;
	fontSize: number;
	iconSize: number;
}

// INITIALIZE IN +PAGE.SVELTE, NOT IN AG GRID WRAPPER
export const agGridTables: SessionStore<AgGridTables> = sessionStore("agGridTables", {});

export const pageKeys: SessionStore<{ value: string[], index: number }> = sessionStore("pageKeys", { value: [], index: 0 })

export const sideTableRowData: { value: any[] } = $state({ value: [] })

export const tableViewSettings: SessionStore<TableSettings> = sessionStore("tableView", {
	headerHeight: 28,
	headerFontSize: 11,
	spacing: 5,
	fontSize: 14,
	iconSize: 14,
});
