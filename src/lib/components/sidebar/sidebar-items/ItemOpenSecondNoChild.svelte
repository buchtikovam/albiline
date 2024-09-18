<script lang="ts">
	import ContextMenuContent from '$lib/components/sidebar/ContextMenuFavorite.svelte';
	import * as ContextMenu from '$lib/components/ui/context-menu/index.js';
	import * as Accordion from '$lib/components/ui/accordion/index.js';
	import { handleTabClick } from '$lib/utils/sidebar/handleTabClick';

	export let item;
</script>	

<ContextMenu.Root>
	<ContextMenu.Trigger>
		<Accordion.Item
			value={item.value}
			class="hover:bg-muted/50 rounded-md"
		>
			<a
				href="{item.href}"
				on:click={() => handleTabClick(item, 1)}
				class="flex text-sm font-medium w-full items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground/75 transition-all hover:text-primary"
			>
				{item.name}
			</a>
		</Accordion.Item>
	</ContextMenu.Trigger>

	<ContextMenuContent itemValue={item.value} />
</ContextMenu.Root>