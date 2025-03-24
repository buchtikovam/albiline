<script lang="ts">
	import {sidebarOpen} from "$lib/runes/sidebar.svelte";
	import {allItems} from "$lib/definitions/components/sidebar/sidebar";
	import {Input} from "$lib/components/ui/input";
	import Search from "lucide-svelte/icons/search";
	import SidebarCommand from "$lib/components/sidebar/SidebarCommand.svelte";
	import ChevronsUpDown from "lucide-svelte/icons/chevrons-up-down";
	import * as Sidebar from "$lib/components/ui/sidebar";
	import {useSidebar} from "$lib/components/ui/sidebar";

	interface Props {
		searchTerm: string;
	}

	let { searchTerm = $bindable() }: Props = $props();

	let commandOpen = $state(false);
</script>



<Sidebar.Group class="py-0">
	<Sidebar.GroupContent
		class="relative h-8"
	>
		{#if sidebarOpen.value}
			<Input
				id="search"
				placeholder="Filtrovat"
				class="pl-8 h-8"
				bind:value={searchTerm}
			/>

			<Search
				class="pointer-events-none absolute left-2 top-1/2 size-4 -translate-y-1/2 select-none opacity-50"
			/>

		{:else}
			<button
				onclick={() => commandOpen = true}
				class="size-8"
			>
				<Search
					class="size-4  "
				/>
			</button>
		{/if}
	</Sidebar.GroupContent>
</Sidebar.Group>


<SidebarCommand
	items={allItems}
	bind:isSidebarCommandOpen={commandOpen}
/>
