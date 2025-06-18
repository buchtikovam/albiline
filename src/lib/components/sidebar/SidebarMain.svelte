<script lang="ts">
	import { openedSidebarItems, sidebarOpen } from '$lib/runes/sidebar.svelte.js';
	import { isMobile } from '$lib/runes/page.svelte.js';
	import { handleTabClick } from '$lib/utils/components/sidebar/handleTabClick';
	import { onMount } from 'svelte';
	import ChevronRight from 'lucide-svelte/icons/chevron-right';
	import ChevronDown from 'lucide-svelte/icons/chevron-down';
	import type { SidebarItem } from '$lib/types/components/sidebar/sidebar';
	import SidebarContextMenu from './SidebarContextMenu.svelte';
	import SidebarRecursiveItem from './SidebarRecursiveItem.svelte';
	import * as ContextMenu from '$lib/components/ui/context-menu';
	import * as Collapsible from '$lib/components/ui/collapsible';
	import * as Popover from '$lib/components/ui/popover';
	import * as Sidebar from '$lib/components/ui/sidebar';
	import { goto } from '$app/navigation';

	interface Props {
		sidebarItems: SidebarItem[];
	}

	let { sidebarItems = $bindable() }: Props = $props();

	let mounted = $state(false);

	onMount(() => {
		mounted = true;
	});

	/**
	 * Toggles the open state of a single sidebar item and updates storage.
	 */
	function toggleOpen(item: SidebarItem) {
		// FIX: Decouple the state update from the click event using setTimeout.
		// This prevents our re-render from conflicting with the Popover's
		// internal "outside click" handling.
		setTimeout(() => {
			item.open = !item.open;
			const currentOpened = openedSidebarItems.value;
			const fieldExists = currentOpened.includes(item.field);

			if (item.open && !fieldExists) {
				openedSidebarItems.value = [...currentOpened, item.field];
			} else if (!item.open && fieldExists) {
				openedSidebarItems.value = currentOpened.filter((field) => field !== item.field);
			}
		}, 0);
	}
	/**
	 * Recursively sets the open state for an item and all its children,
	 * then updates the session storage accordingly.
	 */
	function setRecursiveOpenState(startItem: SidebarItem, open: boolean) {
		const affectedFields: string[] = [];

		// Helper to find all fields and mutate the open state
		function applyState(item: SidebarItem) {
			item.open = open;
			if (item.children && item.children.length > 0) {
				affectedFields.push(item.field);
				item.children.forEach(applyState);
			}
		}

		applyState(startItem);

		const currentOpened = new Set(openedSidebarItems.value);

		if (open) {
			// Add all affected fields
			affectedFields.forEach((field) => currentOpened.add(field));
		} else {
			// Remove all affected fields
			affectedFields.forEach((field) => currentOpened.delete(field));
		}

		openedSidebarItems.value = Array.from(currentOpened);
	}
</script>

<Sidebar.Group>
	<Sidebar.Menu>
		{#if mounted}
			{#each sidebarItems as item, i (item.field)}
				<div class={item.hide ? 'hidden' : 'block'}>
					<!-- Popover code for when sidebar is closed -->
					{#if sidebarOpen.value === false && !isMobile.value}
						<Popover.Root>
							<Popover.Trigger class="w-full">
								<Sidebar.MenuButton>
									{#snippet tooltipContent()}{item.translation()}{/snippet}
									{@const Icon = item.icon}
									{#if Icon}<Icon />{/if}
									<span>{item.translation()}</span>
								</Sidebar.MenuButton>
							</Popover.Trigger>


							<Popover.Content
								side="right"
								align="start"
								class="w-fit max-w-80 p-1"
							>
								<Sidebar.Menu>
									<p class="p-1 text-xs font-bold text-albi-500">{item.translation()}</p>
									{#each item.children as subItem, j (subItem.field)}
										<SidebarRecursiveItem
											bind:item={sidebarItems[i].children[j]}
											level={1}
											onChildClick={(isHref) => {
												// FIX: Only close the popover if the clicked item was a link.
												if (isHref) {
													sidebarItems[i].popoverOpen = false;
												}
											}}
											{toggleOpen}
											{setRecursiveOpenState}
										/>
									{/each}
								</Sidebar.Menu>
							</Popover.Content>
						</Popover.Root>
					{:else}
						<!-- ================= RENDER OPEN SIDEBAR (Collapsible) ================= -->
						{#if item.children && item.children.length > 0}
							<ContextMenu.Root>
								<ContextMenu.Trigger oncontextmenu={(e) => e.stopPropagation()}>
									<Collapsible.Root
										open={sidebarItems[i].open}
										onOpenChange={() => toggleOpen(sidebarItems[i])}
										class="group/collapsible"
									>
										<Collapsible.Trigger class="w-full">
											<Sidebar.MenuButton>
												{@const Icon = item.icon}
												{#if Icon}<Icon />{/if}
												{#if item.href}
													<a
														href={item.href}
														class="w-fit hover:underline text-left line-clamp-1"
														onclick={(event) => {
															event.preventDefault();
															event.stopPropagation();
															handleTabClick(item, 0);
															goto(item.href);
														}}
													>
														{item.translation()}
													</a>
												{:else}
													<span>{item.translation()}</span>
												{/if}

												{#if item.open}
													<ChevronDown class="ml-auto h-4 w-4 transition-transform" />
												{:else}
													<ChevronRight class="ml-auto h-4 w-4 transition-transform" />
												{/if}
											</Sidebar.MenuButton>
										</Collapsible.Trigger>
										<Collapsible.Content>
											<Sidebar.MenuSub>
												{#each item.children as subItem, j (subItem.field)}
													<SidebarRecursiveItem
														bind:item={sidebarItems[i].children[j]}
														level={1}
														{toggleOpen}
														{setRecursiveOpenState}
													/>
												{/each}
											</Sidebar.MenuSub>
										</Collapsible.Content>
									</Collapsible.Root>
								</ContextMenu.Trigger>
								<SidebarContextMenu
									bind:sidebarItem={sidebarItems[i]}
									{setRecursiveOpenState}
								/>
							</ContextMenu.Root>
						{:else}
							<!-- Top-level item without children -->
							<ContextMenu.Root>
								<ContextMenu.Trigger>
									<Sidebar.MenuItem>
										<Sidebar.MenuButton>
											{@const Icon = item.icon}
											<a
												href={item.href}
												class="flex w-full items-center"
												data-sveltekit-preload-data="off"
												onclick={() => handleTabClick(item, 0)}
											>
												{#if Icon}<Icon />{/if}
												<span>{item.translation()}</span>
											</a>
										</Sidebar.MenuButton>
									</Sidebar.MenuItem>
								</ContextMenu.Trigger>
								<SidebarContextMenu
									bind:sidebarItem={sidebarItems[i]}
									{setRecursiveOpenState}
								/>
							</ContextMenu.Root>
						{/if}
					{/if}
				</div>
			{/each}
		{/if}
	</Sidebar.Menu>
</Sidebar.Group>
