<script lang="ts">
	import { newCustomerAddressFormDef } from '$lib/data/autoform-def/zakaznici/newCustomerAddressFormDef.js';
	import Plus from 'lucide-svelte/icons/plus';
	import NewCustomerAddressDialog from '$lib/components/dialog/page/zakaznici/dialog-create-new/NewCustomerAddressDialog.svelte';
	import AgGridCSDialogWrapper from '$lib/components/ag-grid/AgGridCSDialogWrapper.svelte';
	import * as Dialog from "$lib/components/ui/dialog";

	interface Props {
		colDef: any;
		rowData: any[];
		open: boolean;
	}

	let { colDef, rowData , open = $bindable() }: Props = $props();

	let openNewAddressDialog: boolean = $state(false);

	function newCustomerAddressDialog() {
		open = false;
		openNewAddressDialog = true;
	}
</script>



<Dialog.Root
	bind:open
>
	<Dialog.Content
		class="h-[70%] w-[90%] md:w-[700px] lg:w-[900px] xl:w-[1200px] max-w-[1200px] flex flex-col"
	>
		<Dialog.Header>
			<Dialog.Title class="flex items-center gap-2">
				Výběr prodejny

				<button
					onclick={newCustomerAddressDialog}
				>
					<Plus
						strokeWidth={2.5}
						class="text-albi-500 size-5 hover:text-albi-700"
					/>
				</button>
			</Dialog.Title>
		</Dialog.Header>

		<AgGridCSDialogWrapper
			rowData={rowData}
			colDef={colDef}
		/>
	</Dialog.Content>
</Dialog.Root>


<NewCustomerAddressDialog
	bind:dialogOpen={openNewAddressDialog}
	label="Nová prodejna"
	formDef={newCustomerAddressFormDef}
/>

