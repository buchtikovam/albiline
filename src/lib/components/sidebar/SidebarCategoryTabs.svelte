<script lang="ts">
	import { activeCategoryStore } from '$lib/stores/sidebarStore';
	import * as Tabs from "$lib/components/ui/tabs";

	let value = "all"

	$: activeCategoryStore.set(value)
</script>


<Tabs.Root bind:value={value}>
    <Tabs.List class="bg-[#ccd1d9]">
		<Tabs.Trigger value="all" class="font-bold">
			Všechny
		</Tabs.Trigger>

		<Tabs.Trigger value="recent" class="font-bold">
			Nedávné
		</Tabs.Trigger>

		<Tabs.Trigger value="favorite" class="font-bold">
			Oblíbené
		</Tabs.Trigger>
    </Tabs.List>
</Tabs.Root>