<script lang="ts">
	import { _ } from 'svelte-i18n'
	import type { SidebarItem } from '$lib/types/components/sidebar/sidebar';
	import { handleTabClick } from '$lib/utils/components/sidebar/handleTabClick';
	import * as Command from '$lib/components/ui/command';

	export let items: SidebarItem[];
	export let isSidebarCommandOpen: boolean;


	function handleClick(item: SidebarItem, treeDepth: number): void {
		isSidebarCommandOpen = !isSidebarCommandOpen;
		handleTabClick(item, treeDepth);
	}
</script>



<Command.Dialog bind:open={isSidebarCommandOpen} class="p-0">
	<Command.Input placeholder={$_('components.sidebar.search_placeholder')} />

	<Command.List class="mt-2 p-0">
		<Command.Empty class="-mt-2">
			{$_('components.sidebar.command_empty')}
		</Command.Empty>

		{#each items as item}
			{#if item.children.length > 0}
				<Command.Separator class="my-2" />

				<!-- items s children položkami -->
				<Command.Group heading={$_('components.sidebar.' + item.field).toUpperCase()} class="my-2">
					{#each item.children as child}
						<Command.Item class="">
							<a href={child.href} on:click={() => handleClick(child, 1)}>
								{$_('components.sidebar.' + child.field)}
							</a>
						</Command.Item>

						{#if child.children}
							{#each child.children as secondChild}
								<Command.Item>
									<a href={secondChild.href} class="text-sm pl-4"
									   on:click={() => handleClick(secondChild, 2)}>
										{$_('components.sidebar.' + secondChild.field)}
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
						<a href={item.href} on:click={() => handleClick(item, 0)}>
							{$_('components.sidebar.' + item.field)}
						</a>
					</Command.Item>
				</Command.Group>
			{/if}
		{/each}
	</Command.List>
</Command.Dialog>
