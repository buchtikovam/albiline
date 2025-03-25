<script lang="ts">
	import { ribbonAction, ribbonOpen } from '$lib/runes/ribbon.svelte';
	import ChevronDown from 'lucide-svelte/icons/chevron-down';
	import type { RibbonItemType, RibbonSubItemType } from '$lib/types/components/ribbon/ribbon';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import * as Tooltip from '$lib/components/ui/tooltip';

	let { ribbonItem }: {
		ribbonItem: RibbonItemType;
	} = $props();

	let children: RibbonSubItemType[] = $derived(ribbonItem.children || []);
</script>



{#if ribbonOpen.value === true}
	<DropdownMenu.Root>
		<div
			class="min-w-11 max-w-11"
		>
			<DropdownMenu.Trigger
				class="mt-auto"
			>
				{@const Icon = ribbonItem.icon}
				<button
					class="text-[9px] size-11 leading-none rounded hover:bg-muted/80 text-albi-950 hover:text-black"
				>
					<span
						class="flex w-11 items-center justify-center ml-1 text-albi-950 hover:text-black"
					>
						<Icon
							class="size-4 muted-foreground"
						/>
						<ChevronDown class="size-2 " />
					</span>
					{ ribbonItem.translation() }
				</button>
			</DropdownMenu.Trigger>
		</div>

		<DropdownMenu.Content
			class="w-fit"
		>
			{#each children as ribbonChild}
				<DropdownMenu.Item
					class="w-full"
				>
					<button
						class="w-full text-start"
						onclick={() => {
							ribbonAction.value = ribbonChild.action;
						}}
					>
						{ ribbonChild.translation() }
					</button>
				</DropdownMenu.Item>
			{/each}
		</DropdownMenu.Content>
	</DropdownMenu.Root>
{:else}
	<div
		class="min-w-6 ml-0.5"
	>
		<Tooltip.Root>
			<DropdownMenu.Root>
				<DropdownMenu.Trigger
					class="rounded hover:bg-muted/80 flex items-center text-albi-950 hover:text-black"
				>
					<Tooltip.Trigger
						class="flex items-center w-auto"
					>
						{@const Icon = ribbonItem.icon}

						<Icon
							class="size-4"
						/>

						<ChevronDown class="size-2 mr-0.5" />
					</Tooltip.Trigger>
				</DropdownMenu.Trigger>

				<DropdownMenu.Content
					side="top"
				>
					{#each children as ribbonChild}
						<DropdownMenu.Item
							class="w-full"
						>
							<button
								class="w-full text-start"
								onclick={() => {
								ribbonAction.value = ribbonChild.action;
							}}>
								{ ribbonChild.translation() }
							</button>
						</DropdownMenu.Item>
					{/each}
				</DropdownMenu.Content>
			</DropdownMenu.Root>

			<Tooltip.Content
				side="bottom"
			>
				{ ribbonItem.translation() }
			</Tooltip.Content>
		</Tooltip.Root>
	</div>
{/if}
