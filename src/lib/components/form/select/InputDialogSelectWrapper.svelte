<script lang="ts">
	import { Button } from "$lib/components/ui/button/index.js";
	import { Input } from "$lib/components/ui/input";
	import { tick } from "svelte";
	import Check from "lucide-svelte/icons/check";
	import * as Command from "$lib/components/ui/command/index.js";
	import * as Popover from "$lib/components/ui/popover/index.js";
	import StringOperatorSelectWrapper from "$lib/components/form/select/StringOperatorSelectWrapper.svelte";
	import NumberOperatorSelectWrapper from "$lib/components/form/select/NumberOperatorSelectWrapper.svelte";
	import MoveRight from "lucide-svelte/icons/move-right";
	import type {ColumnFilter, InputDialogSelectOption} from "$lib/types/components/dialog/inputDialog";


	interface Props {
		selectOptions: InputDialogSelectOption[],
		columnFilter: ColumnFilter,
	}

	let {
		selectOptions,
		columnFilter = $bindable()
	}: Props = $props();

	let open = $state(false);
	let triggerRef = $state<HTMLButtonElement>(null!);


	function closeAndFocusTrigger() {
		open = false;
		tick().then(() => {
			triggerRef.focus();
		});
	}

	let inputValue = $state("");
	let activeLabel: string = $state("");

	$effect(() => {
		if (columnFilter.columnName) {
			activeLabel = getLabel();
		}
	})


	$inspect(activeLabel);


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
		columnFilter.columnName = option.field;
		columnFilter.type = option.type;
	}
</script>



<Popover.Root bind:open>
	<Popover.Trigger bind:ref={triggerRef}>
		{#snippet child({ props })}
			<Button
				variant="outline"
				class="w-[200px] justify-between font-normal hover:bg-muted/50"
				{...props}
				role="combobox"
				aria-expanded={open}
			>
				{#if activeLabel}
					{activeLabel}
				{:else}
					<p class="text-slate-300">Vyberte sloupec</p>
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
								closeAndFocusTrigger();
							}}
							value={ option.label()}
						>
							{ option.label() }
						</Command.Item>
					{/each}
				</Command.Group>
			</Command.List>
		</Command.Root>
	</Popover.Content>
</Popover.Root>
