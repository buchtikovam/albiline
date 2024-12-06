<script lang="ts">
	import { _ } from 'svelte-i18n'
	import { ribbonActionStore } from '$lib/stores/ribbonStore';
	import ChevronDown from 'lucide-svelte/icons/chevron-down';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import * as Tooltip from '$lib/components/ui/tooltip';
	import type { RibbonItem, RibbonSubItem } from '$lib/types/components/ribbon/ribbon';
	import type { RibbonActionEnum } from '$lib/enums/ribbon/ribbonAction';

	interface Props {
		ribbonItem: RibbonItem;
		isRibbonOpen?: boolean;
	}

	let { ribbonItem, isRibbonOpen = true }: Props = $props();

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
					class="text-[9px] size-11 leading-none rounded hover:bg-muted/80 text-albi-950 hover:text-black"
				>
					<span class="flex w-11 items-center justify-center ml-1 text-albi-950 hover:text-black">
						<ribbonItem.icon
							class="size-4 muted-foreground"
						/>
						<ChevronDown class="size-2 " />
					</span>
					{$_('components.ribbon.' + ribbonItem.field)}
				</button>
			</DropdownMenu.Trigger>
		</div>

		<DropdownMenu.Content class="w-fit">
			{#each children as ribbonChild}
				<DropdownMenu.Item class="w-full">
					<button onclick={() => setRibbonAction(ribbonChild.action)}>
						{$_('components.ribbon.' + ribbonChild.field)}
					</button>
				</DropdownMenu.Item>
			{/each}
		</DropdownMenu.Content>
	</DropdownMenu.Root>
{:else}
	<Tooltip.Root openDelay={800}>
		<DropdownMenu.Root>
			<DropdownMenu.Trigger class="ml-0.5 min-w-6 rounded hover:bg-muted/80 flex items-center text-albi-950 hover:text-black">
<!--					<Tooltip.Trigger class="flex items-center">-->
					<ribbonItem.icon
						class="size-4 "
					/>
					<ChevronDown class="size-2 mr-0.5" />
<!--					</Tooltip.Trigger>-->
			</DropdownMenu.Trigger>

			<DropdownMenu.Content class="w-fit ">
				{#each children as ribbonChild}
					<DropdownMenu.Item class="w-full">
						<button onclick={() => setRibbonAction(ribbonChild.action)}>
							{$_('components.ribbon.' + ribbonChild.field)}
						</button>
					</DropdownMenu.Item>
				{/each}
			</DropdownMenu.Content>
		</DropdownMenu.Root>

		<Tooltip.Content>
			{$_('components.ribbon.' + ribbonItem.field)}
		</Tooltip.Content>
	</Tooltip.Root>
{/if}
