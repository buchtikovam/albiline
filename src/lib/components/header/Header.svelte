<script lang="ts">
	import { disableNavigationRune, openedTabsRune } from '$lib/runes-global/navigation.svelte.js';
	import { page } from '$app/stores';
	import { slide } from 'svelte/transition';
	import { goto, preloadData } from '$app/navigation';
	import { get } from 'svelte/store';
	import Home from 'lucide-svelte/icons/home';
	import Menu from 'lucide-svelte/icons/menu';
	import type { HeaderTab } from '$lib/types/components/sidebar/sidebar';
	import MobileSidebar from '../sidebar/mobile/MobileSidebar.svelte';
	import TabSeparator from '../tabs/TabSeparator.svelte';
	import Avatar from '$lib/components/avatar/Avatar.svelte';
	import Input from '../ui/input/input.svelte';
	import X from 'lucide-svelte/icons/x';
	import * as Tabs from '$lib/components/ui/tabs';
	import { getTabValue } from '$lib/utils/navigation/getTabValue';
	import { deleteTab } from '$lib/utils/navigation/deleteTab.svelte';
	import { fulltextFilterValue, showFulltextSearch } from '$lib/runes-global/page.svelte';

	/*
		Header komponenent s hlavními taby a avatarem
	*/

	let pathName = $state("");

	$effect(() => {
		pathName = getTabValue($page.url.pathname, openedTabsRune.value);
	});

	$inspect(pathName);

	let openMobileSidebar: boolean = $state(false);
</script>



<div
	class="flex justify-between px-4 pt-4 pb-2 md:pt-2 "
>
    <Tabs.Root
		class="hidden w-fit h-fit md:block rounded-md"
		value={pathName}
	>
        <Tabs.List>
            <!-- default tabs ,-->
            <Tabs.Trigger
                value="/"
				disabled={disableNavigationRune.value}
                onclick={() => goto("/")}
			>
                <Home class="w-4 h-4" />
            </Tabs.Trigger>

            <!-- tabs opened by user -->
            {#each openedTabsRune.value as tab}
				<TabSeparator/>
				<!--onmouseenter={() => preloadData(tab.url)}-->
				<button
					class="flex items-center h-8"
					onmouseenter={() => tab.closingState = 'block'}
					onmouseleave={() => tab.closingState = 'hidden'}
				>
					<Tabs.Trigger
						value={tab.url}
						disabled={disableNavigationRune.value && tab.url !== pathName}
						onclick={() => {
							goto(tab.url)
						}}
						onauxclick={(ev) => {
							console.log("aux");
							ev.preventDefault();
							if (ev.button === 1) {
								deleteTab(tab);
							}
						}}
						class="flex h-6 items-center font-bold"
					>
						{'components.sidebar.' + tab.field}
						{#if (tab.closingState === 'block')}
							<span transition:slide={{ axis: "x" }}>
								<X
									strokeWidth={3}
									onclick={() => deleteTab(tab)}
									class={`${tab.closingState} ml-1 text-red-500 size-3.5`}
								/>
							</span>
						{/if}
					</Tabs.Trigger>
				</button>
			{/each}
		</Tabs.List>
	</Tabs.Root>


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
					placeholder={'routes.prodej.zakaznici.fulltext_placeholder'}
					type="text"
					bind:value={fulltextFilterValue.value}
				/>
			</div>
		{/if}

		<Avatar />
	</div>
</div>

<MobileSidebar bind:isOpen={openMobileSidebar}/>
