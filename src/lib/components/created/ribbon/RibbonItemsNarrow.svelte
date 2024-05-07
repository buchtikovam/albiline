<script lang="ts">
	import * as Tooltip from '$lib/components/ui/tooltip';
	import type { ComponentType } from 'svelte';
	import type { Icon } from 'lucide-svelte';
	import Brackets from 'lucide-svelte/icons/brackets';
	import { RibbonStateStore } from '$lib/components/stores/store';

	type Item = {
		name: string;
		icon: ComponentType<Icon>;
	}

	export let items: Item[] = [
		{
			name: 'Položka 1',
			icon: Brackets
		},
		{
			name: 'Položka 2',
			icon: Brackets
		},
		{
			name: 'Položka 3',
			icon: Brackets
		}
	];

	let isOpen: unknown;

	RibbonStateStore.subscribe((data) => {
		isOpen = data
	})
</script>

	{#if isOpen === "true"}
	<div class="flex flex-col self-center pr-1">
		{#each items as item}
			<div
				class="p-0.5 w-full h-fit rounded-md flex content-center items-center mx-auto text-muted-foreground hover:bg-muted/50">
				<button class="text-[11px] flex gap-2 items-center">

					<svelte:component this={item.icon} class="h-3.5 w-3.5 muted-foreground hover:bg-muted/50" />
					{item.name}
				</button>
			</div>

		{/each}
	</div>

{:else}
	{#each items as item}
		<Tooltip.Root openDelay={250}>
			<Tooltip.Trigger>
				<div
					class="p-2 w-[32px] h-[32px] rounded-md flex content-center items-center mx-auto text-muted-foreground hover:bg-muted/50">
					<button class="text-xs flex flex-col content-center items-center m-auto">
						<svelte:component this={item.icon} class="h-3.5 w-3.5 muted-foreground hover:bg-muted/50" />
					</button>
				</div>
			</Tooltip.Trigger>
			<Tooltip.Content class="mt-20">{item.name}</Tooltip.Content>
		</Tooltip.Root>
	{/each}
{/if}
