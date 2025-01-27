<script lang="ts">
	import { Button } from "$lib/components/ui/button/index.js";
	import { Input } from "$lib/components/ui/input";
	import { tick } from "svelte";
	import Check from "lucide-svelte/icons/check";
	import type {InputDialogField, InputDialogFields, InputDialogItem} from "$lib/types/components/dialog/inputDialog";
	import * as Command from "$lib/components/ui/command/index.js";
	import * as Popover from "$lib/components/ui/popover/index.js";
	import StringOperatorSelectWrapper from "$lib/components/form/select/StringOperatorSelectWrapper.svelte";
	import NumberOperatorSelectWrapper from "$lib/components/form/select/NumberOperatorSelectWrapper.svelte";
	import MoveRight from "lucide-svelte/icons/move-right";


	interface Props {
		options: InputDialogFields,
		item: InputDialogItem,
	}

	let {
		options,
		item = $bindable()
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
		item.filter.value = inputValue;
		activeLabel = getLabel();
	})


	function getLabel() {
		let label = "...";

		options.forEach(option => {
			if (option.field === item.field) {
				label = option.label;
			}
		})

		return label;
	}

	function updateItem(option: InputDialogField) {
		item.field = option.field;
		item.type = option.type;
	}
</script>



<div class="flex gap-2 items-center">
	<Popover.Root bind:open>
		<Popover.Trigger bind:ref={triggerRef}>
			{#snippet child({ props })}
				<Button
					variant="outline"
					class="w-[320px] justify-between font-normal"
					{...props}
					role="combobox"
					aria-expanded={open}
				>
					{activeLabel || "Sloupec"}
				</Button>
			{/snippet}
		</Popover.Trigger>


		<Popover.Content class="p-0 !w-[160px]">
			<Command.Root>
				<Command.Input placeholder="..." />

				<Command.List class="">
					<Command.Empty>
						No framework found.
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
								{ option.label }
							</Command.Item>
						{/each}
					</Command.Group>
				</Command.List>
			</Command.Root>
		</Popover.Content>
	</Popover.Root>

	<MoveRight strokeWidth={4} class="text-albi-500"/>


	{#if item.type === "string"}
		<StringOperatorSelectWrapper bind:item={item}/>
	{/if}


	{#if item.type === "number"}
		<NumberOperatorSelectWrapper bind:item/>
	{/if}

	<MoveRight strokeWidth={4} class="text-albi-500"/>

	<Input
		bind:value={inputValue}
		class="w-full border-border"
	/>
</div>

