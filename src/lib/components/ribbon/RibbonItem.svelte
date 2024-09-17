<script lang="ts">
	import { ribbonActionStore } from '$lib/stores/ribbonStore';
	import type { RibbonItem } from '$lib/types/ribbon/ribbon';
	import * as Tooltip from '$lib/components/ui/tooltip';

	export let ribbonItem: RibbonItem;
	export let isRibbonOpen: boolean = true;


	function setRibbonAction() {
		if (ribbonItem.action) {
			ribbonActionStore.set(ribbonItem.action);
		}
	}
</script>



{#if isRibbonOpen === true}
	<button
		class="text-[9px] min-w-10 w-10 h-11 rounded hover:bg-muted/70 leading-none overflow-visible"
		on:click={setRibbonAction}
	>
		<svelte:component this={ribbonItem.icon} class="size-4 mx-auto muted-foreground" />
		{ribbonItem.name}
	</button>
{:else}
	<Tooltip.Root openDelay={250}>
		<Tooltip.Trigger class="mt-auto min-w-5 mx-0.5 p-1 md:p-0">
			<button
				class="w-5 h-5 flex items-center rounded hover:bg-muted/70"
				on:click={setRibbonAction}
			>
				<svelte:component this={ribbonItem.icon} class="size-4 mx-auto muted-foreground" />
			</button>
		</Tooltip.Trigger>

		<Tooltip.Content class="mt-16">
			{ribbonItem.name}
		</Tooltip.Content>
	</Tooltip.Root>
{/if}
