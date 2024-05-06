<script lang="ts">
	import * as Tooltip from '$lib/components/ui/tooltip';
	import * as Command from '$lib/components/ui/command';
	import * as Popover from '$lib/components/ui/popover';
	import { Button } from '$lib/components/ui/button';
	import { tick } from 'svelte';
	import ChevronDown from 'lucide-svelte/icons/chevron-down';
	import { RibbonStateStore } from '$lib/components/stores/store';

	export let name: string = 'Item';

	let isOpen: unknown;

	RibbonStateStore.subscribe((data) => {
		isOpen = data
	})


	const exportOptions = [
		{
			value: 'excel',
			label: 'excel'
		},
		{
			value: 'pdf',
			label: 'pdf'
		},
		{
			value: 'csv',
			label: 'csv'
		}
	];

	let open = false;
	let value = '';

	$: selectedValue =
		exportOptions.find((f) => f.value === value)?.label ??
		'formát';

	function closeAndFocusTrigger(triggerId: string) {
		open = false;
		tick().then(() => {
			document.getElementById(triggerId)?.focus();
		});
	}
</script>


{#if isOpen === "true"}
	<div class="flex flex-col hover:bg-muted/50 items-center">
		<div
			class="p-1 w-min h-fit rounded-md flex content-center items-center mx-auto text-muted-foreground ">
			<button class="text-[12px] flex flex-col gap-1 leading-3 content-center items-center m-auto">
				<slot />
				{name}
			</button>
		</div>

		<Popover.Root bind:open let:ids>
			<Popover.Trigger asChild let:builder>
				<Button
					builders={[builder]}
					variant="outline"
					role="combobox"
					aria-expanded={open}
					class="w-fit h-fit justify-between text-[10px] p-0.5"
				>
					{selectedValue}
					<ChevronDown class="pl-1 h-4 w-4 " />
				</Button>
			</Popover.Trigger>
			<Popover.Content class="w-max p-0">
				<Command.Root>
					<Command.Group>
						{#each exportOptions as framework}
							<Command.Item
								value={framework.value}
								onSelect={(currentValue) => {
									value = currentValue;
									closeAndFocusTrigger(ids.trigger);
            					}}
								class="text-xs"
							>
								{framework.label}
							</Command.Item>
						{/each}
					</Command.Group>
				</Command.Root>
			</Popover.Content>
		</Popover.Root>

	</div>

{:else}
	<Tooltip.Root openDelay={250}>
		<Tooltip.Trigger>
			<div
				class="p-2 w-[32px] h-[32px] rounded-md flex content-center items-center mx-auto text-muted-foreground hover:bg-muted/50">
				<button class="text-xs flex flex-col content-center items-center m-auto">
					<slot />
				</button>
			</div>
		</Tooltip.Trigger>
		<Tooltip.Content class="mt-20">{name}</Tooltip.Content>
	</Tooltip.Root>
{/if}
