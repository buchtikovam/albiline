<script lang="ts">
	import { ribbonActionStore } from '$lib/stores/ribbonStore';
	import type { RibbonItem } from '$lib/types/ribbon/ribbon';
	import type { RibbonAction } from '$lib/enums/ribbonAction';
	import * as Tooltip from '$lib/components/ui/tooltip';

	export let ribbonItems: RibbonItem[];
	export let isRibbonOpen: boolean = true;


	function setRibbonAction(action: RibbonAction | undefined) {
		if (action) {
			ribbonActionStore.set(action);
		}
	}
</script>



{#if isRibbonOpen === true}
	<div class="w-[60px] min-w-[60px]">
		{#each ribbonItems as ribbonItem}
			<button
				class="text-[10px] flex text-muted-foreground rounded hover:bg-muted/70"
				on:click={() => setRibbonAction(ribbonItem.action)}
			>
				<svelte:component
					this={ribbonItem.icon}
					class="mr-1 size-3.5 muted-foreground"
				/>
				{ribbonItem.name}
			</button>
		{/each}
	</div>
{:else}
	{#each ribbonItems as ribbonItem}
		<Tooltip.Root openDelay={250}>
			<Tooltip.Trigger class="min-w-5 mx-0.5 mt-auto">
				<button
					class="size-5 pt-1 rounded hover:bg-muted/70"
					on:click={() => setRibbonAction(ribbonItem.action)}
				>
					<svelte:component
						this={ribbonItem.icon}
						class="size-4 mx-auto muted-foreground"
					/>
				</button>
			</Tooltip.Trigger>

			<Tooltip.Content class="mt-20">
				{ribbonItem.name}
			</Tooltip.Content>
		</Tooltip.Root>
	{/each}
{/if}
