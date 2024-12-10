<script lang="ts">
	import { ribbonActionStore, ribbonOpen } from '$lib/runes/ribbon.svelte';
	import type { RibbonItem } from '$lib/types/components/ribbon/ribbon';
	import * as Tooltip from '$lib/components/ui/tooltip';

	let { ribbonItem }: {
		ribbonItem: RibbonItem;
	} = $props();

	function setRibbonAction() {
		if (ribbonItem.action) {
			ribbonActionStore.set(ribbonItem.action);
		}
	}
</script>



{#if ribbonOpen.value}
	{@const Icon = ribbonItem.icon}
	<button
		class="text-[10px] text-albi-950 hover:text-black min-w-11 w-11 h-11 line-clamp-2 rounded hover:bg-muted/80 leading-none overflow-visible"
		onclick={setRibbonAction}
	>
		<Icon class="size-4 mx-auto muted-foreground" />
		{ribbonItem.translation()}
	</button>
{:else}
	<Tooltip.Root >
		<Tooltip.Trigger class="w-5 min-w-5">
			{@const Icon = ribbonItem.icon}

			<Icon class="size-4 mx-auto muted-foreground" />
		</Tooltip.Trigger>

		<Tooltip.Content side="top">
			{ ribbonItem.translation() }
		</Tooltip.Content>
	</Tooltip.Root>
{/if}
