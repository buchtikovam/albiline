<script lang="ts">
	// import SidebarToggleButton from '$lib/components/sidebar/SidebarToggleButton.svelte';
	// import { handleTabClick } from '$lib/utils/components/sidebar/handleTabClick';
	import * as Accordion from '$lib/components/ui/accordion';
	import * as ContextMenu from '$lib/components/ui/context-menu/index.js';
	import ItemOpenFirstNoChild from './sidebar-items/ItemOpenFirstNoChild.svelte';
	// import ItemOpenSecondNoChild from './sidebar-items/ItemOpenSecondNoChild.svelte';
	// import ItemOpenThirdNoChild from './sidebar-items/ItemOpenThirdNoChild.svelte';
	// import ContextMenuContent from '$lib/components/sidebar/ContextMenuFavorite.svelte';
	import type { SidebarItem } from '$lib/types/components/sidebar/sidebar';
	import { ContextMenuContent } from '$lib/components/ui/context-menu/index.js';
	import ContextMenuFavorite from '$lib/components/sidebar/ContextMenuFavorite.svelte';
	import { handleTabClick } from '$lib/utils/components/sidebar/handleTabClick';

	interface Props {
		searchTerm: string;
		translations: { [key: string]: string };
		filteredItems: SidebarItem[];
		isSidebarOpen: boolean;
	}

	let {
		searchTerm,
		filteredItems = $bindable(),
		translations,
		isSidebarOpen = $bindable() }: Props = $props();
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
								<Accordion.Trigger class="hover:bg-muted/50 rounded-md flex-1">
									{@const Icon = item.icon}
									<div
										class="flex text-sm font-bold w-full items-center gap-3 rounded-lg text-albi-950 hover:text-black">
										<Icon />
										<a
											href={"#"}
											onclick={() => handleTabClick(item, 0)}
										>
											{translations[item.field]}
										</a>
									</div>
								</Accordion.Trigger>
							</ContextMenu.Trigger>

<!--							<Accordion.Content class="px-2 ">-->
<!--								&lt;!&ndash; accordiony druhé vrstvy &ndash;&gt;-->
<!--								<Accordion.Root-->
<!--									multiple-->
<!--									value={searchTerm !== "" ? item.children.filter((child) => !child.hide).map((child) => child.field) : []}-->
<!--								>-->
<!--									{#each item.children.filter((child) => !child.hide) as secondChild}-->
<!--										&lt;!&ndash; accordiony druhé vrstvy (child item má children položky) &ndash;&gt;-->
<!--										{#if secondChild.children.length > 0}-->
<!--											<ContextMenu.Root>-->
<!--												<Accordion.Item value={secondChild.field}>-->
<!--													<ContextMenu.Trigger>-->
<!--														<Accordion.Trigger-->
<!--															class="hover:bg-muted/50 rounded-md flex-1">-->
<!--															<div-->
<!--																class="flex text-sm font-medium w-full items-center gap-3 rounded-lg px-3 py-2 text-albi-950 hover:text-black">-->
<!--																<a-->
<!--																	href={secondChild.href}-->
<!--																	onclick={() => handleTabClick(secondChild, 1)}-->
<!--																>-->
<!--																	&lt;!&ndash;{$_('components.sidebar.' + secondChild.field)}&ndash;&gt;-->
<!--																</a>-->
<!--															</div>-->
<!--														</Accordion.Trigger>-->
<!--													</ContextMenu.Trigger>-->

<!--													<Accordion.Content>-->
<!--														&lt;!&ndash; accordiony třetí vrstvy &ndash;&gt;-->
<!--														<div class="flex flex-col px-2">-->
<!--															<ContextMenu.Root>-->
<!--																<Accordion.Root-->
<!--																	multiple-->
<!--																	value={searchTerm !== "" ? secondChild.children.filter((child) => !child.hide).map((child) => child.field) : []}-->
<!--																>-->
<!--																	{#each secondChild.children.filter((child) => !child.hide) as thirdChild}-->
<!--																		<ItemOpenThirdNoChild isMobile={false} item={thirdChild} />-->
<!--																	{/each}-->
<!--																</Accordion.Root>-->
<!--															</ContextMenu.Root>-->
<!--														</div>-->
<!--													</Accordion.Content>-->
<!--												</Accordion.Item>-->

<!--												<ContextMenuContent itemValue={secondChild.field} />-->
<!--											</ContextMenu.Root>-->
<!--										{:else}-->
<!--											&lt;!&ndash; accordiony druhé vrstvy (child item nemá children položky) &ndash;&gt;-->
<!--											<ItemOpenSecondNoChild isMobile={false} item={secondChild} />-->
<!--										{/if}-->
<!--									{/each}-->
<!--								</Accordion.Root>-->
<!--							</Accordion.Content>-->
						</Accordion.Item>

						<ContextMenuFavorite itemValue={item.field} />
					</ContextMenu.Root>

				{:else}
					<!-- accordiony první vrstvy (item nemá children položky) -->
					<ItemOpenFirstNoChild item={item} value={translations[item.field] || item.field}/>
				{/if}
			</div>
		{/each}
	</div>
</Accordion.Root>

<div class="mt-auto ml-auto pt-4 hidden md:block">
<!--	<SidebarToggleButton bind:isSidebarOpen/>-->
</div>
