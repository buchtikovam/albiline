<script lang="ts">
	import {activePageTab, disableNavigation, openedTabs} from "$lib/runes/navigation.svelte";
	import {i18n} from '$lib/i18n.js'
	import {page} from "$app/state";
	import {deleteTab} from '$lib/utils/navigation/deleteTab.svelte';
	import {slide} from 'svelte/transition';
	import {goto} from '$app/navigation';
	import Home from 'lucide-svelte/icons/home';
	import X from 'lucide-svelte/icons/x';
	import TabSeparator from '../tabs/TabSeparator.svelte';
	import * as Tabs from '$lib/components/ui/tabs';
	import {languageTag} from "$lib/paraglide/runtime";
	import {allItems} from "$lib/definitions/components/sidebar/sidebar";
	import deepcopy from "deepcopy";
	import {getSidebarItemByField} from "$lib/utils/components/sidebar/getSidebarItemByField";


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
		if (languageTag()) {
			openedTabs.value.forEach((tab) => {
				const foundTab = getSidebarItemByField(deepcopy(allItems), tab.field)

				if (foundTab) {
					tab.label = foundTab.translation();
				}
			})
		}
	})
</script>



<Tabs.Root
	class="hidden w-fit h-fit md:block rounded-md"
	value={pathName}
>
	<Tabs.List>
		<Tabs.Trigger
			value="/"
			disabled={disabled}
			onclick={() => goto(i18n.resolveRoute("/"))}
		>
			<Home class="size-4" />
		</Tabs.Trigger>

		{#each openedTabs.value as tab}
			<TabSeparator/>

			<Tabs.Trigger
				value={i18n.resolveRoute(tab.url)}
				disabled={disabled && tab.url !== pathName}
				onmouseenter={() => tab.closingState = 'block'}
				onmouseleave={() => tab.closingState = 'hidden'}
				onclick={(ev) => {
					ev.preventDefault();
					goto(i18n.resolveRoute(tab.url));
				}}
				onauxclick={(ev) => {
					ev.preventDefault();
					checkActiveTab();
					if (ev.button === 1) {
						deleteTab(tab);
					}
				}}
				class="flex h-6 items-center font-bold"
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
