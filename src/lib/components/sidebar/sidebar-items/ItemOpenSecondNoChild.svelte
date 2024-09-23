<script lang="ts">
	import ContextMenuContent from '$lib/components/sidebar/ContextMenuFavorite.svelte';
	import * as ContextMenu from '$lib/components/ui/context-menu/index.js';
	import * as Accordion from '$lib/components/ui/accordion/index.js';
	import { handleTabClick } from '$lib/utils/sidebar/handleTabClick';

	export let item;
	export let isMobile: boolean;
	export let isOpen: boolean;
</script>	

<ContextMenu.Root>
	<ContextMenu.Trigger>
		<Accordion.Item
			value={item.value}
			class="hover:bg-muted/50 rounded-md"
		>
			<a
				href="{item.href}"
				on:click={() => {
					handleTabClick(item, 1)
					if (isMobile) {
						isOpen = false;
					}
				}}
				class="flex text-sm font-medium w-full items-center gap-3 rounded-lg px-2 py-2 text-albi-950 hover:text-black"
			>
				{item.name}
			</a>
		</Accordion.Item>
	</ContextMenu.Trigger>

	<ContextMenuContent itemValue={item.value} />
</ContextMenu.Root>