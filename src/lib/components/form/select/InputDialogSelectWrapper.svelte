<script lang="ts">
	import { Button } from "$lib/components/ui/button/index.js";
	import { Input } from "$lib/components/ui/input";
	import { tick } from "svelte";
	import Check from "lucide-svelte/icons/check";
	import * as Command from "$lib/components/ui/command/index.js";
	import * as Popover from "$lib/components/ui/popover/index.js";
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
	import StringOperatorSelectWrapper from "$lib/components/form/select/StringOperatorSelectWrapper.svelte";
	import NumberOperatorSelectWrapper from "$lib/components/form/select/NumberOperatorSelectWrapper.svelte";
	import MoveRight from "lucide-svelte/icons/move-right";
	import type {ColumnFilter, InputDialogSelectOption} from "$lib/types/components/dialog/inputDialog";
	import ChevronDown from "lucide-svelte/icons/chevron-down";
	import Trash2 from "lucide-svelte/icons/trash-2";


	interface Props {
		selectOptions: InputDialogSelectOption[],
		columnFilter: ColumnFilter,
	}

	let {
		selectOptions,
		columnFilter = $bindable()
	}: Props = $props();

	let open = $state(false);




	let inputValue = $state("");
	let activeLabel: string = $state("");


	$effect(() => {
		// if (columnFilter.columnName) {
		// 	activeLabel = getLabel();
		// }
	})

	function getLabel() {
		let label = "...";

		selectOptions.forEach(option => {
			if (option.field === columnFilter.columnName) {
				label = option.label();
			}
		})

		return label;
	}


	function updateItem(option: InputDialogSelectOption) {
		// columnFilter.columnName = option.field;
		// columnFilter.type = option.type;
	}

	function removeCondition() {
		console.log("REMOVE")
	}
</script>


{#each columnFilter.filterModel.conditions as condition}
	<div class="w-full flex gap-1 mt-2">
		<Popover.Root bind:open>
			<Popover.Trigger class="w-full">
				{#snippet child({ props })}
					<Button
						variant="outline"
						class="w-full justify-between font-normal hover:bg-muted/50"
						{...props}
						role="combobox"
						aria-expanded={open}
					>
						{#if activeLabel}
							{activeLabel}
						{:else}
							<p class="text-slate-300">
								Vybrat sloupec
							</p>
						{/if}
					</Button>
				{/snippet}
			</Popover.Trigger>


			<Popover.Content side="bottom"  class="p-0 max-h-60 w-[200px]">
				<Command.Root>
					<Command.Input placeholder="..." />

					<Command.List class="max-h-80">
						<Command.Empty class="">
							<p class="">
								Takový sloupec nemáme.
							</p>

						</Command.Empty>


						<Command.Group>
							{#each selectOptions as option}

								<Command.Item
									onSelect={() => {
										updateItem(option);
									}}
									value={ option.label() }
								>
									{ option.label() }
								</Command.Item>
							{/each}
						</Command.Group>
					</Command.List>
				</Command.Root>
			</Popover.Content>
		</Popover.Root>


		{#if columnFilter.type === "text"}
			<!--<StringOperatorSelectWrapper
				disabled={inputDialog.columnFilters[i].columnName === null}
				bind:condition={inputDialog.columnFilters[i].filterModel.conditions[index]}
			/>

			<ChevronRight class="hidden sm:block min-w-3 max-w-3 text-albi-500 my-auto"/>

			<Input
				disabled={inputDialog.columnFilters[i].columnName === null}
				bind:value={inputDialog.columnFilters[i].filterModel.conditions[index].value}
				type="text"
				class="border border-border w-full"
			/>-->
		{/if}

		{#if columnFilter.type === "number"}
			.
		{/if}

		{#if columnFilter.type === "boolean"}
			.
		{/if}

		{#if columnFilter.type === "date"}
			.
		{/if}

		{#if columnFilter.type === "enum"}
			.
		{/if}


		<DropdownMenu.Root>
			<DropdownMenu.Trigger
				class="min-w-10 ml-1 flex items-center justify-center border rounded bg-white"
			>
				<ChevronDown
					strokeWidth={3}
					class="w-4 text-albi-500"
				/>
			</DropdownMenu.Trigger>

			<DropdownMenu.Content>
				<DropdownMenu.Group>
					<DropdownMenu.Item
						onclick={() => removeCondition()}
					>
						<Trash2 class="text-red-500 size-4 hover:text-red-700"/>
						Smazat
					</DropdownMenu.Item>
				</DropdownMenu.Group>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	</div>
{/each}


