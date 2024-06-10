<script lang="ts">
	import * as Tooltip from '$lib/components/ui/tooltip';
	import type { Item } from '$lib/types/ribbon';
	import { ribbonActionStore } from '$lib/stores/ribbonStore';

	export let item: Item;
	export let isOpen: boolean = false;

	function setAction() {
		if (item.action) {
			ribbonActionStore.set(item.action)
		}
	}
</script>

{#if isOpen === true}
	<button
		class="text-[10px] min-w-11 w-11 h-12 rounded hover:bg-muted/70 leading-3 overflow-visible"
		on:click={setAction}
	>
		<svelte:component this={item.icon} class="size-4 mx-auto muted-foreground" />
		{item.name}
	</button>
{:else}
	<Tooltip.Root openDelay={250}>
		<Tooltip.Trigger>
			<button
				class="size-6 rounded hover:bg-muted/70"
				on:click={setAction}
			>
				<svelte:component this={item.icon} class="size-4 mx-auto muted-foreground" />
			</button>
		</Tooltip.Trigger>

		<Tooltip.Content class="mt-20">
			{item.name}
		</Tooltip.Content>
	</Tooltip.Root>
{/if}
