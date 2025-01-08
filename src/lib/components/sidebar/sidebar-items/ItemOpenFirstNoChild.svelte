<script lang="ts">
	import { handleTabClick } from '$lib/utils/components/sidebar/handleTabClick';
	import ContextMenuFavorite from '$lib/components/sidebar/ContextMenuFavorite.svelte';
	import * as ContextMenu from '$lib/components/ui/context-menu/index.js';

	interface Props {
		item: any;
		isMobileSidebarOpen: boolean;
		isMobile: boolean;
	}

	let {
		item,
		isMobileSidebarOpen = $bindable(),
		isMobile
	}: Props = $props();
</script>	


<ContextMenu.Root>
	<ContextMenu.Trigger>
		{@const Icon = item.icon}
		<a
			href={item.href}
			onclick={() => {
				handleTabClick(item, 0);
				if (isMobile) {
					isMobileSidebarOpen = false;
				}
			}}
			class="flex text-sm font-bold items-center gap-3 rounded-lg py-2 px-1.5 hover:bg-muted/50 text-albi-950 hover:text-black"
		>
			<Icon />
			<span class="whitespace-nowrap">{item.translation()}</span>
		</a>
	</ContextMenu.Trigger>

	<ContextMenuFavorite field={item.field} />
</ContextMenu.Root>
