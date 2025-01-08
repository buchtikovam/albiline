<script lang="ts">
	import { handleTabClick } from '$lib/utils/components/sidebar/handleTabClick';
	import ContextMenuContent from '$lib/components/sidebar/ContextMenuFavorite.svelte';
	import * as ContextMenu from '$lib/components/ui/context-menu/index.js';
	import * as Accordion from '$lib/components/ui/accordion/index.js';

	interface Props {
		item: any;
		isMobileSidebarOpen: boolean;
		isMobile: boolean;
	}

	let {
		item,
		isMobile,
		isMobileSidebarOpen = $bindable()
	}: Props = $props();
</script>


<ContextMenu.Trigger>
	<Accordion.Item
		value={item.field}
		class="hover:bg-muted/50 rounded-md"
	>
		<a
			href="{item.href}"
			onclick={() => {
				handleTabClick(item, 2);
				if (isMobile) {
					isMobileSidebarOpen = false;
				}
			}}
			class="flex text-sm font-medium w-full items-center gap-3 rounded-lg px-3 py-2 text-albi-950 hover:text-black"
		>
			{ item.translation() }
		</a>
	</Accordion.Item>
</ContextMenu.Trigger>

<ContextMenuContent field={item.field} />
