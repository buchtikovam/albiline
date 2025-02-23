<script lang="ts">
	import { Button } from "$lib/components/ui/button";
	import type { ColumnFilter, InputDialogSelectOption } from "$lib/types/components/dialog/inputDialog";
	import * as Popover from "$lib/components/ui/popover";
	import * as Command from "$lib/components/ui/command";
	import ChevronDown from "lucide-svelte/icons/chevron-down";
	import {isMobile} from "$lib/runes/page.svelte";


	interface Props {
		columnFilter: ColumnFilter;
		selectOptions: InputDialogSelectOption[]
	}

	let {
		columnFilter = $bindable(),
		selectOptions
	}: Props = $props();


	let open = $state(false);
	let activeLabel: string = $state("");


	$effect(() => {
		if (columnFilter.columnName) {
			activeLabel = getLabel();
		}
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
		open = false;
		columnFilter.columnName = option.field;

		// if type of column filter has changed, clear all conditions
		if (columnFilter.type !== option.type) {
			columnFilter.filterModel.conditions.forEach(condition => {
				condition.type = null;
				condition.value = null;
			})
		}

		columnFilter.type = option.type;
	}
</script>



<Popover.Root bind:open>
	{#if !isMobile.value}

		<Popover.Trigger class="hidden sm:block w-full font-normal hover:bg-muted/70">
			{#snippet child({ props })}
				<Button
					variant="outline"
					class="w-full items-start font-light hover:bg-muted/50"
					{...props}
					role="combobox"
					aria-expanded={open}
				>
					{#if activeLabel}
						<p class="w-full text-left">
							{activeLabel}
						</p>
					{:else}
						<p class="text-slate-300 w-full text-left">
							Vybrat sloupec
						</p>
					{/if}
				</Button>
			{/snippet}
		</Popover.Trigger>
	{:else}
		<Popover.Trigger class="block sm:hidden w-full font-normal hover:bg-muted/70">
			{#snippet child({ props })}
				<button
					{...props}
					class="w-fit text-xs flex items-center gap-1"
				>
					{activeLabel || "Sloupec"}
					<ChevronDown class="size-3"/>
				</button>
			{/snippet}
		</Popover.Trigger>
	{/if}

	<Popover.Content
		side="bottom"
		class="p-0 max-h-60 h-60 w-[200px]"
	>
		<Command.Root>
			<Command.Input placeholder="..." />

			<Command.List class="max-h-80">
				<Command.Empty class="">
					<p>
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
