<script lang="ts">
	import * as Tooltip from '$lib/components/ui/tooltip';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import ChevronDown from 'lucide-svelte/icons/chevron-down';

	export let name: string = 'Item';
	export let isOpen: boolean;
</script>

{#if isOpen}

	<DropdownMenu.Root>
		<DropdownMenu.Trigger>
			<div
				class="p-2 w-min h-[60px] rounded-md flex content-center items-center mx-auto text-muted-foreground hover:bg-muted/50">
				<div class="text-[11px] flex flex-col gap-1 leading-3 content-start items-center">
					<slot />
					<div class="flex">
					{name}
					<ChevronDown class="h-4 w-4" />
					</div>
				</div>
			</div>
		</DropdownMenu.Trigger>
		<DropdownMenu.Content class="w-fit">
			<DropdownMenu.Item class="text-xs">Option 1</DropdownMenu.Item>
			<DropdownMenu.Item class="text-xs">Option 2</DropdownMenu.Item>
			<DropdownMenu.Item class="text-xs">Option 3</DropdownMenu.Item>
		</DropdownMenu.Content>
	</DropdownMenu.Root>
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
