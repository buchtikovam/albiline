<script lang="ts">
	import { Button } from "$lib/components/ui/button/index.js";
	import type {InputDialogFields, InputDialogItem} from "$lib/types/components/dialog/inputDialog";
	import ChevronsUpDown from "lucide-svelte/icons/chevrons-up-down";
	import Check from "lucide-svelte/icons/check";
	import { tick } from "svelte";
	import * as Command from "$lib/components/ui/command/index.js";
	import * as Popover from "$lib/components/ui/popover/index.js";
	import { cn } from "$lib/utils.js";
	import {Input} from "$lib/components/ui/input";
	// import ChevronRight from "lucide-svelte/icons/chevron-right";

	interface Props {
		options: InputDialogFields,
		activeItem: InputDialogItem,
	}

	let {
		options,
		activeItem = $bindable()
	}: Props = $props();


	let open = $state(false);
	let triggerRef = $state<HTMLButtonElement>(null!);





	const selectedLabel = $derived(
		options.find((f) => f.field === activeItem.field)?.label
	);


	function closeAndFocusTrigger() {
		open = false;
		tick().then(() => {
			triggerRef.focus();
		});
	}
</script>



<div class="flex gap-2 items-center">
	<Popover.Root bind:open>
		<Popover.Trigger bind:ref={triggerRef}>
			{#snippet child({ props })}
				<Button
					variant="outline"
					class="w-[300px] justify-between font-normal"
					{...props}
					role="combobox"
					aria-expanded={open}
				>
					<!--{selectedValue || "Select a framework..."}-->
					{"Id prodejny"}
				</Button>
			{/snippet}
		</Popover.Trigger>


		<Popover.Content class="p-0">
			<Command.Root>
				<Command.Input placeholder="Search framework..." />

				<Command.List>
					<Command.Empty>
						No framework found.
					</Command.Empty>


					<Command.Group>
						{#each options as option}
							<Command.Item
								value={option.label}

							>
								<Check/>

								{ option.label }
							</Command.Item>
						{/each}
					</Command.Group>
				</Command.List>
			</Command.Root>
		</Popover.Content>
	</Popover.Root>

<!--	<ChevronRight class="text-albi-500 p-0 m-0"/>-->

	<Input class="w-full border-border"/>
</div>
