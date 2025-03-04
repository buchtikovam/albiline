import type {ServerSideTables} from "$lib/types/components/table/table";


// INITIALIZE IN +PAGE.SVELTE, NOT IN AG GRID WRAPPER
export const serverSideTables: ServerSideTables = $state({});

export const currentPageKey: { value: string } = $state({ value: ""})
