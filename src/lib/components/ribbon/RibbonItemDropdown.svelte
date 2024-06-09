<script lang="ts">
	import ChevronDown from 'lucide-svelte/icons/chevron-down';
	import * as Tooltip from '$lib/components/ui/tooltip';
	import type { Item, SubItem } from '$lib/types/ribbon';

	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';

	export let item: Item;
	export let isOpen: boolean = false;

	let children: SubItem[] = item.children || [];
</script>

{#if isOpen === true}
	<DropdownMenu.Root>
		<DropdownMenu.Trigger>
			<button
				class="text-[11px] w-12 h-12 leading-3">
				<svelte:component this={item.icon} class="size-4 mx-auto muted-foreground hover:bg-muted" />
				{item.name}
			</button>
		</DropdownMenu.Trigger>

		<DropdownMenu.Content class="w-fit p-1">
			{#each children as child}
				<DropdownMenu.Item class="text-xs w-full">
					{child.name}
				</DropdownMenu.Item>
			{/each}
		</DropdownMenu.Content>
	</DropdownMenu.Root>
{:else}
	<DropdownMenu.Root>
		<DropdownMenu.Trigger>

			<Tooltip.Root openDelay={250}>
				<Tooltip.Trigger>
					<button class="size-6 hover:bg-muted/70 rounded-md">
						<svelte:component this={item.icon} class="size-4 mx-auto muted-foreground hover:bg-muted" />
					</button>
				</Tooltip.Trigger>
				<Tooltip.Content class="mt-20">
					{item.name}
				</Tooltip.Content>
			</Tooltip.Root>

		</DropdownMenu.Trigger>
		<DropdownMenu.Content class="w-fit p-1">
			{#each children as child}
				<DropdownMenu.Item class="text-xs w-full">
					{child.name}
				</DropdownMenu.Item>
			{/each}
		</DropdownMenu.Content>
	</DropdownMenu.Root>
{/if}



