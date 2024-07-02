<script lang="ts">
	import ChevronDown from 'lucide-svelte/icons/chevron-down';
	import ChevronUp from 'lucide-svelte/icons/chevron-up';
	import { RibbonType } from '$lib/enums/ribbonType';
	import { ribbonStateStore } from '$lib/stores/ribbonStore';
	import { ribbonItems } from '$lib/data/ribbon';
	import { Separator } from '$lib/components/ui/separator';
	import RibbonItem from '$lib/components/ribbon/RibbonItem.svelte';
	import RibbonDropdownItem from '$lib/components/ribbon/RibbonItemDropdown.svelte';
	import RibbonItemsNarrow from '$lib/components/ribbon/RibbonItemsNarrow.svelte';

	let isOpen: boolean = true;

	function toggleOpen() {
		isOpen = !isOpen;
	}
</script>

<div class="flex p-2 px-4 overflow-auto border-t-none">
	{#each ribbonItems as item}
		{#if Array.isArray(item)}
			<RibbonItemsNarrow item={item} isOpen={isOpen} />
		{:else}
			{#if item.type === RibbonType.ITEM}
				<RibbonItem item={item} isOpen={isOpen} />
			{/if}
			{#if item.type === RibbonType.DROPDOWN}
				<RibbonDropdownItem item={item} isOpen={isOpen} />
			{/if}
			{#if item.type === RibbonType.SEPARATOR}
				<Separator orientation="vertical" class="mx-2" />
			{/if}
		{/if}
	{/each}
</div>

<div
	class={
		(isOpen
			? "mt-[88px]"
			: "mt-[66px]")
			+ " absolute w-full flex justify-end items-center"
	}
>
	<button on:click={toggleOpen}>
		{#if isOpen}
			<ChevronDown class="h-4 w-4 bg-background" />
		{:else}
			<ChevronUp class="h-4 w-4 bg-background" />
		{/if}
	</button>
</div>
