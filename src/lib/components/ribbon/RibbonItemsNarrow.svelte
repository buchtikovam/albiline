<script lang="ts">
	import { ribbonAction, ribbonOpen } from '$lib/runes/ribbon.svelte';
	import type { RibbonItem } from '$lib/types/components/ribbon/ribbon';
	import * as Tooltip from '$lib/components/ui/tooltip';

	interface Props {
		ribbonItems: RibbonItem[];
	}

	let { ribbonItems }: Props = $props();
</script>



{#if ribbonOpen.value === true}
	<div class="w-[60px] min-w-[60px]">
		{#each ribbonItems as ribbonItem}
			{@const Icon = ribbonItem.icon}
			<button
				class="text-[10px] flex text-muted-foreground rounded hover:bg-muted/70"
				onclick={() => ribbonAction.value = ribbonItem.action}
			>
				<Icon class="size-4 mx-auto muted-foreground" />
				{ribbonItem.translation()}
				{'components.ribbon.' + ribbonItem.field}
			</button>
		{/each}
	</div>
{:else}
	{#each ribbonItems as ribbonItem}
		<Tooltip.Root delayDuration={800}>
			<Tooltip.Trigger class="min-w-5 mx-0.5 mt-auto">
				{@const Icon = ribbonItem.icon}
				<button
					class="size-5 pt-1 rounded hover:bg-muted/70"
					onclick={() => ribbonAction.value = ribbonItem.action}
				>
					<Icon class="size-4 mx-auto muted-foreground" />
				</button>
			</Tooltip.Trigger>

			<Tooltip.Content>
				{'components.ribbon.' + ribbonItem.field}
			</Tooltip.Content>
		</Tooltip.Root>
	{/each}
{/if}
