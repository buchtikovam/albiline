<script lang="ts">
	import {Button} from '$lib/components/ui/button';
	import {Input} from "$lib/components/ui/input";
	import Plus from "lucide-svelte/icons/plus";
	import * as Popover from "$lib/components/ui/popover/index.js";
	import * as Dialog from "$lib/components/ui/dialog/index.js";
	import type {
		InputDialogSelectOption,
		InputDialogType
	} from "$lib/types/components/dialog/inputDialog";
	import InputDialogTableColumnRowWrapper from "$lib/components/dialog/input/InputDialogTableColumnRowWrapper.svelte";
	import WarningDialog from "$lib/components/dialog/warning/WarningDialog.svelte";


	interface Props {
		open: boolean,
		defaultInputDialog: InputDialogType,
		selectOptions: InputDialogSelectOption[]
	}

	let {
		open = $bindable(),
		defaultInputDialog,
		selectOptions
	}: Props = $props();


	let inputDialog: InputDialogType = $state(defaultInputDialog);
	let fulltext: string|null|undefined = $state(inputDialog.fulltext);
	let columnFilters = $state(inputDialog.columnFilters);
	let openWarningDialog = $state(false);
	let warningConsent = $state(false);

	function addInput() {
		if (columnFilters) {
			let lastIndex = 0;

			columnFilters.length > 0
				? lastIndex = columnFilters[columnFilters.length - 1].id
				: lastIndex = 0;

			columnFilters.push({
				id: lastIndex + 1,
				columnName: null,
				type: "text",
				filterModel: {
					operator: null,
					conditions: [{
						type: null,
						value: null
					}]
				}
			})
		}
	}

	$effect(() => {
		if (columnFilters) {
			console.log("effect if")

			// TODO: remove operator + input value if columnName changed
			// console.log(columnFilters)

			columnFilters.filter((columnFilter) => {
				if (columnFilter.filterModel.conditions.length > 0) {
					return columnFilter;
				}
			})

			// console.log(columnFilters.filter((columnFilter) => {
			// 	if (columnFilter.filterModel.conditions.length > 0) {
			// 		return columnFilter;
			// 	}
			// }))

			// console.log(columnFilters)
		}
	})

	$inspect(columnFilters);

	function parseInputDialog() {
		if (!fulltext || fulltext.length === 0) {
			openWarningDialog = true;
		}
	}

	$effect(() => {
		if (warningConsent === true) {
			openWarningDialog = false;
			setTimeout(() => {
				open = false;
			}, 200)
		}
	})
</script>


<Dialog.Root bind:open={open}>
	<Dialog.Content class="w-[90%] md:w-[640px] max-w-[640px] max-h-[70%] overflow-auto">
		<Dialog.Header class="">
			<Dialog.Title class="">
				Vstupní parametry
			</Dialog.Title>
		</Dialog.Header>

		<div>
			{#if inputDialog.fulltext !== undefined}
				<p
					class="mb-2 text-albi-500 text-sm font-bold"
				>
					Hledat všude
				</p>

				<Input
					type="text"
					bind:value={fulltext}
					placeholder="Id, Název, Město, ..."
					class="border-border mb-4"
				/>
			{/if}


			{#if columnFilters !== undefined}
				<p
					class="text-albi-500 text-sm font-bold "
				>
					Hledat podle sloupce
				</p>

				{#each columnFilters as columnFilter, i (columnFilter.id)}
					<div
						class={
							columnFilter.filterModel.conditions.length > 1
								? "rounded-lg border bg-slate-50 p-2 flex flex-col mt-2 "
								: "bg-white p-0"
						}
					>
						{#if columnFilter.filterModel.conditions.length > 1}
							<p class="text-xs font-bold text-slate-400">
								{columnFilter.filterModel.operator}
							</p>
						{/if}

						<InputDialogTableColumnRowWrapper
							selectOptions={selectOptions}
							bind:columnFilter={columnFilters[columnFilter.id]}
						/>
					</div>
				{/each}
			{/if}


			<Dialog.Footer class="w-full mt-4">
				<div class="w-full flex justify-between">
					<Button
						type="submit"
						onclick={() => parseInputDialog()}
					>
						Načíst
					</Button>

					{#if columnFilters !== undefined}
						<Button
							type="button"
							onclick={() => addInput()}
							class="size-10"
						>
							<Plus strokeWidth={3} class="text-white"/>
						</Button>
					{/if}
				</div>
			</Dialog.Footer>
		</div>
	</Dialog.Content>
</Dialog.Root>



<WarningDialog
	bind:open={openWarningDialog}
	message="Opravdu chceš pokračovat?"
	desription="Zobrazování velkých dat bez vstupních parametrů může ovlivnit dobu načítání, filtrování a řazení."
	buttonAllowLabel="Načíst"
	buttonDenyLabel="Zadat filtry"
	bind:consent={warningConsent}
/>
