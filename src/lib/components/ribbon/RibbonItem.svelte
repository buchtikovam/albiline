<script lang="ts">
	import { ribbonStateStore } from '$lib/stores/store';
	import * as Tooltip from '$lib/components/ui/tooltip';

	export let name: string = 'Item';

	let isOpen: boolean;

	ribbonStateStore.subscribe((data) => {
		isOpen = data;
	});
</script>

<Tooltip.Root openDelay={250}>
	<Tooltip.Trigger>
		<div
			class={
				(isOpen
						? "w-min h-[60px] min-w-[55px]"
						: "w-[32px] h-[32px]")
						+ " p-2 rounded-md flex content-center items-center mx-auto text-muted-foreground hover:bg-muted/50"
			}
		>
			<button
				class={
					(isOpen
						? "text-[11px] gap-1 leading-3"
						: "text-xs")
						+ " flex flex-col content-center items-center m-auto"
				}
			>
				<slot />
				{isOpen ? name : ""}
			</button>
		</div>
	</Tooltip.Trigger>
	<Tooltip.Content class={isOpen ? "hidden" : "mt-20"}>{name}</Tooltip.Content>
</Tooltip.Root>
