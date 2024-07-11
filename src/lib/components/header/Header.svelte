<script lang="ts">
	import { openedTabsStore, currentActiveTabStore, allowTabAdding } from '$lib/stores/tabStore';
	import { page } from '$app/stores';
	import type { HeaderTab } from '$lib/types/sidebar/sidebar';
	import { goto, preloadData } from '$app/navigation';
	import { get } from 'svelte/store';
	import X from 'lucide-svelte/icons/x';
	import Home from 'lucide-svelte/icons/home';
	import Avatar from '$lib/components/avatar/Avatar.svelte';
	import * as Tabs from '$lib/components/ui/tabs';

	/*
		Header komponenent s hlavními taby a avatarem
	*/

	let storedTabs: HeaderTab[];
	let activeTabValue: string;
	let url = $page.url.pathname;
	let urlLength = url.split('/').length;

	openedTabsStore.subscribe((data) => {
		storedTabs = data;
	});


	// Nastavování aktivního tabu
	currentActiveTabStore.subscribe((value) => {
		activeTabValue = value;

		// Proběhne při načtění stránky (currentActiveTabStore ještě nic neobsahuje)
		if (value === '') {
			activeTabValue = url;
			// Jelikož albiline má sekundární taby (např. /detail), které přidávají parametr do url,
			// pro správné zobrazení hlavních tabů je potřeba poslední parametr z url smazat než
			// se nastaví v Tabs.Root > value
			for (let tab of storedTabs) {
				// nalezena přímá shoda
				if (tab.url === url) {
					activeTabValue = url;
					break;
				}

				let tabUrlLength = tab.url.split('/').length;

				// nalezena částečná shoda
				if (url.includes(tab.url)) {
					if (tab.treeDepth === 0 && urlLength > 2 && tabUrlLength === urlLength - 1) {
						activeTabValue = `/${url.split('/').slice(1, -1)[0]}`;
					}

					if (tab.treeDepth === 1 && urlLength > 3 && tabUrlLength === urlLength - 1) {
						activeTabValue = `/${url.split('/').slice(1, -1).join('/')}`;
					}

					if (tab.treeDepth === 2 && urlLength > 4 && tabUrlLength === urlLength - 1) {
						activeTabValue = `/${url.split('/').slice(1, -1).join('/')}`;
					}
				}
			}
		}
	});


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



<div class="flex justify-between bg-muted">
	<Tabs.Root class="w-fit h-fit pt-2" value={activeTabValue}>
		<Tabs.List>
			<!-- Výchozí taby -->
			<Tabs.Trigger
				value="/"
				on:click={() => goto("/")}
			>
				<Home class="w-4 h-4" />
			</Tabs.Trigger>

			<button
				on:mouseenter={() => preloadData("/pruvodni-list")}
				class="flex"
			>
				<Tabs.Trigger
					value={`/pruvodni-list`}
					on:click={() => goto("/pruvodni-list")}
				>
					Průvodní list
				</Tabs.Trigger>
			</button>

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
							class="flex items-center"
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

	<div class="my-auto pr-2">
		<Avatar />
	</div>
</div>
