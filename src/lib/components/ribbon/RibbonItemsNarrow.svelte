<script lang="ts">
	import { ribbonStateStore } from '$lib/stores/ribbonStore';
	import type { ComponentType } from 'svelte';
	import type { Icon } from 'lucide-svelte';
	import Brackets from 'lucide-svelte/icons/brackets';
	import * as Tooltip from '$lib/components/ui/tooltip';

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

	let isOpen: boolean;

	ribbonStateStore.subscribe((data) => {
		isOpen = data;
	});
</script>


<div class={isOpen ? "flex flex-col self-center pr-1" : ""}>
{#each items as item}
	<Tooltip.Root openDelay={250}>
		<Tooltip.Trigger>
			<div
				class={
					(isOpen
						? "w-full h-fit"
						: "p-2 w-[32px] h-[32px]")
						+ " rounded-md flex content-center items-center mx-auto text-muted-foreground hover:bg-muted/70"}
			>
				<button class={isOpen
					? "text-[11px] flex gap-2 items-center"
					: "text-xs flex flex-col content-center items-center m-auto"}
				>
					{#if isOpen}
						<svelte:component this={item.icon} class="h-3.5 w-3.5 muted-foreground hover:bg-muted/70" />
						{item.name}
					{:else}
						<svelte:component this={item.icon} class="h-4 w-4 muted-foreground hover:bg-muted/70" />
					{/if}

				</button>
			</div>
		</Tooltip.Trigger>
		<Tooltip.Content class={isOpen ? "hidden" : "mt-20"}>
			{item.name}
		</Tooltip.Content>
	</Tooltip.Root>
{/each}
</div>
