<script lang="ts">
	import { ribbonItems } from '$lib/data/page-components/ribbon';
	import { ribbonOpen, visibleRibbonItems } from '$lib/runes/ribbon.svelte';
	import { Separator } from '$lib/components/ui/separator';
	import { RibbonTypeEnum } from '$lib/enums/ribbon/ribbonType';
	import ChevronDown from 'lucide-svelte/icons/chevron-down';
	import ChevronUp from 'lucide-svelte/icons/chevron-up';
	import RibbonDropdownItem from '$lib/components/ribbon/RibbonItemDropdown.svelte';
	import RibbonItemsNarrow from '$lib/components/ribbon/RibbonItemsNarrow.svelte';
	import RibbonItem from '$lib/components/ribbon/RibbonItem.svelte';
	import type { RibbonType } from '$lib/types/components/ribbon/ribbon';
	import { filterRibbonItems } from '$lib/utils/components/ribbon/filterRibbonItems';


	let filteredRibbonItems: RibbonType = $state([])

	$effect(() => {
		visibleRibbonItems.value.length > 0
			? filteredRibbonItems = filterRibbonItems(ribbonItems, visibleRibbonItems.value)
			: filteredRibbonItems = ribbonItems;
	})
</script>



<div class={`
	${ribbonOpen.value ? "h-[58px]" : "h-8"} mx-4 mb-2 p-1.5 rounded-lg bg-white flex justify-between
	md:mx-2 md:my-0 md:p-2 md:mr-4 transition-all duration-300
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
							? "min-h-[20px]"
							: "min-h-[12px]")
							+ " mx-1.5 md:mx-2.5 bg-albi-200 w-[2px]"
						}
					/>
				{/if}
			{/if}
		{/each}
	</div>


	<button
		onclick={() => ribbonOpen.value = !ribbonOpen.value}
		class="overflow-visible"
	>
		{#if ribbonOpen.value}
			<ChevronDown class="size-4 bg-background text-albi-500" />
		{:else}
			<ChevronUp class="size-4 bg-background text-albi-500" />
		{/if}
	</button>
</div>
