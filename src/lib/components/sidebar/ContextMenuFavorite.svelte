<script lang="ts">
	import { favoriteItems, sidebarCategory } from '$lib/runes/sidebar.svelte';
	import HeartCrack from 'lucide-svelte/icons/heart-crack';
	import Heart from 'lucide-svelte/icons/heart';
	import * as ContextMenu from '$lib/components/ui/context-menu';
	import * as m from "$lib/paraglide/messages.js";

	let { field }: { field: string } = $props();

	function addToFavorites() {
		if (favoriteItems.value.includes(field)) return;
		favoriteItems.value.push(field);
	}

	function removeFromFavorites() {
		favoriteItems.value = favoriteItems.value.filter((item) => item.indexOf(field) === -1);
	}
</script>



<ContextMenu.Content>
	{#if sidebarCategory.value === "favorite"}
		<ContextMenu.Item
			class="flex gap-2 text-sm"
			onclick={removeFromFavorites}
		>
			<HeartCrack class="size-4 fill-red-200 text-red-600" />
			{m.components_sidebar_context_menu_remove_from_favorites()}
		</ContextMenu.Item>
	{:else}
		<ContextMenu.Item
			class="flex gap-2 text-sm"
			onclick={addToFavorites}
		>
			<Heart  class="size-4 fill-red-200 text-red-600" />
			{m.components_sidebar_context_menu_add_to_favorites()}
		</ContextMenu.Item>
	{/if}
</ContextMenu.Content>
