<script lang="ts">
	import {ribbonItems} from '$lib/definitions/components/ribbon/ribbon';
	import {ribbonOpen, visibleRibbonItems} from '$lib/runes/ribbon.svelte';
	import {Separator} from '$lib/components/ui/separator';
	import {filterRibbonItems} from '$lib/utils/components/ribbon/filterRibbonItems';
	import {RibbonTypeEnum} from '$lib/enums/ribbon/ribbonType';
	import ChevronDown from 'lucide-svelte/icons/chevron-down';
	import ChevronUp from 'lucide-svelte/icons/chevron-up';
	import type {RibbonType} from '$lib/types/components/ribbon/ribbon';
	import RibbonDropdownItem from '$lib/components/ribbon/RibbonItemDropdown.svelte';
	import RibbonItemsNarrow from '$lib/components/ribbon/RibbonItemsNarrow.svelte';
	import RibbonItem from '$lib/components/ribbon/RibbonItem.svelte';


	let filteredRibbonItems: RibbonType = $state([])

	$effect(() => {
		visibleRibbonItems.value.length > 0
			? filteredRibbonItems = filterRibbonItems(ribbonItems, visibleRibbonItems.value)
			: filteredRibbonItems = ribbonItems;
	})
</script>



<div class={`
	 flex-none ${ribbonOpen.value ? "h-[60px]" : "h-8"} px-1 rounded-md bg-white flex border border-slate-300 justify-between transition-all duration-200 ease-linear
`}>
	<div class="flex gap-0.5 items-center w-full overflow-x-auto">
		{#each filteredRibbonItems as ribbonItem}
			{#if Array.isArray(ribbonItem)}
				<RibbonItemsNarrow
					ribbonItems={ribbonItem}
				/>
			{:else}
				{#if ribbonItem.type === RibbonTypeEnum.ITEM}
					<RibbonItem
						ribbonItem={ribbonItem}
					/>
				{/if}

				{#if ribbonItem.type === RibbonTypeEnum.DROPDOWN}
					<RibbonDropdownItem
						ribbonItem={ribbonItem}
					/>
				{/if}

				{#if ribbonItem.type === RibbonTypeEnum.SEPARATOR}
					<Separator orientation="vertical" class={
						(ribbonOpen.value
							? "min-h-[20px] "
							: "min-h-[12px] ")
							+ "mx-1.5 md:mx-2 bg-slate-200 w-[2px] transition-all duration-200 ease-linear"
						}
					/>
				{/if}
			{/if}
		{/each}
	</div>


	<button
		onclick={() => ribbonOpen.value = !ribbonOpen.value}
		class="overflow-visible w-6 flex justify-center items-center"
	>
		{#if ribbonOpen.value}
			<ChevronUp
				strokeWidth="3"
				class="size-4 bg-background text-albi-500"
			/>
		{:else}
			<ChevronDown
				strokeWidth="3"
				class="size-4 bg-background text-albi-500"
			/>
		{/if}
	</button>
</div>
