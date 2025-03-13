import type {AgGridTables} from "$lib/types/components/table/table";
import {SessionStore, sessionStore} from "$lib/utils/browser-storage/sessionStorage.svelte";


// INITIALIZE IN +PAGE.SVELTE, NOT IN AG GRID WRAPPER
export const agGridTables: SessionStore<AgGridTables> = sessionStore("agGridTables", {});

export const currentPageKey: { value: string } = $state({ value: ""})

export const sideTableRowData: { value: any[] } = $state({ value: [] })
