<script lang="ts">
	import * as Tooltip from '$lib/components/ui/tooltip';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import ChevronDown from 'lucide-svelte/icons/chevron-down';
	import { ribbonStateStore } from '$lib/stores/store';

	export let name: string = 'Item';
	let isOpen: unknown;

	ribbonStateStore.subscribe((data) => {
		isOpen = data;
	});

	type Option = {
		name: string;
		state: boolean;
	};

	export let options: Option[] = [
		{
			name: 'Volba 1',
			state: false
		},
		{
			name: 'Volba 2',
			state: false
		},
		{
			name: 'Volba 3',
			state: false
		}
	];
</script>

{#if isOpen === "true"}
	<DropdownMenu.Root>
		<DropdownMenu.Trigger>
			<div
				class="p-2 w-min h-[60px] rounded-md flex content-center items-center mx-auto text-muted-foreground hover:bg-muted/50">
				<div class="text-[11px] flex flex-col gap-1 leading-3 content-start items-center">
					<slot />
					<div class="flex">
						{name}
						<ChevronDown class="h-4 w-4" />
					</div>
				</div>
			</div>
		</DropdownMenu.Trigger>
		<DropdownMenu.Content class="w-fit p-1">
			{#each options as option}
				<DropdownMenu.Item class="text-xs w-full">
					{option.name}
				</DropdownMenu.Item>
			{/each}
		</DropdownMenu.Content>
	</DropdownMenu.Root>
{:else}
	<DropdownMenu.Root>
		<DropdownMenu.Trigger>

			<Tooltip.Root openDelay={250}>
				<Tooltip.Trigger>
					<div
						class="p-2 w-[32px] h-[32px] rounded-md flex content-center items-center mx-auto text-muted-foreground hover:bg-muted/70">
						<button class="text-xs flex flex-col content-center items-center m-auto">
							<slot />
						</button>
					</div>
				</Tooltip.Trigger>
				<Tooltip.Content class="mt-20">
					<div class="flex items-center gap-1">
						{name}
						<ChevronDown class="h-3 w-3" />
					</div>
				</Tooltip.Content>
			</Tooltip.Root>

		</DropdownMenu.Trigger>
		<DropdownMenu.Content class="w-fit p-1">
			{#each options as option}
				<DropdownMenu.Item class="text-xs w-full">
					{option.name}
				</DropdownMenu.Item>
			{/each}
		</DropdownMenu.Content>
	</DropdownMenu.Root>
{/if}
