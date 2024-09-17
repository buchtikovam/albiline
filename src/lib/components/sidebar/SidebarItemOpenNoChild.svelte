<script lang="ts">
	import ContextMenuContent from '$lib/components/sidebar/ContextMenuFavorite.svelte';
	import * as ContextMenu from '$lib/components/ui/context-menu/index.js';
	import { handleTabClick } from '$lib/utils/handleTabClick';

	export let item;
</script>	


<ContextMenu.Root>
	<ContextMenu.Trigger>
		<a
			href={item.href}
			on:click={() => handleTabClick(item, 0)}
			class="flex text-sm font-bold items-center gap-3 rounded-lg px-2 py-2 hover:bg-muted/50 text-muted-foreground/75 transition-all hover:text-primary"
		>
			<svelte:component this={item.icon} />
			{item.name}
		</a>
	</ContextMenu.Trigger>

	<ContextMenuContent itemValue={item.value} />
</ContextMenu.Root>