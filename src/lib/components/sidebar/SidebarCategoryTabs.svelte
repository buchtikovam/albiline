<script lang="ts">
	import { activeCategoryStore } from '$lib/stores/sidebarStore';
	import * as Tabs from "$lib/components/ui/tabs";
	import { _ } from 'svelte-i18n'
	import TabSeparator from '../tabs/TabSeparator.svelte';

	let value = "all";
	export let color: "primary" | "secondary" = "secondary";
	
	$: activeCategoryStore.set(value)
</script>



<Tabs.Root bind:value={value}>
    <Tabs.List class={ color === "primary" ? "bg-albi-500" : "bg-gray-300"}>
		<Tabs.Trigger value="all" class="font-bold">
			{$_('components.sidebar.all')}
		</Tabs.Trigger>

		<TabSeparator color={color}/>

		<Tabs.Trigger value="recent" class="font-bold">
			{$_('components.sidebar.recent')}
		</Tabs.Trigger>

		<TabSeparator color={color}/>

		<Tabs.Trigger value="favorite" class="font-bold">
			{$_('components.sidebar.favorite')}
		</Tabs.Trigger>
    </Tabs.List>
</Tabs.Root>
