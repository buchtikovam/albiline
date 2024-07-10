<script lang="ts">
	import { ribbonActionStore } from '$lib/stores/ribbonStore';
	import type { Item } from '$lib/types/ribbon/ribbon';
	import * as Tooltip from '$lib/components/ui/tooltip';

	export let ribbonItem: Item;
	export let isRibbonOpen: boolean = true;


	function setRibbonAction() {
		if (ribbonItem.action) {
			ribbonActionStore.set(ribbonItem.action);
		}
	}
</script>



{#if isRibbonOpen === true}
	<button
		class="text-[10px] min-w-11 w-11 h-12 rounded hover:bg-muted/70 leading-3 overflow-visible"
		on:click={setRibbonAction}
	>
		<svelte:component this={ribbonItem.icon} class="size-4 mx-auto muted-foreground" />
		{ribbonItem.name}
	</button>
{:else}
	<Tooltip.Root openDelay={250}>
		<Tooltip.Trigger class="mt-auto min-w-5 mx-0.5">
			<button
				class="w-5 rounded hover:bg-muted/70"
				on:click={setRibbonAction}
			>
				<svelte:component this={ribbonItem.icon} class="size-4 mx-auto muted-foreground" />
			</button>
		</Tooltip.Trigger>

		<Tooltip.Content class="mt-20">
			{ribbonItem.name}
		</Tooltip.Content>
	</Tooltip.Root>
{/if}
