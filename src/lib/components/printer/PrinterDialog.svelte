<script lang="ts">
	import DialogWrapper from "$lib/components/dialog/DialogWrapper.svelte";
	import * as Dialog from '$lib/components/ui/dialog';
	import {onMount} from "svelte";
	import {getAvailablePrinters, initializePrinterService} from "$lib/api/documents/printerService.svelte";
	import {A4} from "$lib/constants/pdf/pageSizes";
	import PrinterSettingsContainer from "$lib/components/printer/PrinterSettingsContainer.svelte";

	interface Props {
	    isOpen: boolean;
	}

	let {
	    isOpen = $bindable(),
	}: Props = $props();


	let printers: string[] = $state([]);
	let isInitialized = $state(false);


	onMount(async () => {
		isInitialized = await initializePrinterService();
		if (isInitialized) {
			printers = await getAvailablePrinters();
		}
	});
</script>


<DialogWrapper
	bind:isOpen={isOpen}
	{header}
	{content}
	size="lg"
	customCss="!h-[80%] !max-h-[80%]"
	fixedHeight={true}
/>



{#snippet header()}
	<Dialog.Title>
		Tisk
	</Dialog.Title>
{/snippet}


{#snippet content()}
	<div class="w-full h-full flex gap-2">
		<div class="w-1/3 h-full flex flex-col gap-2">
			<div class="w-full bg-yellow-100">
				<p class="text-sm">tiskárna</p>

				<PrinterSettingsContainer>
					test
				</PrinterSettingsContainer>
			</div>

			<div class="h-20 w-full flex gap-2">
				<div class="w-2/3 bg-orange-100 h-full">

				</div>

				<div class="h-full w-1/3 bg-pink-100">

				</div>
			</div>

			<div class="bg-blue-100 flex-1">
				iframe select
			</div>
		</div>

		<div class="w-2/3 h-full bg-green-100 overflow-auto">
<!--			<iframe-->
<!--				src="/pdf/templates/A4/invoices/324051223"-->

<!--				class="w-full h-full overflow-auto border-none"-->
<!--				title="Invoice Preview"-->
<!--			></iframe>-->
		</div>
	</div>
{/snippet}
