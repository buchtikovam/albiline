<script lang="ts">
	import * as Tooltip from "$lib/components/ui/tooltip";
	import { ribbonStateStore } from '$lib/stores/store';
	export let name: string = 'Item';

	let isOpen: unknown;

	ribbonStateStore.subscribe((data) => {
		isOpen = data
	})
</script>

{#if isOpen === "true"}
	<div
		class="p-2 w-min h-[60px] rounded-md flex content-center items-center mx-auto text-muted-foreground hover:bg-muted/50">
		<button class="text-[11px] flex flex-col gap-1 leading-3 content-center items-center m-auto">
			<slot />
			{name}
		</button>
	</div>
{:else}
	<Tooltip.Root openDelay={250}>
		<Tooltip.Trigger>
			<div
				class="p-2 w-[32px] h-[32px] rounded-md flex content-center items-center mx-auto text-muted-foreground hover:bg-muted/50">
				<button class="text-xs flex flex-col content-center items-center m-auto">
					<slot />
				</button>
			</div>
		</Tooltip.Trigger>
		<Tooltip.Content class="mt-20">{name}</Tooltip.Content>
	</Tooltip.Root>
{/if}
