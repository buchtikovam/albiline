<script lang="ts">
	import ChevronDown from 'lucide-svelte/icons/chevron-down';
	import ChevronUp from 'lucide-svelte/icons/chevron-up';
	import { RibbonTypeEnum } from '$lib/enums/ribbon/ribbonType';
	import { ribbonItems } from '$lib/data/ribbon';
	import { Separator } from '$lib/components/ui/separator';
	import RibbonItem from '$lib/components/ribbon/RibbonItem.svelte';
	import RibbonDropdownItem from '$lib/components/ribbon/RibbonItemDropdown.svelte';
	import RibbonItemsNarrow from '$lib/components/ribbon/RibbonItemsNarrow.svelte';


	/*
		Resizable ribbon container obsahující různé ribbon items
	*/

	let isRibbonOpen: boolean = true;

	function toggleRibbonOpen() {
		isRibbonOpen = !isRibbonOpen;
	}
</script>



<div class="ribbon mx-4 mt-2 p-0.5 md:mx-2 md:my-0 md:p-1 flex items-center rounded-lg bg-white border border-albi-200 overflow-auto">
	{#each ribbonItems as ribbonItem}
		{#if Array.isArray(ribbonItem)}
			<RibbonItemsNarrow
				ribbonItems={ribbonItem}
				isRibbonOpen={isRibbonOpen}
			/>
		{:else}
			{#if ribbonItem.type === RibbonTypeEnum.ITEM}
				<RibbonItem
					ribbonItem={ribbonItem}
					isRibbonOpen={isRibbonOpen}
				/>
			{/if}

			{#if ribbonItem.type === RibbonTypeEnum.DROPDOWN}
				<RibbonDropdownItem
					ribbonItem={ribbonItem}
					isRibbonOpen={isRibbonOpen}
				/>
			{/if}

			{#if ribbonItem.type === RibbonTypeEnum.SEPARATOR}
				<Separator orientation="vertical" class="mx-1 md:mx-2.5 bg-border h-[20px]" />
			{/if}
		{/if}
	{/each}
	
	<button 
		on:click={toggleRibbonOpen} 
		class={(isRibbonOpen ? "top-[88px]" : "top-[66px]") + " absolute right-0"}
	>
		{#if isRibbonOpen}
			<ChevronDown class="h-4 w-4 bg-background" />
		{:else}
			<ChevronUp class="h-4 w-4 bg-background" />
		{/if}
	</button>
</div>



<style>
	@media (max-width: 768px) {
		.ribbon::-webkit-scrollbar {
			display: none;
		}
	}
</style>