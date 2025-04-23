<script lang="ts">
	import {Button} from "$lib/components/ui/button/index.js";
	import {tick} from "svelte";
	import {cn} from "$lib/utils.js";
	import ChevronsUpDown from "lucide-svelte/icons/chevrons-up-down";
	import Check from "lucide-svelte/icons/check";
	import * as m from '$lib/paraglide/messages.js'
	import * as Command from "$lib/components/ui/command/index.js";
	import * as Popover from "$lib/components/ui/popover/index.js";
	import * as Select from "$lib/components/ui/select/index.js";

	interface Props {
		value: string|number|Date|boolean|null;
		onchange: () => void;
		asyncDropdownOptions?: () => Promise<string[]>;
		dropdownOptions?: string[];
	}

	let {
		value = $bindable(),
		onchange,
		asyncDropdownOptions,
		dropdownOptions
	}: Props = $props();


	let dropdownValue = $state(value);
	let options: string[] = $state([]);


	// Initialize dropdownValue if value is empty
	if (!value) {
		dropdownValue = "‎";
	}


	$effect(() => {
		if (typeof asyncDropdownOptions === "function" || dropdownOptions) {
			getOptions();
		}
	});


	async function getOptions() {
		if (typeof asyncDropdownOptions === "function") {
			try {
				options = await asyncDropdownOptions();
			} catch (error) {
				console.error("Failed to fetch async options:", error);
			}
		} else if (dropdownOptions) {
			options = dropdownOptions;
		}
	}


	// Popover logic
	let open = $state(false);
	let triggerRef = $state<HTMLButtonElement>(null!);

	function closeAndFocusTrigger() {
		open = false;
		tick().then(() => {
			triggerRef.focus();
		});
	}


	// Dynamic width of select options
	let buttonWidth = $state(0);

	$effect(() => {
		if (open) {
			const updateWidth = () => {
				buttonWidth = triggerRef.offsetWidth;
			};

			updateWidth();
			window.addEventListener("resize", updateWidth);

			return () => {
				window.removeEventListener("resize", updateWidth);
			};
		}
	});
</script>



<div class="w-full ">
	<Popover.Root bind:open>
		<Popover.Trigger bind:ref={triggerRef}>
			{#snippet child({ props })}
				<Button
					variant="outline"
					class={`w-full !h-10 justify-between font-normal px-3 hover:bg-muted/50`}
					{...props}
					role="combobox"
					aria-expanded={open}
				>
					{value || "‎"}
					<ChevronsUpDown class="opacity-50" />
				</Button>
			{/snippet}
		</Popover.Trigger>

		{#if options.length > 0}
			<Popover.Content
				align="center"
				class="w-full p-0 max-h-[360px] h-[360px]"
				style="width: {buttonWidth}px;"
			>
				<Command.Root>
					<Command.Input placeholder={m.components_header_search_placeholder()} />
					<Command.List
						style="width: {buttonWidth}px;"
					>
						<Command.Empty>
							{m.generics_not_found()}
						</Command.Empty>

						<Command.Group>
							{#each options as option (option)}
								<Command.Item
									value={option}
									onSelect={() => {
										dropdownValue = option;

										if (typeof asyncDropdownOptions === "function") {
											value = dropdownValue.split("-")[0].trim();
										}

										if (dropdownOptions) {
											value = dropdownValue;
										}

										onchange();
										closeAndFocusTrigger();
									}}
								>
									<Check
										class={cn(dropdownValue !== option && "text-transparent")}
									/>

									{option}
								</Command.Item>
							{/each}
						</Command.Group>
					</Command.List>
				</Command.Root>
			</Popover.Content>
		{/if}
	</Popover.Root>
</div>
