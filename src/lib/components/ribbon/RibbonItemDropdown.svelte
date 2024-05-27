<script lang="ts">
	import { ribbonStateStore } from '$lib/stores/store';
	import ChevronDown from 'lucide-svelte/icons/chevron-down';
	import * as Tooltip from '$lib/components/ui/tooltip';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';

	export let name: string = 'Item';
	let isOpen: boolean;

	ribbonStateStore.subscribe((data) => {
		isOpen = data;
	});

	type Option = {
		name: string;
		state: boolean;
	};

	export let options: Option[] = [
		{
			name: 'Volba 1',
			state: false
		},
		{
			name: 'Volba 2',
			state: false
		},
		{
			name: 'Volba 3',
			state: false
		}
	];
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger>

		<Tooltip.Root openDelay={250}>
			<Tooltip.Trigger>
				<div
					class={isOpen
							? "p-2 w-min h-[60px] rounded-md flex content-center items-center mx-auto text-muted-foreground hover:bg-muted/70"
							: "p-2 w-[32px] h-[32px] rounded-md flex content-center items-center mx-auto text-muted-foreground hover:bg-muted/70"}
				>
					<button class={isOpen
							? "text-[11px] flex flex-col gap-1 leading-3 content-start items-center"
							: "text-xs flex flex-col content-center items-center m-auto"}
					>
						<!--{#if isOpen}-->
						<!--							<div class="flex items-center">-->
						<slot />
						<!--								<ChevronDown class="w-2.5 h-2.5 "/>-->
						<!--							</div>-->
						<!--						{:else}-->
						<!--							<slot />-->
						<!--{/if}-->

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
				{option.name}
			</DropdownMenu.Item>
		{/each}
	</DropdownMenu.Content>
</DropdownMenu.Root>
