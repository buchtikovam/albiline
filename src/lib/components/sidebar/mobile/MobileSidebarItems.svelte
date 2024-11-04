<script lang="ts">
	import { handleTabClick } from '$lib/utils/components/sidebar/handleTabClick';
	import * as Accordion from '$lib/components/ui/accordion';
	import * as ContextMenu from '$lib/components/ui/context-menu/index.js';
	import ItemOpenFirstNoChild from '$lib/components/sidebar/sidebar-items/ItemOpenFirstNoChild.svelte';
	import ItemOpenSecondNoChild from '$lib/components/sidebar/sidebar-items/ItemOpenSecondNoChild.svelte';
	import ItemOpenThirdNoChild from '$lib/components/sidebar/sidebar-items/ItemOpenThirdNoChild.svelte';
	import ContextMenuContent from '$lib/components/sidebar/ContextMenuFavorite.svelte';
	import type { SidebarItem } from '$lib/types/components/sidebar/sidebar';

	export let searchTerm: string;
	export let filteredItems: SidebarItem[];
	export let isOpen: boolean;

	let isMobile = true;
</script>



<Accordion.Root
	class="flex-1 overflow-auto"
	multiple
	value={searchTerm !== "" ? filteredItems.filter((child) => !child.hide).map((child) => child.value) : []}
>
	<div class="text-sm">
		{#each filteredItems as item}
			<div class={(item.hide ? "hidden" : "") + " flex flex-col gap-2"}>
				<!-- accordiony první vrstvy (item má children položky) -->
				{#if item.children.length > 0 }
					<ContextMenu.Root>
						<Accordion.Item value={item.value}>
							<ContextMenu.Trigger>
								<Accordion.Trigger class="hover:bg-muted/50 rounded-md">
									<div
										class="flex text-sm font-bold w-full items-center gap-3 rounded-lg px-2 py-2 text-albi-950 hover:text-black">
										<svelte:component this={item.icon} />
										<a
											href={item.href}
											on:click={() => {
												handleTabClick(item, 0);
												isOpen = false;
											}}
										>
											{item.name}
										</a>
									</div>
								</Accordion.Trigger>
							</ContextMenu.Trigger>

							<Accordion.Content class="px-2 ">
								<!-- accordiony druhé vrstvy -->
								<Accordion.Root
									multiple
									value={searchTerm !== "" ? item.children.filter((child) => !child.hide).map((child) => child.value) : []}
								>
									{#each item.children.filter((child) => !child.hide) as secondChild}
										<!-- accordiony druhé vrstvy (child item má children položky) -->
										{#if secondChild.children.length > 0}
											<ContextMenu.Root>
												<Accordion.Item value={secondChild.value}>
													<ContextMenu.Trigger>
														<Accordion.Trigger
															class="hover:bg-muted/50 rounded-md">
															<div
																class="flex text-sm font-medium w-full items-center gap-3 rounded-lg px-2 py-2 text-albi-950 hover:text-black">
																<a
																	href={secondChild.href}
																	on:click={() => {
																		handleTabClick(secondChild, 1);
																		isOpen = false;
																	}}
																>
																	{secondChild.name}
																</a>
															</div>
														</Accordion.Trigger>
													</ContextMenu.Trigger>

													<Accordion.Content>
														<!-- accordiony třetí vrstvy -->
														<div class="flex flex-col px-2">
															<ContextMenu.Root>
																<Accordion.Root
																	multiple
																	value={searchTerm !== "" ? secondChild.children.filter((child) => !child.hide).map((child) => child.value) : []}
																>
																	{#each secondChild.children.filter((child) => !child.hide) as thirdChild}
																		<ItemOpenThirdNoChild item={thirdChild} isMobile bind:isOpen/>
																	{/each}
																</Accordion.Root>
															</ContextMenu.Root>
														</div>
													</Accordion.Content>
												</Accordion.Item>

												<ContextMenuContent itemValue={secondChild.value} />
											</ContextMenu.Root>
										{:else}
											<!-- accordiony druhé vrstvy (child item nemá children položky) -->
											<ItemOpenSecondNoChild item={secondChild} isMobile bind:isOpen/>
										{/if}
									{/each}
								</Accordion.Root>
							</Accordion.Content>
						</Accordion.Item>

						<ContextMenuContent itemValue={item.value} />
					</ContextMenu.Root>

				{:else}
					<!-- accordiony první vrstvy (item nemá children položky) -->
					<ItemOpenFirstNoChild item={item} isMobile bind:isOpen/>
				{/if}
			</div>
		{/each}
	</div>
</Accordion.Root>
