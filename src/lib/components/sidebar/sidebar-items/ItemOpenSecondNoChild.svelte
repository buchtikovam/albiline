<script lang="ts">
	import { handleTabClick } from '$lib/utils/components/sidebar/handleTabClick';
	import ContextMenuFavorite from '$lib/components/sidebar/ContextMenuFavorite.svelte';
	import * as ContextMenu from '$lib/components/ui/context-menu/index.js';
	import * as Accordion from '$lib/components/ui/accordion/index.js';

	interface Props {
		item: any;
		isMobile: boolean;
		isMobileSidebarOpen: boolean;
	}

	let {
		item,
		isMobileSidebarOpen = $bindable(),
		isMobile
	}: Props = $props();
</script>	



<ContextMenu.Root>
	<ContextMenu.Trigger>
		<Accordion.Item
			value={item.field}
			class="hover:bg-muted/50 rounded-md"
		>
			<a
				href="{item.href}"
				onclick={() => {
				handleTabClick(item, 1)
					if (isMobile) {
						isMobileSidebarOpen = false;
					}
				}}
				class="flex text-sm font-medium w-full items-center gap-3 rounded-lg px-2 py-1.5 text-albi-950 hover:text-black"
			>
				{item.translation() }
			</a>
		</Accordion.Item>
	</ContextMenu.Trigger>

	<ContextMenuFavorite field={item.field} />
</ContextMenu.Root>
