<!-- src/lib/components/sidebar/SidebarRecursiveItem.svelte -->
<script lang="ts">
	import type { SidebarItem } from '$lib/types/components/sidebar/sidebar';
	import { handleTabClick } from '$lib/utils/components/sidebar/handleTabClick';
	import ChevronRight from 'lucide-svelte/icons/chevron-right';
	import ChevronDown from 'lucide-svelte/icons/chevron-down';
	import * as ContextMenu from '$lib/components/ui/context-menu';
	import * as Collapsible from '$lib/components/ui/collapsible';
	import * as Sidebar from '$lib/components/ui/sidebar';
	import SidebarContextMenu from './SidebarContextMenu.svelte';
	import Self from './SidebarRecursiveItem.svelte';

	interface Props {
		item: SidebarItem;
		level: number;
		toggleOpen: (item: SidebarItem) => void; // Expect the callback function
		onChildClick?: () => void;
	}

	let {
		item = $bindable(),
		level,
		toggleOpen,
		onChildClick
	}: Props = $props();
</script>


<!--todo add disabling-->


<div class={item.hide ? 'hidden' : 'block'}>
	{#if item.children && item.children.length > 0}
		<ContextMenu.Root>
			<ContextMenu.Trigger>
			<Collapsible.Root
				open={item.open}
				onOpenChange={() => toggleOpen(item)}	 class="group/collapsible"
			>

				<Sidebar.MenuSubItem>
					<Collapsible.Trigger class="w-full">
						<Sidebar.MenuSubButton class="lin">
							{@const Icon = item.icon}
							{#if Icon}
								<Icon />
							{/if}

							{#if item.href}
								<a
									href={item.href}
									class=" w-fit hover:underline text-left line-clamp-1"
									data-sveltekit-preload-data="off"
									onclick={() => {
									handleTabClick(item, level);
										onChildClick?.();
									}}
								>
									{item.translation()}
								</a>
							{:else}
								<span>
									{item.translation()}
								</span>
							{/if}

							{#if item.open}
								<ChevronDown class="ml-auto h-4 w-4" />
							{:else}
								<ChevronRight class="ml-auto h-4 w-4" />
							{/if}
						</Sidebar.MenuSubButton>
					</Collapsible.Trigger>
				</Sidebar.MenuSubItem>
				<Collapsible.Content>
					<Sidebar.MenuSub>
						{#each item.children as child (child.field)}
							<!-- Recursive call, passing the toggleOpen function down -->
							<Self
								item={child}
								level={level + 1}
								{onChildClick}
								{toggleOpen}
							/>
						{/each}
					</Sidebar.MenuSub>
				</Collapsible.Content>
			</Collapsible.Root>
			</ContextMenu.Trigger>
			<SidebarContextMenu sidebarItem={item} />
		</ContextMenu.Root>
	{:else}
		<!-- leaf node -->
		<ContextMenu.Root>
			<ContextMenu.Trigger>
				<Sidebar.MenuSubItem>
					<Sidebar.MenuSubButton>
						<a
							href={item.href}
							class="flex w-full items-center"
							data-sveltekit-preload-data="off"
							onclick={() => {
								handleTabClick(item, level);
								onChildClick?.();
							}}
						>
							<span>
								{item.translation()}
							</span>
						</a>
					</Sidebar.MenuSubButton>
				</Sidebar.MenuSubItem>
			</ContextMenu.Trigger>
			<SidebarContextMenu sidebarItem={item} />
		</ContextMenu.Root>
	{/if}
</div>
