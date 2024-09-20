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
		class="text-[10px] text-albi-950 hover:text-black min-w-11 w-11 h-11 rounded hover:bg-muted/80 leading-none overflow-visible"
		on:click={setRibbonAction}
	>
		<svelte:component this={ribbonItem.icon} class="size-4 mx-auto muted-foreground" />
		{ribbonItem.name}
	</button>
{:else}
	<Tooltip.Root openDelay={800}>
		<Tooltip.Trigger class="mt-auto min-w-5 w-5 mx-0.5 md:p-0">
			<button
				class="w-5 h-5 flex items-center rounded hover:bg-muted/80 text-albi-950 hover:text-black"
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
