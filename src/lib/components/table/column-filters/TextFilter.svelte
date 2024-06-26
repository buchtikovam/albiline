<script lang="ts">
	import * as Tooltip from '$lib/components/ui/tooltip';
	import * as Command from '$lib/components/ui/command';
	import * as Popover from '$lib/components/ui/popover';
	import { onMount, tick } from 'svelte';
	import ArrowLeftFromLine from 'lucide-svelte/icons/arrow-left-from-line';
	import ArrowLeftRight from 'lucide-svelte/icons/arrow-left-right';
	import ArrowRightFromLine from 'lucide-svelte/icons/arrow-right-from-line';
	import ChevronDown from 'lucide-svelte/icons/chevron-down';
	import { Button } from '$lib/components/ui/button';
	import { get, type Readable, type Writable } from 'svelte/store';
	import type { TextFilters, Filter } from '$lib/types/table/filter';
	import { currentFiltersStore } from '$lib/stores/tableStore';

	export let preFilteredValues: Readable<unknown[]>;
	export let values: Readable<unknown[]>;
	get(preFilteredValues);
	get(values);

	export let accessor: string;
	export let filterValue: Writable<string>;
	export let columnFilter: Writable<TextFilters>;

	// TODO: add checkboxes with unique row values, to filter out data

	const filters = [
		{
			value: 'starts-with',
			label: 'Začíná na',
			icon: ArrowRightFromLine
		},
		{
			value: 'ends-with',
			label: 'Končí na',
			icon: ArrowLeftFromLine
		},
		{
			value: 'contains',
			label: 'Obsahuje',
			icon: ArrowLeftRight
		}
	];

	let open = false;
	let value: TextFilters;

	$: selectedValue =
		filters.find((f) => f.value === value)
	;

	function closeAndFocusTrigger(triggerId: string) {
		open = false;
		columnFilter.set(value);

		saveFilters();

		tick().then(() => {
			document.getElementById(triggerId)?.focus();
		});
	}

	function saveFilters() {
		let newFilter: Filter = {
			value: $filterValue,
			colFilter: $columnFilter
		};

		currentFiltersStore.update((data) => {
			if (data !== undefined) {
				const existingFilter = data[accessor];

				if (existingFilter) {
					existingFilter.value = $filterValue;
					existingFilter.colFilter = $columnFilter;
				} else {
					data[accessor] = newFilter;
				}

				return data;
			}
		});
	}

	onMount(() => {
		value = get(columnFilter);
	});
</script>

<div class="w-auto flex items-center border rounded-md my-0.5">
	<Popover.Root bind:open let:ids>
		<Popover.Trigger asChild let:builder>
			<Button
				builders={[builder]}
				variant="ghost"
				role="combobox"
				aria-expanded={open}
				class="w-fit h-fit min-w-[15px] justify-between text-[15px] p-0.5 hover:bg-muted/75"
			>
				<Tooltip.Root openDelay={500}>
					<Tooltip.Trigger>
						<svelte:component this={get(columnFilter) === "default" ? ChevronDown : selectedValue?.icon}
										  class="h-3 w-3 min-w-3" />
					</Tooltip.Trigger>
					{#if selectedValue?.label === undefined}
						<Tooltip.Content class="mt-16">Vyberte filtr</Tooltip.Content>
					{:else}
						<Tooltip.Content class="mt-16">{selectedValue?.label}</Tooltip.Content>
					{/if}
				</Tooltip.Root>
			</Button>

		</Popover.Trigger>
		<Popover.Content class="w-fit p-0">
			<Command.Root>
				<Command.Empty>Nejsou dostupné žádné filtry.</Command.Empty>
				<Command.Group class="p-1">
					{#each filters as filter}
						<Command.Item
							value={filter.value}
							onSelect={(currentValue) => {
								value = currentValue;
								closeAndFocusTrigger(ids.trigger);
							}}
							class="text-xs hover:bg-muted/70 p-1.5 flex items-center"
						>
							<svelte:component this={filter.icon} class="h-3 w-3 mr-2" />
							{filter.label}
						</Command.Item>
					{/each}
				</Command.Group>
			</Command.Root>
		</Popover.Content>
	</Popover.Root>

	<input
		id="filter-input"
		type="text"
		bind:value={$filterValue}
		on:focusout={saveFilters}
		class="focus:outline-none w-full min-w-fit max-w-full text-xs p-0.5 rounded-md font-semibold"
	/>
</div>
