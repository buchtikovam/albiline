<script lang="ts">
	import { createGrid, type GridApi, type GridOptions } from 'ag-grid-community'
	import { onMount } from 'svelte'
	import { showFulltextSearchStore } from '$lib/stores/tableStore';
	import type { TableType } from '$lib/types/table/table';
	import 'ag-grid-community/styles/ag-grid.css'
	import 'ag-grid-community/styles/ag-theme-material.css'

	showFulltextSearchStore.set(false)

	export let data: TableType;

	console.log(data.items);
	

	let grid: GridApi<unknown>;

	const gridOptions: GridOptions = {
		defaultColDef: {
			sortable: true,
			filter: true, 
			flex: 1,
			resizable: true,
			editable: true
		},
		columnDefs : [
			{ field: "productCode", headerName: "KSP" },
			{ field: "productName", headerName: "Název" },
			{ field: "salesLaunchDate", headerName: "Datum uvedení" },
			{ field: "isActive", headerName: "Aktivní", cellDataType: "boolean" },
			{ field: "stockPieces", headerName: "Skladem" },
			{ field: "rabatOZ", headerName: "Rabat OZ" },
			{ field: "cisloSer", headerName: "Číslo Série" },
			// { field: "idPodklad", headerName: "ID Podklad" },
			// { field: "idZamestnanec", headerName: "ID Zaměstnanec" },
			// { field: "sezona", headerName: "Sezóna" },
			// { field: "preference", headerName: "Preference" },
			// { field: "preferenceNovinek", headerName: "Preference Novinek" },
			// { field: "prilez", headerName: "Příležitost" },
			// { field: "caption", headerName: "Titulek" },
			// { field: "styl", headerName: "Styl" },
			// { field: "podstyl", headerName: "Podstyl" },
			// { field: "idKoncepce", headerName: "ID Koncepce" },
			// { field: "odKoho", headerName: "Od Koho" },
			// { field: "rozlisovac", headerName: "Rozlišovač" },
			// { field: "idNosic", headerName: "ID Nosič" },
			// { field: "idNosicPredtisk", headerName: "ID Nosič Předtisk" },
			// { field: "nazevVyrobek", headerName: "Název Výrobek" },
			// { field: "note", headerName: "Poznámka" },
			// { field: "rozmeryTV", headerName: "Rozměry TV" },
			// { field: "rozmeryTS", headerName: "Rozměry TS" },
			// { field: "dattrh", headerName: "Datum Trhu" },
			// { field: "retailReleaseDateCZ", headerName: "Datum Uvedení CZ" },
			// { field: "textStrany", headerName: "Text Strany" },
			// { field: "charakteristika", headerName: "Charakteristika" },
			// { field: "barevnost", headerName: "Barevnost" },
			// { field: "test", headerName: "Test" },
			// { field: "rok", headerName: "Rok" },
			// { field: "slovensko", headerName: "Slovensko" },
			// { field: "jz", headerName: "JZ" },
			// { field: "jz1", headerName: "JZ1" },
			// { field: "jz2", headerName: "JZ2" },
			// { field: "jz3", headerName: "JZ3" },
			// { field: "jz4", headerName: "JZ4" },
			// { field: "jz5", headerName: "JZ5" },
			// { field: "jz6", headerName: "JZ6" },
			// { field: "jz7", headerName: "JZ7" },
			// { field: "jz8", headerName: "JZ8" },
			// { field: "jz9", headerName: "JZ9" },
			// { field: "jz10", headerName: "JZ10" },
			// { field: "jz11", headerName: "JZ11" },
			// { field: "jz12", headerName: "JZ12" },
			// { field: "jz13", headerName: "JZ13" },
			// { field: "jz14", headerName: "JZ14" },
			// { field: "jz15", headerName: "JZ15" },
			// { field: "jz16", headerName: "JZ16" },
			// { field: "jz17", headerName: "JZ17" },
			// { field: "jz18", headerName: "JZ18" },
			// { field: "jz19", headerName: "JZ19" },
			// { field: "jz20", headerName: "JZ20" },
			// { field: "k0", headerName: "K0" },
			// { field: "k1", headerName: "K1" },
			// { field: "nkakt", headerName: "NKAKT" },
			// { field: "nakladUvodni", headerName: "Náklad Úvodní" },
			// { field: "nakladReprint", headerName: "Náklad Reprint" }
		],
		rowData: data.items
	}

	onMount(() => {
		const gridEl = document.getElementById("mainGrid")
		if (!gridEl) {
			throw new Error("Grid element not found.")
		}
		grid = createGrid(gridEl, gridOptions)
	})
</script>

<!-- <div class="bg-red-100 h-full"> -->
	<div id="mainGrid" class="ag-theme-material h-full"></div>
<!-- </div> -->