<script lang="ts">
	import { ribbonOpenStore } from '$lib/stores/ribbonStore';
	import { RibbonTypeEnum } from '$lib/enums/ribbon/ribbonType';
	import { ribbonItems } from '$lib/data/ribbon';
	import { Separator } from '$lib/components/ui/separator';
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';
	import RibbonDropdownItem from '$lib/components/ribbon/RibbonItemDropdown.svelte';
	import RibbonItemsNarrow from '$lib/components/ribbon/RibbonItemsNarrow.svelte';
	import ChevronDown from 'lucide-svelte/icons/chevron-down';
	import RibbonItem from '$lib/components/ribbon/RibbonItem.svelte';
	import ChevronUp from 'lucide-svelte/icons/chevron-up';

	/*
		Resizable ribbon container obsahující různé ribbon items
	*/

	let isRibbonOpen: boolean = false;

	function toggleRibbonOpen() {
		isRibbonOpen = !isRibbonOpen;
		ribbonOpenStore.set(isRibbonOpen)
	}

	onMount(() => {
		isRibbonOpen = get(ribbonOpenStore)
	})
</script>



<div class="
	mx-4 mb-2 p-1.5 items-center rounded-lg bg-white overflow-auto 
	md:mx-2 md:my-0 md:p-2 md:mr-4 flex
">
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
				<Separator orientation="vertical" class={
					(isRibbonOpen 
						? "h-[20px]" 
						: "h-[14px]")
						+ " mx-1 md:mx-2.5 bg-albi-200 w-[2px]"
					}
				/>
			{/if}
		{/if}
	{/each}
	
	<button 
		on:click={toggleRibbonOpen} 
		class={
			(isRibbonOpen 
				? "top-[88px]" 
				: "top-[66px]") 
				+ " absolute right-0 hidden md:block"
			}
	>
		{#if isRibbonOpen}
			<ChevronDown class="h-4 w-4 mr-5 bg-background" />
		{:else}
			<ChevronUp class="h-4 w-4 mr-5 bg-background" />
		{/if}
	</button>
</div>
