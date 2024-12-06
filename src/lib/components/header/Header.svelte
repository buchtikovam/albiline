<!-- @migration-task Error while migrating Svelte code: `<button>` is invalid inside `<button>` -->
<script lang="ts">
	import { editedTableDataStore, fulltextFilterValueStore, showFulltextSearchStore } from '$lib/stores/tableStore';
	import { openedTabsStore, allowTabAdding } from '$lib/stores/tabStore';
	import type { HeaderTab } from '$lib/types/components/sidebar/sidebar';
	import { goto, preloadData } from '$app/navigation';
	import { get } from 'svelte/store';
	import { _ } from 'svelte-i18n'
	import X from 'lucide-svelte/icons/x';
	import Home from 'lucide-svelte/icons/home';
	import Avatar from '$lib/components/avatar/Avatar.svelte';
	import * as Tabs from '$lib/components/ui/tabs';
	import Menu from 'lucide-svelte/icons/menu';
	import { page } from '$app/stores';
	import Input from '../ui/input/input.svelte';
	import MobileSidebar from '../sidebar/mobile/MobileSidebar.svelte';
	import TabSeparator from '../tabs/TabSeparator.svelte';
	import { disableNavigationStore } from '$lib/stores/pageStore';
	
	/*
	Header komponenent s hlavními taby a avatarem
	*/

	let storedTabs: HeaderTab[];
	openedTabsStore.subscribe(data => storedTabs = data);

	let disableNav: boolean;
	disableNavigationStore.subscribe((bool) => disableNav = bool)

	$: pathname = getTabValue($page.url.pathname)

	function getTabValue(url: string) {
		if (url === "/") return url;

		let urlLength = url.split('/').length;

		for (let tab of storedTabs) { // found match, no need to continue
			if (url === tab.url) {
				return url
			}
		}

 		for (let tab of storedTabs) {
			let tabUrlLength = tab.url.split('/').length;

			if (url.includes(tab.url)) {
				if ( // => /param/[var]
					tab.treeDepth === 0 &&
					urlLength > 2 &&
					tabUrlLength === urlLength - 1
				) {
					return `/${url.split('/').slice(1, -1)[0]}`;
				}

				if ( // => /param/param/[var]
					tab.treeDepth === 1 &&
					urlLength > 3 &&
					tabUrlLength === urlLength - 1
				) {
					return `/${url.split('/').slice(1, -1).join('/')}`;
				}

				if ( // => /param/param/[var]/.../[var]
					tab.treeDepth === 1 &&
					urlLength > 5 &&
					tabUrlLength === urlLength - 3
				) {
					return `/${url.split('/').slice(1, 3).join('/')}`;
				}

				if ( // => /param/param/param/[var]
					tab.treeDepth === 2 &&
					urlLength > 4 &&
					tabUrlLength === urlLength - 1
				) {
					return `/${url.split('/').slice(1, -1).join('/')}`;
				}
			}
		}
	}
	

	function removeTab(tab: HeaderTab, ev: MouseEvent) {
		if (ev.button === 1) { // remove tab on wheel mouse button click
			storedTabs.forEach((storedTab) => {
				if (storedTab.field === tab.field) {
					const index = storedTabs.indexOf(tab);
					storedTabs.splice(storedTabs.indexOf(tab), 1);
					openedTabsStore.set(storedTabs);

					// after tab was removed, redirect on available tab
					if ($page.url.pathname === tab.url) {
						if (storedTabs.length === 0) {
							goto("/");
							return;
						}

						if (storedTabs[index]) { // was spliced, so no need to increment index
							goto(storedTabs[index].url);
							return;
						}

						if (storedTabs[index - 1]) {
							goto(storedTabs[index - 1].url)
							return;
						}
					}
				}
			});
		}
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

	let openMobileSidebar : boolean = false;
</script>



<div
	class="flex justify-between px-4 pt-4 pb-2 md:pt-2 "
>
    <Tabs.Root
		class="hidden w-fit h-fit md:block rounded-md "
		bind:value={pathname}
	>
        <Tabs.List>
            <!-- default tabs -->
            <Tabs.Trigger
                value="/"
                on:click={() => goto("/")}
				disabled={disableNav}
                >
                <Home class="w-4 h-4" />
            </Tabs.Trigger>

            <!-- tabs opened by user -->
            {#each storedTabs as tab}
				<TabSeparator/>

				<button
					on:mouseenter={() => preloadData(tab.url)}
					class="flex"
				>
					<Tabs.Trigger
						value={tab.url}
						on:click={() => goto(tab.url)}
						disabled={disableNav && tab.url !== pathname}
					>
						<button
							class="flex items-center font-bold"
							on:auxclick={(ev) => removeTab(tab, ev)}
							on:mouseenter={() => showTabClosingButton(tab)}
							on:mouseleave={() => hideTabClosingButton(tab)}
						>
<!--							<div>-->
								{$_('components.sidebar.' + tab.field)}
<!--								<button-->
<!--									on:click={(ev) => removeTab(tab, ev)}-->
<!--									class={`${tab.closingState}`}-->
<!--								>-->
<!--									<X class="ml-1 text-red-600 size-3.5"/>-->
<!--								</button>-->
<!--							</div>-->

						</button>
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
			on:click={() => openMobileSidebar = true}
			class="rounded-md bg-albi-500 min-w-[32px] size-[32px] md:hidden"
		>
			<Menu class="size-5 m-1 mx-auto text-slate-50"/> 
		</button>

		<!-- mobile fulltext search -->
		{#if $showFulltextSearchStore === true}
			<div class="md:hidden w-full px-2">
				<Input
					class="h-[32px] rounded-md border-none focus-visible:ring-0"
					placeholder={$_('routes.prodej.zakaznici.fulltext_placeholder')}
					type="text"
					bind:value={$fulltextFilterValueStore}
				/>
			</div>
		{/if}
		
		<Avatar />
	</div>
</div>

<MobileSidebar bind:isOpen={openMobileSidebar}/>
