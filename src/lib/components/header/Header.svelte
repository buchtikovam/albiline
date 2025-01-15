<script lang="ts">
	import { fulltextFilterValue, showFulltextSearch } from '$lib/runes/page.svelte';
	import { disableNavigation, openedTabs } from '$lib/runes/navigation.svelte.js';
	import { i18n } from '$lib/i18n.js'
	import { page } from '$app/state';
	import { getTabValue } from '$lib/utils/navigation/getTabValue';
	import { deleteTab } from '$lib/utils/navigation/deleteTab.svelte';
	import { slide } from 'svelte/transition';
	import { goto } from '$app/navigation';
	import Home from 'lucide-svelte/icons/home';
	import Menu from 'lucide-svelte/icons/menu';
	import X from 'lucide-svelte/icons/x';
	import TabSeparator from '../tabs/TabSeparator.svelte';
	import Avatar from '$lib/components/avatar/Avatar.svelte';
	import Input from '../ui/input/input.svelte';
	import MobileSidebar from '../sidebar/mobile/MobileSidebar.svelte';
	import * as Tabs from '$lib/components/ui/tabs';


	let pathName = $derived(getTabValue(page.url.pathname, openedTabs.value));
	let disabled = $derived(disableNavigation.value);

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
            <Tabs.Trigger
                value="/"
				disabled={disabled}
                onclick={() => goto(i18n.resolveRoute("/"))}
			>
                <Home class="w-4 h-4" />
            </Tabs.Trigger>

            {#each openedTabs.value as tab}
				<TabSeparator/>

				<Tabs.Trigger
					value={tab.url}
					disabled={disabled && tab.url !== pathName}
					onmouseenter={() => tab.closingState = 'block'}
					onmouseleave={() => tab.closingState = 'hidden'}
					onclick={() => {
					goto(i18n.resolveRoute(tab.url));
				}}
					onauxclick={(ev) => {
					ev.preventDefault();
					if (ev.button === 1) {
						deleteTab(tab);
					}
				}}
					class="flex h-6 items-center font-bold"
				>
					{ tab.field }
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
