<script lang="ts">
	import { Button } from "$lib/components/ui/button/index.js";
	import type {
		InputConditionTypeString,
		InputDialogFields,
		InputDialogItem,
		InputDialogType
	} from "$lib/types/components/dialog/inputDialog";
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

	interface Props {
		item: InputDialogItem,
	}

	let {
		item = $bindable(),
	}: Props = $props();


	let open = $state(false);
	let triggerRef = $state<HTMLButtonElement>(null!);

	type OperatorOption = {
		field: InputConditionTypeString,
		label: string,
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

	let activeLabel = $derived.by(() => {
		options.forEach(option => {
			if (option.field === item.field) {
				return option.label;
			}
		})

		return "...";
	})
</script>



<div class="flex gap-2">
	<Popover.Root bind:open>
		<Popover.Trigger bind:ref={triggerRef}>
			{#snippet child({ props })}
				<Button
					variant="outline"
					class="w-[200px] font-normal hover:bg-muted/50"
					{...props}
					role="combobox"
					aria-expanded={open}
				>
					<!--{@const Icon = activeOperator.icon}-->
					{activeLabel}
<!--					<Icon/>-->
				</Button>
			{/snippet}
		</Popover.Trigger>


		<Popover.Content class="p-0 w-[120px]">
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
</div>
