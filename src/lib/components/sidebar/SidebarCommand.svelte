<script lang="ts">
	import { handleTabClick } from '$lib/utils/components/sidebar/handleTabClick';
	import type { SidebarItem } from '$lib/types/components/sidebar/sidebar';
	import * as m from "$lib/paraglide/messages.js"
	import * as Command from '$lib/components/ui/command';

	interface Props {
		items: SidebarItem[];
		isSidebarCommandOpen: boolean;
	}

	let { items, isSidebarCommandOpen = $bindable() }: Props = $props();


	function handleClick(
		item: SidebarItem,
		treeDepth: number
	): void {
		isSidebarCommandOpen = !isSidebarCommandOpen;
		handleTabClick(item, treeDepth);
	}
</script>



<Command.Dialog
	bind:open={isSidebarCommandOpen}
	class="p-0 min-w-[300px] hidden sm:block"
>
	<Command.Input
		placeholder={m.components_sidebar_search_placeholder()}
	/>

	<Command.List>
		<Command.Empty class="-mt-2">
			{m.components_sidebar_command_empty()}
		</Command.Empty>

		{#each items as item}
			{#if item.children.length > 0}
				<Command.Separator/>

				<!-- items s children položkami -->
				<Command.Group heading={item.translation()}>
					{#each item.children as child}
						<Command.Item class="">
							<a
								href={child.href}
								onclick={() => handleClick(child, 1)}
							>
								{child.translation()}
							</a>
						</Command.Item>

						{#if child.children}
							{#each child.children as secondChild}
								<Command.Item>
									<a
										href={secondChild.href}
										class="text-sm pl-4"
										onclick={() => handleClick(secondChild, 2)}
									>
										{secondChild.translation()}
									</a>
								</Command.Item>
							{/each}
						{/if}
					{/each}
				</Command.Group>
			{:else}
				<!-- items bez children položek -->
				<Command.Group>
					<Command.Item>
						<a
							href={item.href}
							onclick={() => handleClick(item, 0)}
						>
							{item.translation()}
						</a>
					</Command.Item>
				</Command.Group>
			{/if}
		{/each}
	</Command.List>
</Command.Dialog>
