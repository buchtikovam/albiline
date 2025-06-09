<script lang="ts">
	import {sidebarOpen} from '$lib/runes/sidebar.svelte.js';
	import {isMobile} from '$lib/runes/page.svelte.js';
	import {handleTabClick} from '$lib/utils/components/sidebar/handleTabClick';
	import {onMount} from 'svelte';
	import ChevronRight from 'lucide-svelte/icons/chevron-right';
	import ChevronDown from 'lucide-svelte/icons/chevron-down';
	import type {SidebarItem} from '$lib/types/components/sidebar/sidebar';
	import SidebarContextMenu from './SidebarContextMenu.svelte';
	import SidebarRecursiveItem from './SidebarRecursiveItem.svelte';
	import * as ContextMenu from '$lib/components/ui/context-menu';
	import * as Collapsible from '$lib/components/ui/collapsible';
	import * as Popover from '$lib/components/ui/popover';
	import * as Sidebar from '$lib/components/ui/sidebar';

	interface Props {
		sidebarItems: SidebarItem[];
	}

	let { sidebarItems = $bindable() }: Props = $props();

	let mounted = $state(false);

	onMount(() => {
		mounted = true;
	});

	function toggleOpen(item: SidebarItem) {
		item.open = !item.open;
	}
</script>



<Sidebar.Group>
	<Sidebar.Menu>
		{#if mounted}
			{#each sidebarItems as item (item.field)}
				<div class={item.hide ? 'hidden' : 'block'}>
					<!-- ================= RENDER CLOSED SIDEBAR (with Popovers) ================= -->
					{#if sidebarOpen.value === false && !isMobile.value}
						<Popover.Root bind:open={item.popoverOpen}>
							<Popover.Trigger class="w-full">
								<Sidebar.MenuButton>
									{#snippet tooltipContent()}
										{item.translation()}
									{/snippet}

									{@const Icon = item.icon}
									{#if Icon}
										<Icon />
									{/if}

									<span>{item.translation()}</span>
								</Sidebar.MenuButton>
							</Popover.Trigger>

							<Popover.Content
								side="right"
								align="start"
								class="w-fit max-w-80 p-1"
							>
								<Sidebar.Menu>
									<p class="p-1 text-xs font-bold text-albi-500">
										{item.translation()}
									</p>
									{#each item.children as subItem (subItem.field)}
										<SidebarRecursiveItem
											item={subItem}
											level={1}
											onChildClick={() => {
												item.popoverOpen = false;
											}}
											{toggleOpen}
										/>
									{/each}
								</Sidebar.Menu>
							</Popover.Content>
						</Popover.Root>
					{:else}
						<!-- ================= RENDER OPEN SIDEBAR (Collapsible) ================= -->
						{#if item.children && item.children.length > 0}
							<ContextMenu.Root>
								<ContextMenu.Trigger>
									<Collapsible.Root bind:open={item.open} class="group/collapsible">
										<Collapsible.Trigger class="w-full">
											<Sidebar.MenuButton>
												{@const Icon = item.icon}
												{#if Icon}
													<Icon />
												{/if}

												<span>
													{item.translation()}
												</span>

												{#if item.open}
													<ChevronDown class="ml-auto h-4 w-4 transition-transform" />
												{:else}
													<ChevronRight class="ml-auto h-4 w-4 transition-transform" />
												{/if}
											</Sidebar.MenuButton>
										</Collapsible.Trigger>

										<Collapsible.Content>
											<Sidebar.MenuSub>
												{#each item.children as subItem (subItem.field)}
													<SidebarRecursiveItem
														item={subItem}
														level={1}
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
												{#if Icon}
													<Icon />
												{/if}

												<span>
													{item.translation()}
												</span>
											</a>
										</Sidebar.MenuButton>
									</Sidebar.MenuItem>
								</ContextMenu.Trigger>
								<SidebarContextMenu sidebarItem={item} />
							</ContextMenu.Root>
						{/if}
					{/if}
				</div>
			{/each}
		{/if}
	</Sidebar.Menu>
</Sidebar.Group>
