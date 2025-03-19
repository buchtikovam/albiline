<script lang="ts">
	import {Button} from "$lib/components/ui/button";
	import {isMobile} from "$lib/runes/page.svelte";
	import ChevronDown from "lucide-svelte/icons/chevron-down";
	import type {
		ColumnFilter,
		InputParamsOptions,
		InputParamsSelectOption
	} from "$lib/types/components/input-params/inputParams";
	import * as Popover from "$lib/components/ui/popover";
	import * as Command from "$lib/components/ui/command";
	import {tick} from "svelte";


	interface Props {
		columnFilter: ColumnFilter;
		selectOptions: InputParamsOptions[]
		dropdownOptions: string[]|undefined;
		asyncDropdownOptions: (() => Promise<string[]>)|undefined;
	}

	let {
		columnFilter = $bindable(),
		selectOptions,
		dropdownOptions = $bindable(),
		asyncDropdownOptions = $bindable(),
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
			if (option.children) {
				option.children.forEach(child => {
					if (child.field === columnFilter.columnName) {
						label = child.label();

						if (child.type === "enum") {
							if (child.dropdownOptions) {
								dropdownOptions = child.dropdownOptions;
							}

							if (typeof child.asyncDropdownOptions === "function") {
								asyncDropdownOptions = child.asyncDropdownOptions;
							}
						} else {
							dropdownOptions = undefined;
							asyncDropdownOptions = undefined;

						}
					}
				})
			}

			if (option.field === columnFilter.columnName) {
				label = option.label();

				// if (option.dropdownOptions) {
				// 	dropdownOptions = option.dropdownOptions;
				// }
				//
				// if (typeof option.asyncDropdownOptions === "function") {
				// 	asyncDropdownOptions = option.asyncDropdownOptions;
				// }
			}
		})

		return label;
	}


	function updateItem(option: InputParamsSelectOption) {
		console.log(option);

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

		if (option.dropdownOptions) {
			dropdownOptions = option.dropdownOptions;
		}

		if (typeof option.asyncDropdownOptions === "function") {
			asyncDropdownOptions = option.asyncDropdownOptions;
		}
	}


	let buttonWidth = $state(0); // Add this state variable
	let triggerRef = $state<HTMLButtonElement>(null!);


	$effect(() => {
		if (open) {
			const updateWidth = () => {
				buttonWidth = triggerRef.offsetWidth;
			};

			// Initial width update
			updateWidth();

			// Update width on window resize
			window.addEventListener('resize', updateWidth);

			// Cleanup resize listener
			return () => {
				window.removeEventListener('resize', updateWidth);
			};
		}
	});
</script>



<Popover.Root bind:open>
	{#if !isMobile.value}

		<Popover.Trigger
			bind:ref={triggerRef}
			class="hidden sm:block w-full font-normal hover:bg-muted/70"
		>
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
		<Popover.Trigger
			bind:ref={triggerRef}
			class="block sm:hidden w-full font-normal hover:bg-muted/70"
		>
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
		class="p-0 w-full max-h-60 h-60 "
		style="width: {buttonWidth}px;"
	>
		<Command.Root>
			<Command.Input placeholder="..." />

			<Command.List
				class="max-h-80"
				style="width: {buttonWidth}px;"

			>
				<Command.Empty class="">
					<p>
						Takový sloupec nemáme.
					</p>

				</Command.Empty>

				{#each selectOptions as option}
					{#if !option.children}
						<Command.Item
							onSelect={() => {
								updateItem(option);
							}}
							value={ option.label() + option.field }
						>
							{ option.label()  }
						</Command.Item>
					{:else }
						<Command.Group heading={option.label()}>
							{#each option.children as child}
								<Command.Item
									onSelect={() => {
									updateItem(child);
								}}
									value={ child.label() + child.field }
								>
									{ child.label() }
								</Command.Item>
							{/each}
						</Command.Group>
					{/if}
				{/each}
			</Command.List>
		</Command.Root>
	</Popover.Content>
</Popover.Root>
