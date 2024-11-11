<script lang="ts">
	import { ribbonActionStore } from '$lib/stores/ribbonStore';
	import { _ } from 'svelte-i18n'
	import type { RibbonItem } from '$lib/types/components/ribbon/ribbon';
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
		{$_('components.ribbon.' + ribbonItem.field)}
	</button>
{:else}
	<Tooltip.Root openDelay={800}>
		<Tooltip.Trigger class="w-5 min-w-5">
			<svelte:component this={ribbonItem.icon} class="size-4 mx-auto muted-foreground" />
		</Tooltip.Trigger>

		<Tooltip.Content>
			{$_('components.ribbon.' + ribbonItem.field)}
		</Tooltip.Content>
	</Tooltip.Root>
{/if}
