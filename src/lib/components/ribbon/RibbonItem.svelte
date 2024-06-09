<script lang="ts">
	import * as Tooltip from '$lib/components/ui/tooltip';
	import type { Item } from '$lib/types/ribbon';

	export let item: Item;
	export let isOpen: boolean = false;
</script>

{#if isOpen === true}
	<button
		class="text-[11px] w-12 h-12 leading-3">
		<svelte:component this={item.icon} class="size-4 mx-auto muted-foreground hover:bg-muted" />
		{item.name}
	</button>
{:else}
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
{/if}
