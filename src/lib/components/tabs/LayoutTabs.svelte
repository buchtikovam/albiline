<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import * as Tabs from '$lib/components/ui/tabs';
	import type { Tab } from '$lib/types/tabs/tabs';

	export let tabDefinitions: Tab[];

	$: console.log(tabDefinitions);
	
</script>


<Tabs.Root value={$page.url.pathname} class="rounded-md block">
	<Tabs.List class="w-fit">
		{#each tabDefinitions as tab (tab)}
		   <Tabs.Trigger
				class="font-bold"
				value={tab.value}
				on:click={() => goto(tab.value)}
			>
				{tab.name}
			</Tabs.Trigger>
		{/each}
	</Tabs.List>
</Tabs.Root>