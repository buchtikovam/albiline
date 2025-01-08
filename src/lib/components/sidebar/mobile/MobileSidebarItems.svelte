<script lang="ts">
	import { handleTabClick } from '$lib/utils/components/sidebar/handleTabClick';
	import * as Accordion from '$lib/components/ui/accordion';
	import * as ContextMenu from '$lib/components/ui/context-menu/index.js';
	import ItemOpenFirstNoChild from '$lib/components/sidebar/sidebar-items/ItemOpenFirstNoChild.svelte';
	import ItemOpenSecondNoChild from '$lib/components/sidebar/sidebar-items/ItemOpenSecondNoChild.svelte';
	import ItemOpenThirdNoChild from '$lib/components/sidebar/sidebar-items/ItemOpenThirdNoChild.svelte';
	import ContextMenuContent from '$lib/components/sidebar/ContextMenuFavorite.svelte';
	import type { SidebarItem } from '$lib/types/components/sidebar/sidebar';
	import ContextMenuFavorite from '$lib/components/sidebar/ContextMenuFavorite.svelte';
	import MobileFavoritesButton from '$lib/components/sidebar/mobile/MobileFavoritesButton.svelte';
	import { isMobile } from '$lib/runes/page.svelte';

	interface Props {
		searchTerm: string;
		filteredItems: SidebarItem[];
		isOpen: boolean;
	}


	let { searchTerm, filteredItems = $bindable(), isOpen = $bindable() }: Props = $props();

	let isMobileSidebar = $derived(isMobile.value);
</script>



<Accordion.Root
	class="flex-1 overflow-auto"
	type="multiple"
	value={searchTerm !== "" ? filteredItems.filter((child) => !child.hide).map((child) => child.field) : []}
>
	<div class="text-sm">
		{#each filteredItems as item}

			<div class={(item.hide ? "hidden" : "") + " flex flex-col gap-2"}>
				<!-- accordiony první vrstvy (item má children položky) -->
				{#if item.children.length > 0 }
					<ContextMenu.Root>
						<Accordion.Item value={item.field}>
							<ContextMenu.Trigger class="flex hover:bg-muted/50 rounded-md w-full justify-between">
								<div class="block w-full">
									<Accordion.Trigger class="!flex-1 !w-full">
										{@const Icon = item.icon}
										<div
											class="flex text-sm font-bold w-full items-center gap-3 rounded-lg text-albi-950 hover:text-black">
											<Icon />
											<a
												href={"#"}
												onclick={() => {
													handleTabClick(item, 0);
													isOpen = false;
												}}
											>
												{ item.translation() }
											</a>
										</div>
									</Accordion.Trigger>
								</div>

<!--								<MobileFavoritesButton field={item.field} />-->
							</ContextMenu.Trigger>

							<Accordion.Content class="px-2 ">
								<!-- accordiony druhé vrstvy -->
								<Accordion.Root
									type="multiple"
									value={searchTerm !== "" ? item.children.filter((child) => !child.hide).map((child) => child.field) : []}
								>
									{#each item.children.filter((child) => !child.hide) as secondChild}
										<!-- accordiony druhé vrstvy (child item má children položky) -->
										{#if secondChild.children.length > 0}
											<ContextMenu.Root>
												<Accordion.Item value={secondChild.field}>
													<ContextMenu.Trigger>
														<Accordion.Trigger
															class="hover:bg-muted/50 rounded-md flex-1">
															<div
																class="flex text-sm font-medium w-full items-center gap-3 rounded-lg px-3 py-2 text-albi-950 hover:text-black">
																<a
																	href={secondChild.href}
																	onclick={() => {
																		handleTabClick(secondChild, 1)
																		isOpen = false;
																	}}
																>
																	{ item.translation() }
																</a>
															</div>
														</Accordion.Trigger>
													</ContextMenu.Trigger>

													<Accordion.Content>
														<!-- accordiony třetí vrstvy -->
														<div class="flex flex-col px-2">
															<ContextMenu.Root>
																<Accordion.Root
																	type="multiple"
																	value={searchTerm !== "" ? secondChild.children.filter((child) => !child.hide).map((child) => child.field) : []}
																>
																	{#each secondChild.children.filter((child) => !child.hide) as thirdChild}
																		<ItemOpenThirdNoChild item={thirdChild} bind:isMobileSidebarOpen={isOpen} isMobile={isMobileSidebar} />
																	{/each}
																</Accordion.Root>
															</ContextMenu.Root>
														</div>
													</Accordion.Content>
												</Accordion.Item>

												<ContextMenuFavorite field={secondChild.field} />
											</ContextMenu.Root>
										{:else}
											<!-- accordiony druhé vrstvy (child item nemá children položky) -->
											<ItemOpenSecondNoChild item={secondChild} bind:isMobileSidebarOpen={isOpen} isMobile={isMobileSidebar}/>
										{/if}
									{/each}
								</Accordion.Root>
							</Accordion.Content>
						</Accordion.Item>

						<ContextMenuFavorite field={item.field} />
					</ContextMenu.Root>

				{:else}
					<!-- accordiony první vrstvy (item nemá children položky) -->
					<ItemOpenFirstNoChild item={item} bind:isMobileSidebarOpen={isOpen} isMobile={isMobileSidebar}/>
				{/if}
			</div>
		{/each}
	</div>
</Accordion.Root>
