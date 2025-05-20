<script lang="ts">
	import DialogWrapper from "$lib/components/dialog/DialogWrapper.svelte";
	import * as Dialog from '$lib/components/ui/dialog';
	import {onMount, tick} from "svelte";
	import {getAvailablePrinters, initializePrinterService} from "$lib/api/documents/printerService.svelte";
	import PrinterSettingsContainer from "$lib/components/printer/PrinterSettingsContainer.svelte";
	import CheckIcon from "lucide-svelte/icons/check";
	import ChevronsUpDownIcon from "lucide-svelte/icons/chevrons-up-down";
	import * as Command from "$lib/components/ui/command/index.js";
	import * as Popover from "$lib/components/ui/popover/index.js";
	import { Button } from "$lib/components/ui/button/index.js";
	import { cn } from "$lib/utils.js";
	import * as RadioGroup from "$lib/components/ui/radio-group/index.js";
	import { Label } from "$lib/components/ui/label/index.js";
	import {Input} from "$lib/components/ui/input";
	import {Checkbox} from "$lib/components/ui/checkbox";
	import AgGridCSSecondaryWrapper from "$lib/components/ag-grid/clientside-secondary/AgGridCSSecondaryWrapper.svelte";
	import {printerDialogAgGridDef} from "$lib/definitions/components/printer/ag-grid/PrinterDialogAgGridDef";

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
			console.log(printers)
		}
	});


	let open = $state(false);
	let value = $state("");
	let triggerRef = $state<HTMLButtonElement>(null!);

	const selectedValue = $derived(
		printers.find((f) => f === value)
	);

	// We want to refocus the trigger button when the user selects
	// an item from the list so users can continue navigating the
	// rest of the form with the keyboard.
	function closeAndFocusTrigger() {
		open = false;
		tick().then(() => {
			triggerRef.focus();
		});
	}
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
		<div class="w-full md:w-1/3 h-full overflow-auto flex flex-col gap-1">
			<div class="w-full ">
				<p class="text-sm ">Tiskárna</p>

				<PrinterSettingsContainer>
					<Popover.Root bind:open>
						<Popover.Trigger bind:ref={triggerRef}>
							{#snippet child({ props })}
								<Button
									variant="outline"
									class="justify-between h-8"
									{...props}
									role="combobox"
									aria-expanded={open}
								>
									{selectedValue || "Vyber tiskárnu..."}
									<ChevronsUpDownIcon class="opacity-50" />
								</Button>
							{/snippet}
						</Popover.Trigger>
						<Popover.Content class="p-0">
							<Command.Root>
								<Command.Input placeholder="Hledat..." />
								<Command.List>
									<Command.Empty>No framework found.</Command.Empty>
									<Command.Group value="printers">
										{#each printers as printer (printer)}
											<Command.Item
												value={printer}
												onSelect={() => {
													value = printer;
												closeAndFocusTrigger();
											  }}
											>
												<CheckIcon
													class={cn(value !== printer && "text-transparent")}
												/>
												{printer}
											</Command.Item>
										{/each}
									</Command.Group>
								</Command.List>
							</Command.Root>
						</Popover.Content>
					</Popover.Root>
				</PrinterSettingsContainer>
			</div>

			<div class="w-full flex flex-col xl:flex-row gap-2">
				<div class="w-full xl:w-2/3 xl:h-full">
					<div>
						<p class="text-sm ">Tisknout</p>

						<PrinterSettingsContainer>
							<RadioGroup.Root value="comfortable" class="gap-2.5">
								<div class="flex items-center space-x-2">
									<RadioGroup.Item value="default" id="r1" />
									<Label for="r1">Aktuální záznam</Label>
								</div>
								<div class="flex items-center space-x-2">
									<RadioGroup.Item value="comfortable" id="r2" />
									<Label for="r2">Vybrané záznamy</Label>
								</div>
								<div class="flex items-center space-x-2">
									<RadioGroup.Item value="compact" id="r3" />
									<Label for="r3">Všechny záznamy</Label>
								</div>
							</RadioGroup.Root>
						</PrinterSettingsContainer>
					</div>


					<div class="mt-1">
						<p class="text-sm ">Rozsah stránek</p>

						<PrinterSettingsContainer>
							<RadioGroup.Root value="all">
								<div class="flex items-center space-x-2">
									<RadioGroup.Item value="all" id="r1" />
									<Label for="r1">Všechny</Label>
								</div>
								<div class="flex items-center space-x-2 ">
									<RadioGroup.Item value="pages" id="r2" />
									<Label for="r2">Stránky</Label>
									<Input
										class="min-w-10 flex-1 h-6 p-1"
										placeholder="1, 3, 5-9, ..."
									/>
								</div>
							</RadioGroup.Root>
						</PrinterSettingsContainer>
					</div>

					<div class="mt-1">
						<p class="text-sm ">Hlavička a patička</p>

						<PrinterSettingsContainer>
							<div class="flex items-center gap-1">
								<Checkbox class="size-4"/>
								<Label for="r1">Vlastní hlavička</Label>
							</div>

							<div class="flex items-center gap-1">
								<Checkbox class="size-4"/>
								<Label for="r1">Vlastní patička</Label>
							</div>
						</PrinterSettingsContainer>
					</div>
				</div>

				<div class="w-full xl:w-1/3">
					<div>
						<p class="text-sm ">Kopie</p>

						<PrinterSettingsContainer>

							<div class="flex gap-1 items-center justify-between">
								<Label for="r2">Počet:</Label>
								<Input
									type="number"
									defaultValue="1"
									class="min-w-10 w-10 h-6 p-1"
								/>
							</div>

							<div class="flex items-center gap-1">
								<Checkbox
									disabled
									class="size-4"
									checked={true}
								/>
								<Label>Kompletovat</Label>
							</div>

						</PrinterSettingsContainer>
					</div>

					<div class="mt-1">
						<p class="text-sm ">Orientace</p>

						<PrinterSettingsContainer>
							<RadioGroup.Root value="all" class="gap-2.5">
								<div class="flex items-center space-x-2 ">
									<RadioGroup.Item value="all" id="r1" />

									<Label for="r1">
										Implicitní
									</Label>
								</div>

								<div class="flex items-center space-x-2 ">
									<RadioGroup.Item value="pages" id="r2" />

									<Label for="r2">
										Na výšku
									</Label>
								</div>

								<div class="flex items-center space-x-2 ">
									<RadioGroup.Item value="pages" id="r2" />

									<Label for="r2">
										Na šířku
									</Label>
								</div>
							</RadioGroup.Root>

						</PrinterSettingsContainer>
					</div>

					<div class="mt-1">
						<p class="text-sm ">Měřítko</p>

						<PrinterSettingsContainer>
							<div class="flex items-center justify-between space-x-2">
								<Label for="r1">Dat:</Label>
								<Input
									type="number"
									defaultValue='100'
									min="1"
									max="999"
									class="min-w-10 w-10 h-6 p-1"
								/>
							</div>
							<div class="flex items-center justify-between space-x-2 ">
								<Label for="r2">Náhledu:</Label>
								<Input
									type="number"
									defaultValue='100'
									min={1}
									max={999}
									class="min-w-10 w-10 h-6 p-1"
								/>
							</div>
						</PrinterSettingsContainer>
					</div>
				</div>
			</div>

			<div class="flex-1 mt-1 pb-5">
				<p class="text-sm ">Sestavy</p>

				<PrinterSettingsContainer
					fullHeight={true}
				>
					<AgGridCSSecondaryWrapper
						rowData={[]}
						headerTranslations={{}}
						gridOptionsCustom={printerDialogAgGridDef}
						fullHeight={true}
					/>

				</PrinterSettingsContainer>
			</div>
		</div>

		<div class="w-2/3 hidden md:block h-full bg-green-100 ">
<!--			<iframe-->
<!--				src="/pdf/templates/A4/invoices/324051223"-->
<!--				class="w-full h-full overflow-auto border-none"-->
<!--				title="Invoice Preview"-->
<!--			></iframe>-->
		</div>
	</div>
{/snippet}
