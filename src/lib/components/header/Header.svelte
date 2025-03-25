<script lang="ts">
	import { fulltextFilterValue, showFulltextSearch } from '$lib/runes/page.svelte';
	import HeaderTabs from "$lib/components/header/HeaderTabs.svelte";
	import Input from '../ui/input/input.svelte';
	import * as m from '$lib/paraglide/messages.js'
</script>



<div
	class="h-8 "
>
	<HeaderTabs/>

	<div
		class="flex justify-between items-center w-full md:block my-auto h-[32px] md:w-min md:p-0"
	>
		<!-- mobile fulltext search -->
		{#if showFulltextSearch.value === true}
			<div class="md:hidden w-full px-2">
				<Input
					class="h-[32px] rounded-md border-none focus-visible:ring-0"
					placeholder={m.components_header_search_placeholder()}
					type="text"
					bind:value={fulltextFilterValue.value}
				/>
			</div>
		{/if}
	</div>
</div>
