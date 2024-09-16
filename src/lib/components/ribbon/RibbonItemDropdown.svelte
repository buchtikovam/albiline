<script lang="ts">
	import { ribbonActionStore } from '$lib/stores/ribbonStore';
	import ChevronDown from 'lucide-svelte/icons/chevron-down';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import * as Tooltip from '$lib/components/ui/tooltip';
	import type { RibbonItem, RibbonSubItem } from '$lib/types/ribbon/ribbon';
	import type { RibbonActionEnum } from '$lib/enums/ribbon/ribbonAction';

	export let ribbonItem: RibbonItem;
	export let isRibbonOpen: boolean = true;

	let children: RibbonSubItem[] = ribbonItem.children || [];

	function setRibbonAction(itemAction: RibbonActionEnum | undefined) {
		if (itemAction) {
			ribbonActionStore.set(itemAction);
		}
	}
</script>



{#if isRibbonOpen === true}
	<DropdownMenu.Root>
		<div class="min-w-11 max-w-11">
			<DropdownMenu.Trigger class="mt-auto">
				<button
					class="text-[9px] size-11 leading-none rounded hover:bg-muted/70"
				>
					<span class="flex w-11 items-center justify-center ml-1">
						<svelte:component
							this={ribbonItem.icon}
							class="size-4 muted-foreground"
						/>
						<ChevronDown class="size-2 " />
					</span>
					{ribbonItem.name}
				</button>
			</DropdownMenu.Trigger>
		</div>

		<DropdownMenu.Content class="w-fit p-1">
			{#each children as ribbonChild}
				<DropdownMenu.Item class="text-xs w-full">
					<button on:click={() => setRibbonAction(ribbonChild.action)}>
						{ribbonChild.name}
					</button>
				</DropdownMenu.Item>
			{/each}
		</DropdownMenu.Content>
	</DropdownMenu.Root>
{:else}
	<DropdownMenu.Root>
		<DropdownMenu.Trigger class="min-w-6 h-5 pl-1 ">
			<Tooltip.Root openDelay={250}>
				<Tooltip.Trigger class="min-w-6 h-5 flex items-center">
					<button class="size-6 rounded hover:bg-muted/70 flex items-center">
						<svelte:component
							this={ribbonItem.icon}
							class="size-5 mx-auto muted-foreground"
						/>
						<ChevronDown class="size-2 mr-0.5" />
					</button>
				</Tooltip.Trigger>

				<Tooltip.Content class="mt-20">
					{ribbonItem.name}
				</Tooltip.Content>
			</Tooltip.Root>
		</DropdownMenu.Trigger>

		<DropdownMenu.Content class="w-fit p-1 mx-0.5">
			{#each children as ribbonChild}
				<DropdownMenu.Item class="text-xs w-full">
					<button on:click={() => setRibbonAction(ribbonChild.action)}>
						{ribbonChild.name}
					</button>
				</DropdownMenu.Item>
			{/each}
		</DropdownMenu.Content>
	</DropdownMenu.Root>
{/if}
