<script lang="ts">
	import { Button } from "$lib/components/ui/button/index.js";
	import ChevronsUpDown from "lucide-svelte/icons/chevrons-up-down";
	import Check from "lucide-svelte/icons/check";
	import { tick } from "svelte";
	import * as Command from "$lib/components/ui/command/index.js";
	import * as Popover from "$lib/components/ui/popover/index.js";
	import { cn } from "$lib/utils.js";
	import {Input} from "$lib/components/ui/input";
	import {type Icon as IconType} from 'lucide-svelte';
	import Scan from "lucide-svelte/icons/scan";
	import ArrowRightFromLine from "lucide-svelte/icons/arrow-right-from-line";
	import ArrowLeftFromLine from "lucide-svelte/icons/arrow-left-from-line";
	import type {
		ColumnFilterModelCondition,
		ColumnFilterModelConditionTypesString, InputDialogSelectOption
	} from "$lib/types/components/dialog/inputDialog";

	interface Props {
		disabled: boolean;
		condition: ColumnFilterModelCondition,
	}

	let {
		disabled = true,
		condition = $bindable(),
	}: Props = $props();


	let open = $state(false);

	let activeOperator: OperatorOption = $state({
		field: null,
		label: null,
	})

	let triggerRef = $state<HTMLButtonElement>(null!);

	type OperatorOption = {
		field: ColumnFilterModelConditionTypesString|null,
		label: string|null,
		icon?: IconType
	}

	const options: OperatorOption[] = [
		{
			field: "contains",
			label: "Obsahuje",
		},
		{
			field: "not-contains",
			label: "Neobsahuje",
		},
		{
			field: "equals",
			label: "Rovná se",
		},
		{
			field: "not-empty",
			label: "Nerovná se",
		},
		{
			field: "starts-with",
			label: "Začíná na",
		},
		{
			field: "ends-with",
			label: "Končí na",
		},
		{
			field: "empty",
			label: "Prázdný",
		},
		{
			field: "not-empty",
			label: "Není prázdný",
		},
	]

	function closeAndFocusTrigger() {
		open = false;
		tick().then(() => {
			triggerRef.focus();
		});
	}

	$effect(() => {
		if (condition.type) {
			options.forEach((option) => {
				if (option.field === condition.type) {
					activeOperator = option;
				}
			})
		}
	})

	function updateItem(option: OperatorOption) {
		condition.type = option.field;
	}
</script>



<Popover.Root bind:open>
	<Popover.Trigger bind:ref={triggerRef}>
		{#snippet child({ props })}
			<Button
				variant="outline"
				class="min-w-[80px] font-normal hover:bg-muted/50 disabled:opacity-100 disabled:cursor-not-allowed"
				disabled={disabled}
				{...props}
				role="combobox"
				aria-expanded={open}
			>
				<!--{@const Icon = activeOperator.icon}-->
				{ activeOperator.label }

				{#if activeOperator.label === null}
					<p class="text-slate-300">Akce</p>
				{/if}
<!--					<Icon/>-->
			</Button>
		{/snippet}
	</Popover.Trigger>


	<Popover.Content side="bottom" class="p-0 w-[120px] max-h-60">
		<Command.Root>
			<Command.Input placeholder="..." />

			<Command.List>
				<Command.Empty>
					Zde nic není.
				</Command.Empty>


				<Command.Group>
					{#each options as option}
						<Command.Item
							value={option.label}
							onSelect={() => {
								updateItem(option);
								closeAndFocusTrigger();
							}}
						>
							<!--{@const Icon = option.icon}-->

<!--								<Icon />-->

							{option.label}
						</Command.Item>
					{/each}
				</Command.Group>
			</Command.List>
		</Command.Root>
	</Popover.Content>
</Popover.Root>

