<script lang="ts">
	import ChevronDown from 'lucide-svelte/icons/chevron-down';
	import ChevronUp from 'lucide-svelte/icons/chevron-up';
	import { ribbonStateStore } from '$lib/stores/ribbonStore';
	import { ribbonItems } from '$lib/data/ribbon';
	import RibbonItem from '$lib/components/ribbon/RibbonItem.svelte';
	import RibbonDropdownItem from '$lib/components/ribbon/RibbonItemDropdown.svelte';
	import RibbonItemsNarrow from '$lib/components/ribbon/RibbonItemsNarrow.svelte';
	import type { Item } from '$lib/types/ribbon';
	import { RibbonType } from '$lib/enums/ribbonType';
	import { Separator } from '$lib/components/ui/separator';


	let isOpen: boolean;

	// TODO: save updated data on ribbon item click

	ribbonStateStore.subscribe((data) => {
		isOpen = data;
	});

	function toggleOpen() {
		ribbonStateStore.update(() => !isOpen);
	}


</script>
<div class="flex p-2 px-4">
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
				<Separator orientation="vertical" class="mx-2"/>
			{/if}
		{/if}
	{/each}
</div>


<div
	class={
		(isOpen
			? "mt-[91px]"
			: "mt-[67px]")
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

