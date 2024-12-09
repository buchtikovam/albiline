<script lang="ts">
	import { ribbonActionStore } from '$lib/runes-global/ribbonStore';
	import type { RibbonItem } from '$lib/types/components/ribbon/ribbon';
	import type { RibbonActionEnum } from '$lib/enums/ribbon/ribbonAction';
	import * as Tooltip from '$lib/components/ui/tooltip';

	interface Props {
		ribbonItems: RibbonItem[];
		isRibbonOpen?: boolean;
	}

	let { ribbonItems, isRibbonOpen = true }: Props = $props();


	function setRibbonAction(action: RibbonActionEnum | undefined) {
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
				onclick={() => setRibbonAction(ribbonItem.action)}
			>
				<ribbonItem.icon
					class="mr-1 size-3.5 muted-foreground"
				/>
				{'components.ribbon.' + ribbonItem.field}
			</button>
		{/each}
	</div>
{:else}
	{#each ribbonItems as ribbonItem}
		<Tooltip.Root openDelay={800}>
			<Tooltip.Trigger class="min-w-5 mx-0.5 mt-auto">
				<button
					class="size-5 pt-1 rounded hover:bg-muted/70"
					onclick={() => setRibbonAction(ribbonItem.action)}
				>
					<ribbonItem.icon
						class="size-4 mx-auto muted-foreground"
					/>
				</button>
			</Tooltip.Trigger>

			<Tooltip.Content>
				{'components.ribbon.' + ribbonItem.field}
			</Tooltip.Content>
		</Tooltip.Root>
	{/each}
{/if}
