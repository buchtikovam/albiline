<script lang="ts">
	import {Button} from "$lib/components/ui/button/index.js";
	import {z} from "zod";
	import {onMount} from "svelte";
	import {tick} from "svelte";
	import {cn} from "$lib/utils.js";
	import ChevronsUpDown from "lucide-svelte/icons/chevrons-up-down";
	import Check from "lucide-svelte/icons/check";
	import type {AutoFormInput} from "$lib/types/components/form/autoform";
	import InputLabelWithContext from "$lib/components/form/labels/InputLabelWithContext.svelte";
	import * as m from '$lib/paraglide/messages.js'
	import * as Command from "$lib/components/ui/command/index.js";
	import * as Popover from "$lib/components/ui/popover/index.js";
	import * as Select from "$lib/components/ui/select/index.js";

	interface Props {
		value: string;
		formInput: AutoFormInput;
		addToEditedFormData: (newValue: any, initialValue: any) => void;
	}


	let {
		value,
		formInput,
		addToEditedFormData
	}: Props = $props();


	let dropdownValue = $state("");
	let hasError = $state(false);
	let errorMessage = $state("");
	let options: string[] = $state([]);
	let changed = $state(false)
	let initialValue = $state(value)

	if (!value) {
		dropdownValue = "‎"
	}


	$effect(() => {
		if (dropdownValue) {
			value = dropdownValue;

			if (formInput.asyncDropdownOptions) {
				value = dropdownValue.split("-")[0]
			} else {
				value = dropdownValue;
			}

			if (changed) validateDropdownSchema(value);

		}

	})


	onMount(async () => {
		if (formInput.asyncDropdownOptions) {
			options = await formInput.asyncDropdownOptions();
		}

		if (formInput.dropdownOptions) {
			options = formInput.dropdownOptions;
		}
	})



	function validateDropdownSchema(selectedValue: any) {
		try {
			if (formInput.asyncDropdownOptions) {
				if (options.length > 0) {
					console.log(selectedValue)

					const strippedOptions = options.map((option: any) => option.split("-")[0])

					z.enum(strippedOptions).parse(selectedValue);
				}
			} else {
				formInput.schema.parse(selectedValue);
			}

			hasError = false;
			errorMessage = "";
			console.log("far")
			addToEditedFormData(selectedValue.trim(), initialValue);
		} catch (e) {
			console.log(e)
			hasError = true;
			errorMessage = e.issues[0].message;
			addToEditedFormData(selectedValue.trim(), initialValue);
			console.log(e);
		}
	}


	let open = $state(false);
	let triggerRef = $state<HTMLButtonElement>(null!);


	function closeAndFocusTrigger() {
		open = false;
		tick().then(() => {
			triggerRef.focus();
		});
	}


	let buttonWidth = $state(0);

	$effect(() => {
		if (open) {
			const updateWidth = () => {
				buttonWidth = triggerRef.offsetWidth;
			};

			updateWidth();
			window.addEventListener('resize', updateWidth);

			return () => {
				window.removeEventListener('resize', updateWidth);
			};
		}
	});
</script>



<div class="w-full flex flex-col">
	<InputLabelWithContext
		contextMenuField={formInput.field}
		label={formInput.translation()}
	/>

	<Popover.Root bind:open>
		<Popover.Trigger bind:ref={triggerRef}>
			{#snippet child({ props })}
				<Button
					variant="outline"
					class={`w-full !h-10 justify-between font-normal px-3 hover:bg-muted/50 ${hasError ? "border-red-500 " : ""}`}
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
										changed = true;
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

	<p class="text-xs text-red-700 w-full">
		{errorMessage}
	</p>
</div>
