<script lang="ts">
	import { Button } from "$lib/components/ui/button/index.js";
	import type {
		InputConditionTypeNumber,
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

	let activeOperator = $state({
		field: "contains",
		label: "Obsahuje",
		// icon: Scan
	})

	type OperatorOption = {
		field: InputConditionTypeNumber,
		label: string,
		// icon: typeof IconType,
	}

	const options: OperatorOption[] = [
		{
			field: "equals",
			label: "Rovná se",
			// icon: Scan,
		},
		{
			field: "not-equals",
			label: "Nerovná se",
			// icon: ArrowRightFromLine
		},
		{
			field: "more",
			label: "Více než",
			// icon: ArrowLeftFromLine
		},
		{
			field: "more-or-equal",
			label: "Více nebo rovno",
			// icon: ArrowLeftFromLine
		},
		{
			field: "less",
			label: "Méně než",
			// icon: ArrowLeftFromLine
		},
		{
			field: "less-or-equal",
			label: "Méně nebo rovno",
			// icon: ArrowLeftFromLine
		},
		{
			field: "between",
			label: "Mezi",
			// icon: ArrowLeftFromLine
		},
		{
			field: "empty",
			label: "Prázdný",
			// icon: ArrowLeftFromLine
		},
		{
			field: "not-empty",
			label: "Není prázdný",
			// icon: ArrowLeftFromLine
		}
	]

	function closeAndFocusTrigger() {
		open = false;
		tick().then(() => {
			triggerRef.focus();
		});
	}
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
					{activeOperator.label}
					<!--					<Icon/>-->
				</Button>
			{/snippet}
		</Popover.Trigger>


		<Popover.Content class="p-0">
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
									activeOperator = option;
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
