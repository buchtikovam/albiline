<script lang="ts">
	import * as Tooltip from '$lib/components/ui/tooltip';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import type { Item, SubItem } from '$lib/types/ribbon';
	import type { Action } from '$lib/enums/action';
	import { ribbonActionStore } from '$lib/stores/ribbonStore';
	import ChevronDown from 'lucide-svelte/icons/chevron-down';

	export let item: Item;
	export let isOpen: boolean = false;

	let children: SubItem[] = item.children || [];

	function setAction(itemAction: Action | undefined) {
		if (itemAction) {
			ribbonActionStore.set(itemAction);
		}
	}
</script>

{#if isOpen === true}
	<DropdownMenu.Root>
		<DropdownMenu.Trigger>
			<button
				class="text-[10px] min-w-12 w-12 h-12 leading-3 rounded hover:bg-muted/70"
			>
<!--				<span class="flex items-center justify-center gap-0.5 ml-1">-->
					<svelte:component this={item.icon} class="size-4 mx-auto muted-foreground " />
<!--					<ChevronDown class="size-2 " />-->
<!--				</span>-->

				{item.name}
			</button>
		</DropdownMenu.Trigger>

		<DropdownMenu.Content class="w-fit p-1">
			{#each children as child}
				<DropdownMenu.Item class="text-xs w-full">
					<button on:click={() => setAction(child.action)}>
						{child.name}
					</button>
				</DropdownMenu.Item>
			{/each}
		</DropdownMenu.Content>
	</DropdownMenu.Root>
{:else}
	<DropdownMenu.Root>
		<DropdownMenu.Trigger>
			<Tooltip.Root openDelay={250}>
				<Tooltip.Trigger>
					<button class="size-6 rounded hover:bg-muted/70">
						<svelte:component this={item.icon} class="size-4 mx-auto muted-foreground " />
<!--						<ChevronDown class="size-2" />-->
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
					<button on:click={() => setAction(child.action)}>
						{child.name}
					</button>
				</DropdownMenu.Item>
			{/each}
		</DropdownMenu.Content>
	</DropdownMenu.Root>
{/if}



