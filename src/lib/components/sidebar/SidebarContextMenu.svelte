<script lang="ts">
	import { favoriteItems, sidebarCategory } from '$lib/runes/sidebar.svelte.js';
	import HeartCrack from 'lucide-svelte/icons/heart-crack';
	import Heart from 'lucide-svelte/icons/heart';
	import * as m from "$lib/paraglide/messages.js";
	import * as ContextMenu from '$lib/components/ui/context-menu';
	import type {SidebarItem} from "$lib/types/components/sidebar/sidebar";
	import ArrowDownFromLine from "lucide-svelte/icons/arrow-down-from-line";
	import ArrowUpToLine from "lucide-svelte/icons/arrow-up-to-line";

	let {
		sidebarItem
	}: { sidebarItem: SidebarItem } = $props();


	function addToFavorites() {
		if (favoriteItems.value.includes(sidebarItem.field)) return;
		favoriteItems.value.push(sidebarItem.field);
	}


	function removeFromFavorites() {
		favoriteItems.value = favoriteItems.value.filter((favItem) => favItem.indexOf(sidebarItem.field) === -1);
	}


	function recursiveOpenOrClose(item: SidebarItem, open: boolean) {
		item.open = open;

		if (item.children && item.children.length > 0) {
			item.children.forEach((child: SidebarItem) => {
				recursiveOpenOrClose(child, open);
			})
		}
	}
</script>



<ContextMenu.Content>
	{#if sidebarItem.children && sidebarItem.children.length > 0}
		{#if sidebarItem.open && !sidebarItem.disabled}
			<ContextMenu.Item
				class="flex gap-2 text-sm"
				onclick={() => recursiveOpenOrClose(sidebarItem, false)}
			>
				<ArrowUpToLine class="size-4" />
				Zavřít vše
			</ContextMenu.Item>

		{:else}

			<ContextMenu.Item
				class="flex gap-2 text-sm"
				onclick={() => recursiveOpenOrClose(sidebarItem, true)}
			>
				<ArrowDownFromLine class="size-4" />
				Otevřít vše
			</ContextMenu.Item>
		{/if}
	{/if}


	{#if sidebarCategory.value === "favorite"}
		<ContextMenu.Item
			class="flex gap-2 text-sm"
			onclick={removeFromFavorites}
		>
			<HeartCrack class="size-4 text-red-600" />
			{m.components_sidebar_context_menu_remove_from_favorites()}
		</ContextMenu.Item>
	{:else}
		<ContextMenu.Item
			class="flex gap-2 text-sm"
			onclick={addToFavorites}
		>
			<Heart class="size-4 text-red-600" />
			{m.components_sidebar_context_menu_add_to_favorites()}
		</ContextMenu.Item>
	{/if}
</ContextMenu.Content>
