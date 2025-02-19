<script lang="ts">
	import { handleTabClick } from '$lib/utils/components/sidebar/handleTabClick';
	import type { SidebarItem } from '$lib/types/components/sidebar/sidebar';
	import SidebarToggleButton from '$lib/components/sidebar/SidebarToggleButton.svelte';
	import ItemOpenFirstNoChild from './sidebar-items/ItemOpenFirstNoChild.svelte';
	import ItemOpenSecondNoChild from './sidebar-items/ItemOpenSecondNoChild.svelte';
	import ItemOpenThirdNoChild from './sidebar-items/ItemOpenThirdNoChild.svelte';
	import ContextMenuFavorite from '$lib/components/sidebar/ContextMenuFavorite.svelte';
	import * as Accordion from '$lib/components/ui/accordion';
	import * as ContextMenu from '$lib/components/ui/context-menu/index.js';
	import { goto } from '$app/navigation';

	import { Accordion as AccordionPrimitive } from "bits-ui";


	interface Props {
		searchTerm: string;
		filteredItems: SidebarItem[];
	}

	let {
		searchTerm,
		filteredItems = $bindable(),
	}: Props = $props();

	let disableTab = $state(false);
</script>



<Accordion.Root
	class="flex-1"
	type="multiple"
	value={searchTerm !== "" ? filteredItems.filter((child) => !child.hide).map((child) => child.field) : []}
>
	<div class="h-full overflow-auto text-sm">
		{#each filteredItems as item}
			<div class={(item.hide ? "hidden" : "") + " flex flex-col gap-2"}>
				<!-- accordiony první vrstvy (item má children položky) -->
				{#if item.children.length > 0 }
					<ContextMenu.Root>
						<Accordion.Item value={item.field}>
							<ContextMenu.Trigger>
								<Accordion.Trigger
									disabled={disableTab}
									class="hover:bg-muted/50 rounded-md flex-1 "
								>
									{@const Icon = item.icon}
									<a
										class="flex text-sm font-bold w-fit pl-0.5 items-center gap-3 text-albi-950 hover:text-black"
										onclick={() => {
											if (item.href) handleTabClick(item, 0);
										}}
										href={item.href}
										onmouseenter={() => {
											if (item.href) disableTab = true
										}}
										onmouseleave={() => {
											if (item.href) disableTab = false

										}}
									>
										<Icon class="size-5"/>
										{ item.translation() }
									</a>
								</Accordion.Trigger>
							</ContextMenu.Trigger>

							<Accordion.Content class="px-2">
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
																class="flex text-sm font-medium w-full items-center gap-3 rounded-lg px-2 py-1.5 text-albi-950 hover:text-black">
																<a
																	href={secondChild.href}
																	onclick={() => handleTabClick(secondChild, 1)}
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
																		<ItemOpenThirdNoChild item={thirdChild} isMobile={false} isMobileSidebarOpen={false} />
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
											<ItemOpenSecondNoChild
												item={secondChild}
												isMobile={false}
												isMobileSidebarOpen={false}
											/>
										{/if}
									{/each}
								</Accordion.Root>
							</Accordion.Content>
						</Accordion.Item>

						<ContextMenuFavorite
							field={item.field}
						/>
					</ContextMenu.Root>

				{:else}
					<!-- accordiony první vrstvy (item nemá children položky) -->
					<ItemOpenFirstNoChild
						item={item}
						isMobile={false}
						isMobileSidebarOpen={false}
					/>
				{/if}
			</div>
		{/each}
	</div>
</Accordion.Root>


<div class="mt-auto ml-auto pt-4 hidden md:block">
	<SidebarToggleButton/>
</div>
