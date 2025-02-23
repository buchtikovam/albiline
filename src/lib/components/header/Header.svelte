<script lang="ts">
	import { fulltextFilterValue, showFulltextSearch } from '$lib/runes/page.svelte';
	import Menu from 'lucide-svelte/icons/menu';
	import Avatar from '$lib/components/avatar/Avatar.svelte';
	import Input from '../ui/input/input.svelte';
	import MobileSidebar from '../sidebar/mobile/MobileSidebar.svelte';
	import HeaderTabs from "$lib/components/header/HeaderTabs.svelte";
	import * as m from '$lib/paraglide/messages.js'

	let openMobileSidebar: boolean = $state(false);
</script>



<div
	class="flex justify-between px-4 pt-4 pb-2 md:pt-2 "
>
	<HeaderTabs/>

	<div
		class="flex justify-between items-center w-full md:block my-auto h-[32px] md:w-min md:p-0"
	>
		<!-- mobile menu sidebar button -->
		<button
			onclick={() => openMobileSidebar = true}
			class="rounded-md bg-albi-500 min-w-[32px] size-[32px] md:hidden"
		>
			<Menu class="size-5 m-1 mx-auto text-slate-50"/>
		</button>

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

		<Avatar />
	</div>
</div>


<MobileSidebar
	bind:isOpen={openMobileSidebar}
/>
