<script lang="ts">
	import { goto } from '$app/navigation';
	import X from 'lucide-svelte/icons/x';
	import Home from 'lucide-svelte/icons/home';
	import { openedTabsStore, currentActiveTabStore, allowTabAdding } from '$lib/stores/tabStore';
	import { page } from '$app/stores';
	import type { Tab } from '$lib/types/sidebar/sidebar';
	import Avatar from '$lib/components/avatar/Avatar.svelte';
	import * as Tabs from '$lib/components/ui/tabs';
	import { get } from 'svelte/store';

	let tabs: Tab[];
	let activeTabValue: string;
	let url = $page.url.pathname;
	let urlLength = url.split('/').length;

	openedTabsStore.subscribe((data) => {
		tabs = data;
	});

	// Nastavování aktivního tabu
	currentActiveTabStore.subscribe((value) => {
		activeTabValue = value;

		// Proběhne při načtění stránky:
		if (value === '') {
			activeTabValue = url;

			// Jelikož albiline má sekundární taby (např. /detail), které přidávají parametr do url,
			// pro správné zobrazení hlavních tabů je potřeba poslední parametr z url smazat než
			// se nastaví v Tabs.Root > value
			for (let tab of tabs) {
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
		tabs.forEach((tab) => {
			if (tab.name === tabName) {
				tabs.splice(tabs.indexOf(tab), 1);
				openedTabsStore.set(tabs);
			}
		});
	}

	function showClosingButton(tab: Tab) {
		if (get(allowTabAdding)) {
			tab.closingState = '';
			openedTabsStore.update(() => tabs);
		}

	}

	function hideClosingButton(tab: Tab) {
		tab.closingState = 'hidden';
		openedTabsStore.update(() => tabs);
	}
</script>

<div class="flex justify-between bg-muted">
	<Tabs.Root class="w-fit h-fit pt-2" value={activeTabValue}>
		<Tabs.List>
			<!-- Výchozí tab -->
			<Tabs.Trigger
				value="/"
				on:click={() => goto("/")}
			>
				<Home class="w-4 h-4" />
			</Tabs.Trigger>

			<!-- Taby otevřené uživatelem -->
			{#each tabs as tab}
				<Tabs.Trigger
					value={tab.url}
					on:click={() => goto(tab.url)}
					class=""
				>
					<button
						class="flex "
						on:mouseenter={() => showClosingButton(tab)}
						on:mouseleave={() => hideClosingButton(tab)}
					>
						{tab.name}
						<button on:click={() => removeTab(tab.name)} class="{tab.closingState}">
							<X class="ml-1 text-red-600 w-4 h-4" />
						</button>
					</button>
				</Tabs.Trigger>
			{/each}
		</Tabs.List>
	</Tabs.Root>

	<div class="my-auto pr-2">
		<Avatar />
	</div>
</div>

