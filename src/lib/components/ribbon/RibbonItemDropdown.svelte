<script lang="ts">
	import { ribbonActionStore, ribbonOpen } from '$lib/runes/ribbon.svelte';
	import ChevronDown from 'lucide-svelte/icons/chevron-down';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import * as Tooltip from '$lib/components/ui/tooltip';
	import type { RibbonItem, RibbonSubItem } from '$lib/types/components/ribbon/ribbon';
	import type { RibbonActionEnum } from '$lib/enums/ribbon/ribbonAction';


	let { ribbonItem }: {
		ribbonItem: RibbonItem;
	} = $props();

	let children: RibbonSubItem[] = ribbonItem.children || [];

	function setRibbonAction(itemAction: RibbonActionEnum | undefined) {
		if (itemAction) {
			ribbonActionStore.set(itemAction);
		}
	}
</script>



{#if ribbonOpen.value === true}
	<DropdownMenu.Root>
		<div class="min-w-11 max-w-11">
			<DropdownMenu.Trigger class="mt-auto">
				{@const Icon = ribbonItem.icon}
				<button
					class="text-[9px] size-11 leading-none rounded hover:bg-muted/80 text-albi-950 hover:text-black"
				>
					<span class="flex w-11 items-center justify-center ml-1 text-albi-950 hover:text-black">
						<Icon
							class="size-4 muted-foreground"
						/>
						<ChevronDown class="size-2 " />
					</span>
					{ ribbonItem.translation() }
				</button>
			</DropdownMenu.Trigger>
		</div>

		<DropdownMenu.Content class="w-fit">
			{#each children as ribbonChild}
				<DropdownMenu.Item class="w-full" onclick>
					<button onclick={() => setRibbonAction(ribbonChild.action)}>
						{ ribbonChild.translation() }
					</button>
				</DropdownMenu.Item>
			{/each}
		</DropdownMenu.Content>
	</DropdownMenu.Root>
{:else}
	<Tooltip.Root>
		<DropdownMenu.Root>
			<DropdownMenu.Trigger class="ml-0.5 min-w-6 rounded hover:bg-muted/80 flex items-center text-albi-950 hover:text-black">
				<Tooltip.Trigger class="flex items-center">
					{@const Icon = ribbonItem.icon}

					<Icon
						class="size-4 "
					/>
					<ChevronDown class="size-2 mr-0.5" />
				</Tooltip.Trigger>
			</DropdownMenu.Trigger>

			<DropdownMenu.Content side="top">
				{#each children as ribbonChild}
					<DropdownMenu.Item class="w-full">
						<button onclick={() => setRibbonAction(ribbonChild.action)}>
							{ ribbonChild.translation() }
						</button>
					</DropdownMenu.Item>
				{/each}
			</DropdownMenu.Content>
		</DropdownMenu.Root>

		<Tooltip.Content>
			{ ribbonItem.translation() }
		</Tooltip.Content>
	</Tooltip.Root>
{/if}
