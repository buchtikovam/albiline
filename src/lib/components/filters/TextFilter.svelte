<script lang="ts">
	import * as Tooltip from '$lib/components/ui/tooltip';
	import * as Command from '$lib/components/ui/command/index.js';
	import * as Popover from '$lib/components/ui/popover/index.js';
	import { tick } from 'svelte';
	import { ArrowLeftFromLine, ArrowLeftRight, ArrowRightFromLine, Grip } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button';

	export let filterValue;

	let open = false;
	let value = '';

	const filters = [
		{
			value: 'starts-from',
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

	$: selectedValue =
		filters.find((f) => f.value === value)
	;

	function closeAndFocusTrigger(triggerId: string) {
		open = false;
		tick().then(() => {
			document.getElementById(triggerId)?.focus();
		});
	}
</script>

<div class="flex items-center border rounded-md mb-2 ">
	<Popover.Root bind:open let:ids>
		<Popover.Trigger asChild let:builder>

			<Button
				builders={[builder]}
				variant="ghost"
				role="combobox"
				aria-expanded={open}
				class="w-fit h-fit justify-between text-[10px] p-0.5 hover:bg-muted/75"
			>
				<Tooltip.Root openDelay={500}>
					<Tooltip.Trigger>
						<svelte:component this={selectedValue?.icon ?? Grip} class="h-3 w-3" />
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
				<Command.Empty>No framework found.</Command.Empty>
				<Command.Group class="p-1">
					{#each filters as filter}
						<Command.Item
							value={filter.value}
							onSelect={(currentValue) => {
								value = currentValue;
								closeAndFocusTrigger(ids.trigger);
							}}
							class="text-xs hover:bg-muted/50 p-1.5"
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
		class="focus:outline-none text-xs p-0.5 rounded-md"
	>
</div>

<style>
	input {
		width: 8rem;
	}
</style>
