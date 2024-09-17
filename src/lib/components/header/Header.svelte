<script lang="ts">
	import { editedDataStore } from '$lib/stores/tableStore';
	import { openedTabsStore, allowTabAdding } from '$lib/stores/tabStore';
	import type { HeaderTab } from '$lib/types/sidebar/sidebar';
	import { goto, preloadData } from '$app/navigation';
	import { get } from 'svelte/store';
	import X from 'lucide-svelte/icons/x';
	import Home from 'lucide-svelte/icons/home';
	import Avatar from '$lib/components/avatar/Avatar.svelte';
	import * as Tabs from '$lib/components/ui/tabs';
	import Menu from 'lucide-svelte/icons/menu';
	import { page } from '$app/stores';
	
	/*
	Header komponenent s hlavními taby a avatarem
	*/

	let storedTabs: HeaderTab[];
	openedTabsStore.subscribe(data => storedTabs = data);

	let editedData;
	editedDataStore.subscribe(data => editedData = data);

	$: pathname = getTabValue($page.url.pathname)

	function getTabValue(url :string) {
		let urlLength = url.split('/').length
		
		for (let tab of storedTabs) { 
			if (url === tab.url) {
				return url
			}
		}

 		for (let tab of storedTabs) {
			let tabUrlLength = tab.url.split('/').length;

			// nalezena částečná shoda
			if (url.includes(tab.url)) {
				if (tab.treeDepth === 0 && urlLength > 2 && tabUrlLength === urlLength - 1) {
					return `/${url.split('/').slice(1, -1)[0]}`;
				}

				if (tab.treeDepth === 1 && urlLength > 3 && tabUrlLength === urlLength - 1) {
					return `/${url.split('/').slice(1, -1).join('/')}`;
				}

				if (tab.treeDepth === 2 && urlLength > 4 && tabUrlLength === urlLength - 1) {
					return `/${url.split('/').slice(1, -1).join('/')}`;
				}
			}
		}
	}
	

	function removeTab(tabName: string) {
		storedTabs.forEach((tab) => {
			if (tab.name === tabName) {
				storedTabs.splice(storedTabs.indexOf(tab), 1);
				openedTabsStore.set(storedTabs);
			}
		});
	}

	function showTabClosingButton(tab: HeaderTab) {
		if (get(allowTabAdding)) {
			tab.closingState = 'flex';
			openedTabsStore.update(() => storedTabs);
		}
	}

	function hideTabClosingButton(tab: HeaderTab) {
		tab.closingState = 'hidden';
		openedTabsStore.update(() => storedTabs);
	}
</script>



<div class="
	flex justify-between px-4 pt-2 
	md:pt-2 md:pb-2 md:px-4"
>
    <Tabs.Root class="hidden w-fit h-fit md:block rounded-md " value={pathname}>
        <Tabs.List>
            <!-- Výchozí taby -->
            <Tabs.Trigger
                value="/"
                on:click={() => goto("/")}
                >
                <Home class="w-4 h-4" />
            </Tabs.Trigger>

            <!-- Taby otevřené uživatelem -->
            {#each storedTabs as tab}
            <button
                on:mouseenter={() => preloadData(tab.url)}
                class="flex"
            >
                <Tabs.Trigger
					value={tab.url}
					on:click={() => goto(tab.url)}
				>
					<button
						class="flex items-center font-bold"
						on:mouseenter={() => showTabClosingButton(tab)}
						on:mouseleave={() => hideTabClosingButton(tab)}
					>
					{tab.name}
						<button
							on:click={() => removeTab(tab.name)}
							class={`${tab.closingState}`}
							>
							<X class="ml-1 text-red-600 size-3.5"/>
						</button>
					</button>
				</Tabs.Trigger>
			</button>
			{/each}
		</Tabs.List>
	</Tabs.Root>

	<div class="flex justify-between items-center w-full md:block my-auto h-[32px] md:w-min md:p-0">
		<Avatar />
		
		<button class="block rounded-md bg-albi-500 size-[32px] md:hidden">
			<Menu class="size-5 m-1 mx-auto text-slate-50"/> 
		</button>
	</div>
</div>
