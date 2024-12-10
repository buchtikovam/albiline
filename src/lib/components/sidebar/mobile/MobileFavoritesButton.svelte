<script lang="ts">
	import { favoriteItems } from '$lib/runes/sidebar.svelte';
	import Heart from 'lucide-svelte/icons/heart';

	let { field }: { field: string } = $props();

	let isFavorite: boolean = $state(false);

	$effect(() => {
		favoriteItems.value.includes(field) ? (isFavorite = true) : (isFavorite = false);
	})

</script>



{#if isFavorite}
	<button class="pl-1 pr-2 w-fit">
		<Heart class="size-4"/>
	</button>
{:else}
	<button class="pl-1 pr-2 w-fit">
		<Heart class="size-4 text-red-500 fill-red-200"/>
	</button>
{/if}
