<script lang="ts">
	import { ribbonAction, ribbonOpen } from '$lib/runes/ribbon.svelte';
	import * as Tooltip from '$lib/components/ui/tooltip';
	import type {RibbonItemType} from "$lib/types/components/ribbon/ribbon";

	let { ribbonItem }: {
		ribbonItem: RibbonItemType;
	} = $props();
</script>



{#if ribbonOpen.value}
	{@const Icon = ribbonItem.icon}
	<button
		class="text-[10px] text-albi-950 hover:text-black min-w-11 w-11 h-11 line-clamp-2 rounded hover:bg-muted/70 leading-none overflow-visible"
		onclick={() => {
			ribbonAction.value = ribbonItem.action;
		}}
	>
		<Icon class="size-4 mx-auto muted-foreground" />
		{ribbonItem.translation()}
	</button>
{:else}
	<Tooltip.Root >
		<Tooltip.Trigger
			class="w-5 min-w-5 hover:bg-muted/70 hover:text-black"
			onclick={() => {
				ribbonAction.value = ribbonItem.action
			}}
		>
			{@const Icon = ribbonItem.icon}

			<Icon class="size-4 mx-auto muted-foreground" />
		</Tooltip.Trigger>

		<Tooltip.Content side="top">
			{ ribbonItem.translation() }
		</Tooltip.Content>
	</Tooltip.Root>
{/if}
