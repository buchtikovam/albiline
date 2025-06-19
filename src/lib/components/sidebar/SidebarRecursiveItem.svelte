<script lang="ts">
	import type { SidebarItem } from '$lib/types/components/sidebar/sidebar';
	import { handleTabClick } from '$lib/utils/components/sidebar/handleTabClick';
	import ChevronRight from 'lucide-svelte/icons/chevron-right';
	import ChevronDown from 'lucide-svelte/icons/chevron-down';
	import SidebarContextMenu from './SidebarContextMenu.svelte';
	import Self from './SidebarRecursiveItem.svelte';
	import * as ContextMenu from '$lib/components/ui/context-menu';
	import * as Collapsible from '$lib/components/ui/collapsible';
	import * as Sidebar from '$lib/components/ui/sidebar';
	import { goto } from '$app/navigation';

	interface Props {
		item: SidebarItem;
		level: number;
		toggleOpen: (item: SidebarItem) => void;
		setRecursiveOpenState: (item: SidebarItem, open: boolean) => void;
		onChildClick?: (isHref: boolean) => void;
	}

	let { item = $bindable(), level, toggleOpen, onChildClick, setRecursiveOpenState }: Props =
		$props();
</script>

<div class={item.hide ? 'hidden' : 'block'}>
	{#if item.children && item.children.length > 0}
		<ContextMenu.Root>
			<ContextMenu.Trigger
				oncontextmenu={(e) => e.stopPropagation()}
			>
				<Collapsible.Root
					open={item.open}
					onOpenChange={() => {
						toggleOpen(item);
					}}
					class="group/collapsible"
					disabled={item.disabled}

				>
					<Sidebar.MenuSubItem
						onclick={(e) => e.stopPropagation()}
					>
						<Collapsible.Trigger
							onclick={(e) => e.stopPropagation()}
							class={`${item.disabled ? 'text-slate-400' : ''} w-full`}
						>
							<Sidebar.MenuSubButton class="lin">
								{@const Icon = item.icon}
								{#if Icon}
									<Icon />
								{/if}

								{#if item.href}
									<a
										href={item.href}
										class="w-fit hover:underline text-left line-clamp-1"
										data-sveltekit-preload-data="off"
										onclick={(event) => {
											event.preventDefault();
											event.stopPropagation();
											handleTabClick(item, level);
											onChildClick?.(true);
											if (item.href) goto(item.href);
										}}
									>
										{item.translation()}
									</a>
								{:else}
									<span>{item.translation()}</span>
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
							{#each item.children as child, i (child.field)}
								<Self
									bind:item={item.children[i]}
									level={level + 1}
									{onChildClick}
									{toggleOpen}
									{setRecursiveOpenState}
								/>
							{/each}
						</Sidebar.MenuSub>
					</Collapsible.Content>
				</Collapsible.Root>
			</ContextMenu.Trigger>

			<SidebarContextMenu bind:sidebarItem={item} {setRecursiveOpenState} />
		</ContextMenu.Root>
	{:else}
		<!-- leaf node -->
		<ContextMenu.Root>
			<ContextMenu.Trigger
				oncontextmenu={(e) => e.stopPropagation()}
			>
				<Sidebar.MenuSubItem>
					<Sidebar.MenuSubButton>
						<a
							href={item.href}
							class="flex w-full items-center "
							disabled={true}
							data-sveltekit-preload-data="off"
							onclick={(event) => {
								event.preventDefault();
								event.stopPropagation();
								handleTabClick(item, level);
								onChildClick?.(true);
								if (item.href) goto(item.href);
							}}
						>
							<span class="line-clamp-1"> {item.translation()} </span>
						</a>
					</Sidebar.MenuSubButton>
				</Sidebar.MenuSubItem>
			</ContextMenu.Trigger>

			<SidebarContextMenu bind:sidebarItem={item} {setRecursiveOpenState} />
		</ContextMenu.Root>
	{/if}
</div>
