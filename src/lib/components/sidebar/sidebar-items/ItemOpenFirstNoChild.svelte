<script lang="ts">
	import { handleTabClick } from '$lib/utils/components/sidebar/handleTabClick';
	import ContextMenuContent from '$lib/components/sidebar/ContextMenuFavorite.svelte';
	import * as ContextMenu from '$lib/components/ui/context-menu/index.js';


	interface Props {
		item: any;
		value: string;
		isMobile?: boolean;
		isOpen?: boolean;
	}

	let { item, value, isMobile = false, isOpen = $bindable(true) }: Props = $props();
</script>	


<ContextMenu.Root>
	<ContextMenu.Trigger>
		{@const Icon = item.icon}
		<a
			href={item.href}
			onclick={() => {
				handleTabClick(item, 0)
				if (isMobile) {
					isOpen = false;
				}	
			}}
			class="flex text-sm font-bold items-center gap-3 rounded-lg px-2 py-2 hover:bg-muted/50 text-albi-950 hover:text-black"
		>
			<Icon />
			{(value)}
		</a>
	</ContextMenu.Trigger>

	<ContextMenuContent itemValue={item.field} />
</ContextMenu.Root>
