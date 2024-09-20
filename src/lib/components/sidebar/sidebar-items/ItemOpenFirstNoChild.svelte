<script lang="ts">
	import ContextMenuContent from '$lib/components/sidebar/ContextMenuFavorite.svelte';
	import * as ContextMenu from '$lib/components/ui/context-menu/index.js';
	import { handleTabClick } from '$lib/utils/sidebar/handleTabClick';

	export let item;
</script>	


<ContextMenu.Root>
	<ContextMenu.Trigger>
		<a
			href={item.href}
			on:click={() => handleTabClick(item, 0)}
			class="flex text-sm font-bold items-center gap-3 rounded-lg px-2 py-2 hover:bg-muted/50 text-albi-950 hover:text-black"
		>
			<svelte:component this={item.icon} />
			{item.name}
		</a>
	</ContextMenu.Trigger>

	<ContextMenuContent itemValue={item.value} />
</ContextMenu.Root>