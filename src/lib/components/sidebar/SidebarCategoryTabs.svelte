<script lang="ts">
	import { sidebarCategory } from '$lib/runes-global/sidebar.svelte';
	import TabSeparator from '../tabs/TabSeparator.svelte';
	import * as m from "$lib/paraglide/messages.js"
	import * as Tabs from "$lib/components/ui/tabs";

	let value = $derived(sidebarCategory.value);

	interface Props {
		color?: "primary" | "secondary";
	}

	let { color = "secondary" }: Props = $props();
</script>



<Tabs.Root value={value}>
    <Tabs.List class={ color === "primary" ? "bg-albi-500" : "bg-slate-300"}>
		<Tabs.Trigger
			value="all"
		>
			{m.components_sidebar_category_all()}
		</Tabs.Trigger>

		<TabSeparator color={color}/>

		<Tabs.Trigger
			value="recent"
		>
			{m.components_sidebar_category_recent()}
		</Tabs.Trigger>

		<TabSeparator color={color}/>

		<Tabs.Trigger
			value="favorite"
		>
			{m.components_sidebar_category_favorite()}
		</Tabs.Trigger>
    </Tabs.List>
</Tabs.Root>
