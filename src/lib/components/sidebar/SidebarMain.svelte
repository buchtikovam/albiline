<script lang="ts">
	import {sidebarOpen} from "$lib/runes/sidebar.svelte.js";
	import {isMobile} from "$lib/runes/page.svelte.js";
	import {handleTabClick} from "$lib/utils/components/sidebar/handleTabClick";
	import {onMount} from "svelte";
	import ChevronRight from "lucide-svelte/icons/chevron-right";
	import type {SidebarItem} from "$lib/types/components/sidebar/sidebar";
	import ContextMenuFavorite from "$lib/components/sidebar/ContextMenuFavorite.svelte";
	import * as ContextMenu from '$lib/components/ui/context-menu';
	import * as Collapsible from "$lib/components/ui/collapsible";
	import * as Popover from "$lib/components/ui/popover";
	import * as Sidebar from "$lib/components/ui/sidebar";
	import ChevronDown from "lucide-svelte/icons/chevron-down";

	interface Props {
		sidebarItems: SidebarItem[];
	}

	let {
		sidebarItems = $bindable()
	}: Props = $props();


	let openSidebar = $state();
	let mounted = $state(false)


	onMount(() => {
		openSidebar = sidebarOpen.value;
		mounted = true;
	})


	$effect(() => {
		if (mounted) {
			openSidebar = sidebarOpen.value;
		}
	})
</script>




