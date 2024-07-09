<script lang="ts">
	import type { Item } from '$lib/types/ribbon/ribbon';
	import * as Tooltip from '$lib/components/ui/tooltip';
	import { ribbonActionStore } from '$lib/stores/ribbonStore';
	import type { Action } from '$lib/enums/action';

	export let item: Item[];
	export let isOpen: boolean = true;

	function setAction(itemAction: Action | undefined) {
		if (itemAction) {
			ribbonActionStore.set(itemAction);
		}
	}
</script>

{#if isOpen === true}
	<div class="w-[60px] min-w-[60px]">
		{#each item as item}
			<button
				class="text-[10px] flex text-muted-foreground rounded hover:bg-muted/70"
				on:click={() => setAction(item.action)}
			>
				<svelte:component this={item.icon} class="mr-1 size-3.5 muted-foreground" />
				{item.name}
			</button>
		{/each}
	</div>
{:else}
	{#each item as item}
		<Tooltip.Root openDelay={250}>
			<Tooltip.Trigger class="min-w-5 mx-0.5 mt-auto">
				<button
					class="size-5 pt-1 rounded hover:bg-muted/70"
					on:click={() => setAction(item.action)}
				>
					<svelte:component this={item.icon} class="size-4 mx-auto muted-foreground" />
				</button>
			</Tooltip.Trigger>
			<Tooltip.Content class="mt-20">
				{item.name}
			</Tooltip.Content>
		</Tooltip.Root>
	{/each}
{/if}
