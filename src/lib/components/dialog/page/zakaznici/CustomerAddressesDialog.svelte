<script lang="ts">
	import * as Dialog from "$lib/components/ui/dialog";
	import AgGridCSDialogWrapper from '$lib/components/ag-grid/AgGridCSDialogWrapper.svelte';
	import { writable, type Writable } from 'svelte/store';
	import Plus from 'lucide-svelte/icons/plus';
	import NewCustomerAddressDialog from '$lib/components/dialog/page/zakaznici/NewCustomerAddressDialog.svelte';
	import { newCustomerAddressFormDef } from '$lib/data/autoform-def/zakaznici/newCustomerAddressFormDef.js';

	export let colDef;
	export let rowData: Writable<any[]> = writable([]);
	export let open: boolean = false;

	let openNewContactDialog: boolean = false;
	// export let translationRoute: string;

	function newCustomerAddressDialog() {
		open = false;
		openNewContactDialog = true;
	}
</script>

<Dialog.Root bind:open closeOnOutsideClick={false}>
	<Dialog.Content
		class="h-[94%] lg:h-[80%] lg:!w-[70%] max-w-[1400px] flex flex-col"
	>
		<Dialog.Header>
			<Dialog.Title class="h-6 mb-2 flex items-center gap-2">
				Výběr prodejny

				<button
					on:click={newCustomerAddressDialog}
				>
					<Plus strokeWidth={2.5} class="text-albi-500 size-5 hover:text-albi-700"/>
				</button>
			</Dialog.Title>


		</Dialog.Header>

		<AgGridCSDialogWrapper
			bind:rowData={rowData}
			colDef={colDef}
		/>
	</Dialog.Content>
</Dialog.Root>


<NewCustomerAddressDialog
	bind:dialogOpen={openNewContactDialog}
	label="Nová prodejna"
	translationRoute=""
	formDef={newCustomerAddressFormDef}
/>

