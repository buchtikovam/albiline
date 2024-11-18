<script lang="ts">
	import * as Dialog from "$lib/components/ui/dialog";
	import AgGridCSDialogWrapper from '$lib/components/ag-grid/AgGridCSDialogWrapper.svelte';
	import { get, writable, type Writable } from 'svelte/store';

	export let colDef;
	export let rowData: Writable<any[]> = writable([]);
	export let open: boolean = false;
	export let translationRoute: string;

	rowData.subscribe((data) => {
		console.log(data);
	})
</script>

<Dialog.Root bind:open closeOnOutsideClick={false}>
	<Dialog.Content class="h-[94%] lg:h-[80%] lg:!w-[70%] max-w-[1400px] flex flex-col">
		<Dialog.Header class="">
			<Dialog.Title class="h-6 mb-2">
				Výběr prodejny
			</Dialog.Title>
		</Dialog.Header>

		<AgGridCSDialogWrapper
			bind:rowData={rowData}
			colDef={colDef}
		/>
	</Dialog.Content>
</Dialog.Root>