<Sidebar.Group>
	<Sidebar.Menu>
		{#each sidebarItems as item (item.field)}
			<Collapsible.Root
				bind:open={item.open}
				class="group/collapsible"
			>
				{#snippet child({ props })}
					<Sidebar.MenuItem {...props} class={item.hide ? "hidden" : "block"}>

						<!-- closed sidebar -->

						{#if openSidebar === false && !isMobile.value}
							<Popover.Root bind:open={item.popoverOpen}>
								<Popover.Trigger >
									<Collapsible.Trigger>
										{#snippet child({ props })}
											<Sidebar.MenuButton {...props}>
												{#snippet tooltipContent()}
													{item.translation()}
												{/snippet}

												{@const Icon = item.icon}
												{#if item.icon}
													<Icon />
												{/if}

												<span>
													{item.translation()}
												</span>

												{#if item.open}
													<ChevronDown
														class="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"
													/>

												{:else}
													<ChevronRight
														class="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"
													/>
												{/if}

											</Sidebar.MenuButton>
										{/snippet}
									</Collapsible.Trigger>
								</Popover.Trigger>

								<Popover.Content
									side="right"
									align="start"
									class="w-fit max-w-80 p-1"
								>
									<Sidebar.Menu>
										<p class="text-xs font-bold text-albi-500 p-1">
											{item.translation()}
										</p>

										{#each item.children as subItem (subItem.field)}
											{#if subItem.children.length > 0}

												<Collapsible.Root open={true}>
													<Collapsible.Trigger>
														{#snippet child({ props })}
															<Sidebar.MenuButton {...props}>
																{#snippet tooltipContent()}
																	{subItem.translation()}
																{/snippet}

																{@const Icon = subItem.icon}
																{#if subItem.icon}
																	<Icon />
																{/if}

																<span>
																	{subItem.translation()}
																</span>

																{#if subItem.open}
																	<ChevronDown
																		class="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"
																	/>

																{:else}
																	<ChevronRight
																		class="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"
																	/>
																{/if}

															</Sidebar.MenuButton>
														{/snippet}
													</Collapsible.Trigger>


													<Collapsible.Content>
														<Sidebar.MenuSub>
															{#each subItem.children as subSubItem(subSubItem.field)}

																<ContextMenu.Root>
																	<ContextMenu.Trigger>
																		<Sidebar.MenuSubItem>
																			<Sidebar.MenuSubButton>
																				{#snippet child({ props })}
																					<a
																						href={subSubItem.href}
																						data-sveltekit-preload-data="off"
																						onclick={() => {
																							handleTabClick(subSubItem, 2);
																						}}
																						{...props}
																					>
																						<span>
																							{subSubItem.translation()}
																						</span>
																					</a>
																				{/snippet}
																			</Sidebar.MenuSubButton>
																		</Sidebar.MenuSubItem>
																	</ContextMenu.Trigger>

																	<ContextMenuFavorite
																		field={subItem.field}
																	/>
																</ContextMenu.Root>
															{/each}
														</Sidebar.MenuSub>
													</Collapsible.Content>
												</Collapsible.Root>
											{:else}
												<ContextMenu.Root>
													<ContextMenu.Trigger class={subItem.hide ? "hidden" : ""}>
														<Sidebar.MenuItem>
															<Sidebar.MenuSubButton>
																{#snippet child({ props })}
																	<a
																		href={subItem.href}
																		onclick={() => {
																		item.popoverOpen = false;
																		handleTabClick(subItem, 1);
																	}}
																		{...props}
																	>
																	<span>
																		{subItem.translation()}
																	</span>
																	</a>
																{/snippet}
															</Sidebar.MenuSubButton>
														</Sidebar.MenuItem>
													</ContextMenu.Trigger>

													<ContextMenuFavorite
														field={subItem.field}
													/>
												</ContextMenu.Root>
											{/if}



										{/each}
									</Sidebar.Menu>
								</Popover.Content>
							</Popover.Root>
						{:else}

							<!-- open sidebar -->

							<Collapsible.Trigger>
								{#snippet child({ props })}
									<Sidebar.MenuButton {...props}>
										{#snippet tooltipContent()}
											{item.translation()}
										{/snippet}

										{@const Icon = item.icon}
										{#if item.icon}
											<Icon />
										{/if}

										<span>
											{item.translation()}
										</span>

										{#if item.open}
											<ChevronDown
												class="ml-auto"
											/>
										{:else}
											<ChevronRight
												class="ml-auto "
											/>
										{/if}
									</Sidebar.MenuButton>
								{/snippet}
							</Collapsible.Trigger>
						{/if}


						<Collapsible.Content >
							{#if item.children.length > 0}
								<Sidebar.MenuSub>
									{#each item.children as subItem (subItem.field)}
										{#if subItem.children.length > 0}
											<Collapsible.Root
												bind:open={subItem.open}
												class="group/collapsible"
											>
												<Sidebar.MenuSubItem class={subItem.hide ? "hidden" : "block"}>
													<Collapsible.Trigger class="w-full">
														<Sidebar.MenuSubButton {...props}>
															<!--{#snippet tooltipContent()} todo -->
															<!--	{subItem.translation()}-->
															<!--{/snippet}-->

															{@const Icon = subItem.icon}
															{#if subItem.icon}
																<Icon />
															{/if}

															<span>
																{subItem.translation()}
															</span>

															{#if subItem.open}
																<ChevronDown
																	class="ml-auto "
																/>
															{:else}
																<ChevronRight
																	class="ml-auto "
																/>
															{/if}
														</Sidebar.MenuSubButton>
													</Collapsible.Trigger>
												</Sidebar.MenuSubItem>


												<Collapsible.Content>
													{#if subItem.children.length > 0}
														<Sidebar.MenuSub>
															{#each subItem.children as subSubItem (subSubItem.field)}
																<ContextMenu.Root>
																	<ContextMenu.Trigger class={subSubItem.hide ? "hidden" : ""}>
																		<Sidebar.MenuSubItem>
																			<Sidebar.MenuSubButton>
																				{#snippet child({ props })}
																					<a
																						href={subSubItem.href}
																						data-sveltekit-preload-data="off"
																						onclick={() => {
																							handleTabClick(subSubItem, 2);
																						}}
																						{...props}
																					>

																					<span>
																						{subSubItem.translation()}
																					</span>

																					</a>
																				{/snippet}
																			</Sidebar.MenuSubButton>
																		</Sidebar.MenuSubItem>
																	</ContextMenu.Trigger>


																	<ContextMenuFavorite
																		field={subSubItem.field}
																	/>
																</ContextMenu.Root>
															{/each}
														</Sidebar.MenuSub>
													{/if}

												</Collapsible.Content>
											</Collapsible.Root>
										{:else}
											<ContextMenu.Root>
												<ContextMenu.Trigger class={subItem.hide ? "hidden" : ""}>
													<Sidebar.MenuSubItem>
														<Sidebar.MenuSubButton>
															{#snippet child({ props })}
																<a
																	href={subItem.href}
																	onclick={() => {
																		handleTabClick(subItem, 1);
																	}}
																	{...props}
																>
																	<span>
																		{subItem.translation()}
																	</span>
																</a>
															{/snippet}
														</Sidebar.MenuSubButton>
													</Sidebar.MenuSubItem>
												</ContextMenu.Trigger>

												<ContextMenuFavorite
													field={subItem.field}
												/>
											</ContextMenu.Root>
										{/if}
									{/each}
								</Sidebar.MenuSub>
							{/if}
						</Collapsible.Content>
					</Sidebar.MenuItem>
				{/snippet}
			</Collapsible.Root>
		{/each}
	</Sidebar.Menu>
</Sidebar.Group>
