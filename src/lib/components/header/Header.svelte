<script lang="ts">
	import { goto } from '$app/navigation';
	import Avatar from '$lib/components/avatar/Avatar.svelte';
	import * as Tabs from '$lib/components/ui/tabs';
	import { Home } from 'lucide-svelte';
	import { openedTabsStore } from '$lib/stores/store';

	let tabs: Tab[];

	openedTabsStore.subscribe((data) => {
		tabs = data;
	});

	import { page } from '$app/stores';
	import X from 'lucide-svelte/icons/x';
	import { Button } from '$lib/components/ui/button';
	import type { Tab } from '$lib/types/sidebar';

	// pathname into root value
	// default home tag
	//

	let url = $page.url.pathname;

	function removeTab(tabName: string) {
		console.log('remove fn');
		tabs.forEach((tab) => {
			if (tab.name === tabName) {
				tabs.splice(tabs.indexOf(tab), 1);
				openedTabsStore.set(tabs);
			}
		});
	}

	console.log(url);

	function showClosingButton(tab: Tab) {
		tab.closingState = '';
		openedTabsStore.update(() => tabs);
	}

	function hideClosingButton(tab: Tab) {
		tab.closingState = 'hidden';
		openedTabsStore.update(() => tabs);
	}

</script>

<!--TODO: on open page, set value for tab to immediately trigger tab change-->

<!--TODO: prevent duplicate tabs-->

<div class="flex justify-between bg-muted">
	<Tabs.Root class="w-fit h-fit pt-2" value={url}>
		<Tabs.List>
			<Tabs.Trigger
				value="/"
				on:click={() => goto("/")}
			>
				<Home class="w-4 h-4" />
			</Tabs.Trigger>

			{#each tabs as tab}
				<Tabs.Trigger
					value={tab.url}
					on:click={() => goto(tab.url)}
					class=""
				>
					<button
						class="flex transition-all"
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
