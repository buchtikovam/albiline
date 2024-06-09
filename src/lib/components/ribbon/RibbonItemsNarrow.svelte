<script lang="ts">
	import type { Item } from '$lib/types/ribbon';
	import * as Tooltip from '$lib/components/ui/tooltip';

	export let item: Item[];
	export let isOpen: boolean = false;
</script>


{#if isOpen === true}
	<div>
		{#each item as item}
			<button class="text-[11px] flex text-muted-foreground hover:bg-muted/70">
				<svelte:component this={item.icon} class="mr-1 size-3.5 muted-foreground" />
				{item.name}
			</button>
		{/each}
	</div>
{:else}
	{#each item as item}
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
	{/each}
{/if}
