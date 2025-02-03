<script lang="ts">
	import {Button} from '$lib/components/ui/button';
	import {Input} from "$lib/components/ui/input";
	import InputDialogSelectWrapper from "$lib/components/form/select/InputDialogSelectWrapper.svelte";
	import InputWrapperText from "$lib/components/form/inputs/InputWrapperText.svelte";
	import {Separator} from "$lib/components/ui/separator";
	import Plus from "lucide-svelte/icons/plus";
	import X from "lucide-svelte/icons/x";
	import * as Dialog from "$lib/components/ui/dialog/index.js";
	import type {
		ColumnFilter,
		InputDialogSelectOption,
		InputDialogType
	} from "$lib/types/components/dialog/inputDialog";
	import StringOperatorSelectWrapper from "$lib/components/form/select/StringOperatorSelectWrapper.svelte";
	import Trash2 from "lucide-svelte/icons/trash-2";
	import ChevronDown from "lucide-svelte/icons/chevron-down";
	import ChevronRight from "lucide-svelte/icons/chevron-right";
	import MoveRight from "lucide-svelte/icons/move-right";

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
	let columnFilters = $state(inputDialog.columnFilters);
	// $effect(() => {
	// 	columnFilters = inputDialog.columnFilters;
	// })
	

	// $inspect(inputDialog.fulltext)

	function addInput() {
		if (columnFilters) {
			let lastIndex = columnFilters[columnFilters.length - 1].id;

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

	// $effect(() => {
	// 	if (columnFilters) {
	// 		columnFilters.forEach((columnFilter) => {
	// 			if (columnFilter.filterModel.conditions.length === 0) {
	// 				columnFilters.splice(columnFilter.id, 1);
	// 			}
	// 		})
	// 	}
	// })

	$inspect(columnFilters);
</script>


<Dialog.Root bind:open={open}>
	<Dialog.Content class="w-[90%] md:w-[600px] max-w-[800px] max-h-[70%] overflow-auto">
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
					bind:value={inputDialog.fulltext}
					placeholder="Id, Název, Město, ..."
					class="border-border mb-4"
				/>
			{/if}


			{#if columnFilters !== undefined}
				<p
					class="text-albi-500 text-sm font-bold pb-2"
				>
					Hledat podle sloupce
				</p>

				{#each columnFilters as columnFilter, i (columnFilter.id)}
					<div
						class={
								columnFilter.filterModel.conditions.length > 1
									? "rounded-lg border bg-slate-50 p-2 mt-2 flex flex-col gap-2"
									: "bg-white p-0"
							}
					>
						{#if columnFilter.filterModel.conditions.length > 1}
							<p class="text-xs font-bold text-slate-400">
								{columnFilter.filterModel.operator}
							</p>
						{/if}

						<InputDialogSelectWrapper
							selectOptions={selectOptions}
							bind:columnFilter={columnFilters[columnFilter.id]}
						/>
					</div>
				{/each}
			{/if}


			<Dialog.Footer class="w-full mt-4">
				<div class="w-full flex justify-between">
					<Button
						onclick={() => open = false}
					>
						Načíst
					</Button>

					{#if columnFilters !== undefined}
						<Button
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
