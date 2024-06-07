<script lang="ts">
	import { ribbonStateStore } from '$lib/stores/ribbonStore';
	import ChevronDown from 'lucide-svelte/icons/chevron-down';
	import * as Tooltip from '$lib/components/ui/tooltip';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';

	export let name: string = 'Item';
	let isOpen: boolean;

	ribbonStateStore.subscribe((data) => {
		isOpen = data;
	});



	export let options: string[] = ['Volba 1', 'Volba 2', 'Volba 3']
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger>

		<Tooltip.Root openDelay={250}>
			<Tooltip.Trigger>
				<div
					class={(isOpen
							? "w-min h-[60px]"
							: "w-[32px] h-[32px]")
							+ " p-2 rounded-md flex content-center items-center mx-auto text-muted-foreground hover:bg-muted/70"
						}
				>
					<button
						class={(isOpen
							? "text-[11px] gap-1 leading-3 content-start"
							: "text-xs content-center m-auto")
							+ " flex flex-col items-center"
						}
					>
						<slot />
						{isOpen ? name : ""}
					</button>
				</div>
			</Tooltip.Trigger>
			<Tooltip.Content class={isOpen ? "hidden" : "mt-20"}>
				<div class="flex items-center gap-1">
					{name}
					<ChevronDown class="h-3 w-3" />
				</div>
			</Tooltip.Content>
		</Tooltip.Root>

	</DropdownMenu.Trigger>
	<DropdownMenu.Content class="w-fit p-1">
		{#each options as option}
			<DropdownMenu.Item class="text-xs w-full">
				{option}
			</DropdownMenu.Item>
		{/each}
	</DropdownMenu.Content>
</DropdownMenu.Root>
