<script lang="ts">
	import {activePageTab, disableNavigation, openedTabs} from "$lib/runes/navigation.svelte";
	import {allItems} from "$lib/definitions/components/sidebar/sidebar";
	import {page} from "$app/state";
	import {getSidebarItemByField} from "$lib/utils/components/sidebar/getSidebarItemByField";
	import {getLocale, localizeHref} from "$lib/paraglide/runtime";
	import deepcopy from "deepcopy";
	import {deleteTab} from '$lib/utils/navigation/deleteTab.svelte';
	import {slide} from 'svelte/transition';
	import {goto} from '$app/navigation';
	import Home from 'lucide-svelte/icons/home';
	import X from 'lucide-svelte/icons/x';
	import TabSeparator from '../tabs/TabSeparator.svelte';
	import * as Tabs from '$lib/components/ui/tabs';


	let pathName = $state(page.url.pathname);
	let disabled = $derived(disableNavigation.value);


	function checkActiveTab() {
		pathName = "";

		activePageTab.value.length > 0
			? pathName = activePageTab.value
			: pathName = page.url.pathname;
	}


	$effect(() => {
		activePageTab.value.length > 0
			? pathName = activePageTab.value
			: pathName = page.url.pathname;
	})


	$effect(() => {
		if (getLocale()) {
			openedTabs.value.forEach((tab) => {
				const foundTab = getSidebarItemByField(deepcopy(allItems), tab.field)

				if (foundTab) {
					tab.label = foundTab.translation();
				}
			})
		}
	})
</script>




<div
	class="w-full flex items-center justify-between"
>
	<Tabs.Root
		class="w-full h-8 overflow-auto  md:w-fit mb-2"
		value={pathName}
	>
		<Tabs.List class="h-8 bg-white rounded-md border border-slate-300">
			<Tabs.Trigger
				value="/"
				disabled={disabled}
				onclick={() => goto(localizeHref("/"))}
			>
				<Home
					strokeWidth="2.5"
					class="size-4"
				/>
			</Tabs.Trigger>

			{#each openedTabs.value as tab}
				<TabSeparator/>

				<Tabs.Trigger
					value={localizeHref(tab.url)}
					disabled={disabled && tab.url !== pathName}
					onmouseenter={() => tab.closingState = 'block'}
					onmouseleave={() => tab.closingState = 'hidden'}
					onclick={(ev) => {
						ev.preventDefault();
						goto(localizeHref(tab.url));
					}}
					onauxclick={(ev) => {
						ev.preventDefault();
						checkActiveTab();
						if (ev.button === 1) {
							deleteTab(tab);
						}
					}}
					class="flex items-center font-bold"
				>
					{ tab.label }

					{#if (tab.closingState === 'block')}
						<button transition:slide={{ axis: "x" }}>
							<X
								strokeWidth={3}
								onclick={(e) => {
								e.preventDefault();
								deleteTab(tab);
							}}
								class={`${tab.closingState} ml-1 text-red-600 size-3.5`}
							/>
						</button>
					{/if}
				</Tabs.Trigger>
			{/each}
		</Tabs.List>
	</Tabs.Root>
</div>

