<script lang="ts">
	import { Button } from "$lib/components/ui/button";
	import ChevronsUpDown from "lucide-svelte/icons/chevrons-up-down";
	import Check from "lucide-svelte/icons/check";
	import { tick } from "svelte";
	import * as Command from "$lib/components/ui/command";
	import * as Popover from "$lib/components/ui/popover";
	import { cn } from "$lib/utils.js";
	import * as Tooltip from "$lib/components/ui/tooltip/index.js";
	import {Input} from "$lib/components/ui/input";
	import {ArrowRightToLine, CircleOff, Equal, EqualNot, type Icon as IconType, SearchX} from 'lucide-svelte';
	import Scan from "lucide-svelte/icons/scan";
	import ArrowRightFromLine from "lucide-svelte/icons/arrow-right-from-line";
	import ArrowLeftFromLine from "lucide-svelte/icons/arrow-left-from-line";
	import type {
		ColumnFilterModelCondition,
		ColumnFilterModelConditionTypesString, InputDialogSelectOption
	} from "$lib/types/components/dialog/inputDialog";
	import Search from "lucide-svelte/icons/search";

	interface Props {
		disabled: boolean;
		operator: ColumnFilterModelConditionTypesString|null,
	}

	let {
		disabled = true,
		operator = $bindable(),
	}: Props = $props();


	let open = $state(false);

	let triggerRef = $state<HTMLButtonElement>(null!);

	type OperatorOption = {
		field: ColumnFilterModelConditionTypesString|null,
		label: string|null,
		icon: typeof IconType
	}

	const options: OperatorOption[] = [
		{
			field: "contains",
			label: "Obsahuje", // search
			icon: Search,
		},
		{
			field: "not-contains",
			label: "Neobsahuje", // search-x
			icon: SearchX,
		},
		{
			field: "equals",
			label: "Rovná se", // equal
			icon: Equal,
		},
		{
			field: "not-equals",
			label: "Nerovná se", // equal-not
			icon: EqualNot,
		},
		{
			field: "starts-with",
			label: "Začíná na", // arrow-right-from-line
			icon: ArrowRightFromLine,
		},
		{
			field: "ends-with",
			label: "Končí na", // arrow-right-to-line
			icon: ArrowRightToLine,
		},
	]


	function closeAndFocusTrigger() {
		open = false;
		tick().then(() => {
			triggerRef.focus();
		});
	}


	let activeItem: OperatorOption|null = $state(null);


	$effect(() => {
		activeItem = getItem(operator);
	})


	function getItem(operator: string|null) {
		if (!operator) {
			return null;
		}

		let item = null;

		options.forEach(option => {
			if (option.field === operator) {
				item = option;
			}
		})

		return item;
	}


	function updateItem(option: OperatorOption) {
		operator = option.field;
	}
</script>



<Popover.Root bind:open>
	<Popover.Trigger bind:ref={triggerRef} class="font-normal hover:bg-muted/70 min-w-[40px] p-0">
		{#snippet child({ props })}
			<Button
				variant="outline"
				class="min-w-[40px] font-normal hover:bg-muted/50 p-0"
				{...props}
				role="combobox"
				aria-expanded={open}
			>
				{#if activeItem === null}
					<p class="text-slate-300">
						...
					</p>
				{:else}
					{@const Icon = activeItem?.icon}

					<Tooltip.Root>
						<Tooltip.Trigger >
							<Icon class="!size-4"/>
						</Tooltip.Trigger>
						<Tooltip.Content>
							<p>{activeItem?.label}</p>
						</Tooltip.Content>
					</Tooltip.Root>
				{/if}
			</Button>
		{/snippet}
	</Popover.Trigger>


	<Popover.Content side="bottom" class="p-0 w-[180px] max-h-60 h-60">
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
							{@const Icon = option.icon}

							<Icon />

							{option.label}
						</Command.Item>
					{/each}
				</Command.Group>
			</Command.List>
		</Command.Root>
	</Popover.Content>
</Popover.Root>

