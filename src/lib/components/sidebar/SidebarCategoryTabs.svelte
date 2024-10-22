<script lang="ts">
	import { activeCategoryStore } from '$lib/stores/sidebarStore';
	import * as Tabs from "$lib/components/ui/tabs";
	import TabSeparator from '../tabs/TabSeparator.svelte';

	let value = "all";
	export let color: "primary" | "secondary" = "secondary";
	
	$: activeCategoryStore.set(value)
</script>


<Tabs.Root bind:value={value}>
    <Tabs.List class={ color === "primary" ? "bg-albi-500" : "bg-[#ccd1d9]"}>
		<Tabs.Trigger value="all" class="font-bold">
			Všechny
		</Tabs.Trigger>

		<TabSeparator color={color}/>

		<Tabs.Trigger value="recent" class="font-bold">
			Nedávné
		</Tabs.Trigger>

		<TabSeparator color={color}/>

		<Tabs.Trigger value="favorite" class="font-bold">
			Oblíbené
		</Tabs.Trigger>
    </Tabs.List>
</Tabs.Root>