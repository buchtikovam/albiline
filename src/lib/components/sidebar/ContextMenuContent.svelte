<script lang="ts">
	import * as ContextMenu from '$lib/components/ui/context-menu';
	import Heart from 'lucide-svelte/icons/heart';
	import { favoriteSidebarStore, activeCategoryStore } from '$lib/stores/sidebarStore';
	import HeartCrack from 'lucide-svelte/icons/heart-crack';

	export let itemValue: string;

	let category: string;

	activeCategoryStore.subscribe((data) => category = data);

	function handleAdd() {
		favoriteSidebarStore.update(data => data.concat(itemValue));
	}

	function handleRemove() {
		favoriteSidebarStore.update(data => data.filter((item) => item.indexOf(itemValue) === -1));
	}
</script>


<ContextMenu.Content>
	{#if category !== "favorite"}
		<ContextMenu.Item class="flex gap-2" on:click={handleAdd}>
			<Heart class="w-4 h-4 text-red-600" />
			Přidat do oblíbených
		</ContextMenu.Item>

	{:else}
		<ContextMenu.Item class="flex gap-2" on:click={handleRemove}>
			<HeartCrack class="w-4 h-4 text-red-600" />
			Odebrat z oblíbených
		</ContextMenu.Item>
	{/if}
</ContextMenu.Content>
