<script lang="ts">
	import {sidebarCategory} from '$lib/runes/sidebar.svelte.js';
	import {apiServiceDELETEHandled, apiServicePostHandled} from '$lib/api/apiService.svelte';
	import ArrowDownFromLine from 'lucide-svelte/icons/arrow-down-from-line';
	import ArrowUpToLine from 'lucide-svelte/icons/arrow-up-to-line';
	import HeartCrack from 'lucide-svelte/icons/heart-crack';
	import Heart from 'lucide-svelte/icons/heart';
	import type {SidebarItem} from '$lib/types/components/sidebar/sidebar';
	import * as m from '$lib/paraglide/messages.js';
	import * as ContextMenu from '$lib/components/ui/context-menu';

	interface Props {
		sidebarItem: SidebarItem;
		setRecursiveOpenState: (item: SidebarItem, open: boolean) => void;
	}

	let {
		sidebarItem = $bindable(),
		setRecursiveOpenState,
	}: Props = $props();


	async function addToFavorites(item: SidebarItem) {
		await apiServicePostHandled('userMenuFavorites', {
			menuFavoritesValue: item.field
		});
	}

	async function removeFromFavorites(item: SidebarItem) {
		await apiServiceDELETEHandled('userMenuFavorites', `?MenuFavoritesValue=${item.field}`);
		sidebarCategory.value = 'all';
		sidebarCategory.value = 'favorite';
	}
</script>



<ContextMenu.Content>
	{#if sidebarItem.children && sidebarItem.children.length > 0 && !sidebarItem.disabled}
		{#if sidebarItem.open}
			<ContextMenu.Item
				class="flex gap-2 text-sm"
				onclick={() => setRecursiveOpenState(sidebarItem, false)}
			>
				<ArrowUpToLine class="size-4" />
				Zavřít vše
			</ContextMenu.Item>
		{:else}
			<ContextMenu.Item
				class="flex gap-2 text-sm"
				onclick={() => setRecursiveOpenState(sidebarItem, true)}
			>
				<ArrowDownFromLine class="size-4" />
				Otevřít vše
			</ContextMenu.Item>
		{/if}
	{/if}

	{#if sidebarCategory.value === 'favorite'}
		<ContextMenu.Item class="flex gap-2 text-sm" onclick={() => removeFromFavorites(sidebarItem)}>
			<HeartCrack class="size-4 text-pink-600" />
			{m.components_sidebar_context_menu_remove_from_favorites()}
		</ContextMenu.Item>
	{:else}
		<ContextMenu.Item class="flex gap-2 text-sm" onclick={() => addToFavorites(sidebarItem)}>
			<Heart class="size-4 text-pink-600" />
			{m.components_sidebar_context_menu_add_to_favorites()}
		</ContextMenu.Item>
	{/if}
</ContextMenu.Content>
