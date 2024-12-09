<script lang="ts">
	import { favoriteItemsStore, sidebarCategory } from '$lib/runes-global/sidebar.svelte';
	import HeartCrack from 'lucide-svelte/icons/heart-crack';
	import Heart from 'lucide-svelte/icons/heart';
	import * as ContextMenu from '$lib/components/ui/context-menu';

	interface Props {
		itemValue: string;
	}

	let { itemValue }: Props = $props();

	// let category: string = $state();
	// sidebarCategory.subscribe((data) => {
	// 	category = data;
	// });


	function addToFavorites() {
		favoriteItemsStore.update(data => data.concat(itemValue));
	}


	function removeFromFavorites() {
		favoriteItemsStore.update(data => data.filter((item) => item.indexOf(itemValue) === -1));
	}
</script>



<ContextMenu.Content>
	<!--{#if category !== "favorite"}-->
	<!--	<ContextMenu.Item-->
	<!--		class="flex gap-2 text-sm"-->
	<!--		on:click={addToFavorites}-->
	<!--	>-->
	<!--		<Heart class="w-4 h-4 text-red-600" />-->
	<!--		Přidat do oblíbených-->
	<!--	</ContextMenu.Item>-->
	<!--{:else}-->
	<!--	<ContextMenu.Item-->
	<!--		class="flex gap-2 text-sm"-->
	<!--		on:click={removeFromFavorites}-->
	<!--	>-->
	<!--		<HeartCrack class="w-4 h-4 text-red-600" />-->
	<!--		Odebrat z oblíbených-->
	<!--	</ContextMenu.Item>-->
	<!--{/if}-->
</ContextMenu.Content>
