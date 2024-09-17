<script lang="ts">
	import { handleTabClick } from '$lib/utils/handleTabClick';
	import type { SidebarItem } from '$lib/types/sidebar/sidebar';
	import { get } from 'svelte/store';
	import {
		sidebarStateStore,
		recentItemsStore,
		favoriteItemsStore,
		activeCategoryStore
	} from '$lib/stores/sidebarStore';
	import { allItems } from '$lib/data/sidebar';
	import { Separator } from '$lib/components/ui/separator';
	import { Input } from '$lib/components/ui/input';
	import { onMount } from 'svelte';
	import { buttonBorderSwitch } from '$lib/utils/buttonBorderSwitch';
	import deepcopy from 'deepcopy';
	import Search from 'lucide-svelte/icons/search';
	import CategoryButton from '$lib/components/sidebar/SidebarCategoryTabs.svelte';
	import ContextMenuContent from '$lib/components/sidebar/ContextMenuFavorite.svelte';
	import SidebarCommand from '$lib/components/sidebar/SidebarCommand.svelte';
	import SidebarToggleButton from '$lib/components/sidebar/SidebarToggleButton.svelte';
	import * as Accordion from '$lib/components/ui/accordion';
	import * as Tooltip from '$lib/components/ui/tooltip';
	import * as Popover from '$lib/components/ui/popover';
	import * as ContextMenu from '$lib/components/ui/context-menu/index.js';
	import { goto } from '$app/navigation';
	import SidebarItemOpenNoChild from './SidebarItemOpenNoChild.svelte';


	/*
		Resizeble sidebar se třemi kategoriemi,
		tlačítky pro přepínání kategorií a inputem
	*/

	let isSidebarCommandOpen: boolean = false;
	let isSidebarOpen: boolean = true;

	// otevírání sidebaru
	sidebarStateStore.subscribe(data => {
		isSidebarOpen = data; 
	});

	// otevírání vyhledávání v dialogu
	function openSidebarCommand() {
		isSidebarCommandOpen = !isSidebarCommandOpen;
	}

	let recentItemValues: string[] = [];
	let favoriteItemValues: string[] = [];
	let filteredItems: SidebarItem[] = deepcopy(allItems);
	let searchTerm = '';

	recentItemsStore.subscribe(recentItems => {
		recentItemValues = recentItems;
	});

	favoriteItemsStore.subscribe(favoriteItems => {
		// znovu načtění itemů po odebrání položky z favorites
		if (favoriteItemValues.length > favoriteItems.length) {
			filteredItems = deepcopy(filterItemsSearch(
				deepcopy(filterItemsCategory(deepcopy(allItems), favoriteItems)),
				searchTerm
			));
		}

		favoriteItemValues = favoriteItems;
	});


	// změna kontentu sidebaru na základě kategorií
	function filterItemsCategory(items: SidebarItem[], itemsValues: string[]): SidebarItem[] {
		if (itemsValues.length === 0) {
			return [];
		}

		return items
			.filter((item: SidebarItem): boolean => {
				item.open = false;
				item.hide = itemsValues.includes(item.value) !== true;
				item.children = filterItemsCategory(item.children, itemsValues);
				if (item.children.some((child) => child.hide === false)) {
					item.hide = false;
				}

				return item.hide === false;
			});
	}


	// vyhledávání přes input v sidebaru pomocí rekurzivního filtrování
	function search(searchTerm: string): void {
		const activeCategoryStoreData = get(activeCategoryStore);

		if (activeCategoryStoreData === '' || activeCategoryStoreData === 'all') {
			filteredItems = deepcopy(filterItemsSearch(deepcopy(allItems), searchTerm));
		}

		if (activeCategoryStoreData === 'recent') {
			filteredItems = deepcopy(filterItemsSearch(
				deepcopy(filterItemsCategory(deepcopy(allItems), recentItemValues)),
				searchTerm
			));
		}

		if (activeCategoryStoreData === 'favorite') {
			filteredItems = deepcopy(filterItemsSearch(
				deepcopy(filterItemsCategory(deepcopy(allItems), favoriteItemValues)),
				searchTerm
			));
		}
	}


	function filterItemsSearch(items: SidebarItem[], searchTerm: string): SidebarItem[] {
		if (searchTerm === '') {
			return items;
		}

		return items.map((item: SidebarItem): SidebarItem => {
			item.open = false;
			item.hide = true;

			if (item.name.toLowerCase().includes(searchTerm.toLowerCase()) === true) {
				item.open = true;
				item.hide = false;
			}

			item.children = filterItemsSearch(item.children, searchTerm);

			if (item.children.some((child) => child.hide === false)) {
				item.open = true;
				item.hide = false;
			}

			return item;
		});
	}


	// event listener pro otevření vyhledávání v dialogu po zmáčknutí CTRL+F, nastavení sidebaru podle aktivní kategorie
	onMount(() => {
		function handleKeydown(e: KeyboardEvent) {
			if (e.key === 'd' && (e.metaKey || e.ctrlKey)) {
				e.preventDefault();
				isSidebarCommandOpen = !isSidebarCommandOpen;
			}
		}

		document.addEventListener('keydown', handleKeydown);

		activeCategoryStore.subscribe(data => {
			if (data === '' || data === 'all') {
				filteredItems = deepcopy(filterItemsSearch(deepcopy(allItems), searchTerm));
				buttonBorderSwitch();
			}

			if (data === 'recent') {
				filteredItems = deepcopy(filterItemsSearch(
					deepcopy(filterItemsCategory(deepcopy(allItems), recentItemValues)),
					searchTerm
				));
				buttonBorderSwitch();
			}

			if (data === 'favorite') {
				filteredItems = deepcopy(filterItemsSearch(
					deepcopy(filterItemsCategory(deepcopy(allItems), favoriteItemValues)),
					searchTerm
				));
				buttonBorderSwitch();
			}
		});
		}
	);
</script>



<div class="
	{isSidebarOpen ? "w-[320px] p-4" : "w-fit p-2"}
	flex flex-col h-full overflow-auto bg-white rounded-lg border border-albi-200 "
>
	<!-- otevřený sidebar (buttons na překlikávání kategorií, input pole a stromová struktura sidebaru) -->
	{#if isSidebarOpen === true}
		<div class="flex justify-center text-sm mb-4">
			<CategoryButton  />
		</div>

		<div class="flex-1 flex flex-col">
			<Input
				class="mb-4"
				placeholder="Vyhledat..."
				bind:value={searchTerm}
				on:input={() => search(searchTerm)}
			/>

			<Accordion.Root
				class="flex-1"
				multiple
				value={searchTerm !== "" ? filteredItems.filter((child) => !child.hide).map((child) => child.value) : []}
			>
				<div class="h-full overflow-auto text-sm">
					{#each filteredItems as item}
						<div class={(item.hide ? "hidden" : "") + " flex flex-col gap-2"}>
							<!-- accordiony první vrstvy (item má children položky) -->
							{#if item.children.length > 0 }
								<ContextMenu.Root>

									<Accordion.Item value={item.value}>
										<ContextMenu.Trigger>
											<Accordion.Trigger class="hover:bg-muted/50 rounded-md">
												<div
													class="flex text-sm font-bold w-full items-center gap-3 rounded-lg px-2 py-2 text-muted-foreground/75 hover:text-primary">
													<svelte:component this={item.icon} />
													<a
														href={item.href}
														on:click={() => handleTabClick(item, 0)}
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
																			class="flex text-sm font-medium w-full items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground/75 transition-all hover:text-primary">
																			<a
																				href={secondChild.href}
																				on:click={() => handleTabClick(secondChild, 1)}
																			>
																				{secondChild.name}
																			</a>
																		</div>
																	</Accordion.Trigger>
																</ContextMenu.Trigger>

																<Accordion.Content>
																	<div class="flex flex-col px-2">
																		<!-- Accordiony třetí vrstvy -->
																		<ContextMenu.Root>
																			<Accordion.Root
																				multiple
																				value={searchTerm !== "" ? secondChild.children.filter((child) => !child.hide).map((child) => child.value) : []}
																			>
																				{#each secondChild.children.filter((child) => !child.hide) as thirdChild}
																					<ContextMenu.Trigger>
																						<Accordion.Item
																							value={thirdChild.value}
																							class="hover:bg-muted/50 rounded-md"
																						>
																							<a
																								href="{thirdChild.href}"
																								on:click={() => handleTabClick(thirdChild, 2)}
																								class="flex text-sm font-medium w-full items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground/75 transition-all hover:text-primary"
																							>
																								{thirdChild.name}
																							</a>
																						</Accordion.Item>
																					</ContextMenu.Trigger>
																					<ContextMenuContent
																						itemValue={thirdChild.value} />
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
														<ContextMenu.Root>
															<ContextMenu.Trigger>
																<Accordion.Item
																	value={secondChild.value}
																	class="hover:bg-muted/50 rounded-md"
																>
																	<a
																		href="{secondChild.href}"
																		on:click={() => handleTabClick(secondChild, 1)}
																		class="flex text-sm font-medium w-full items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground/75 transition-all hover:text-primary"
																	>
																		{secondChild.name}
																	</a>
																</Accordion.Item>
															</ContextMenu.Trigger>

															<ContextMenuContent itemValue={secondChild.value} />
														</ContextMenu.Root>
													{/if}
												{/each}
											</Accordion.Root>
										</Accordion.Content>
									</Accordion.Item>

									<ContextMenuContent itemValue={item.value} />
								</ContextMenu.Root>

							{:else}
								<!-- accordiony první vrstvy (item nemá children položky) -->
								<SidebarItemOpenNoChild item={item}/>
							{/if}
						</div>
					{/each}
				</div>
			</Accordion.Root>

			<div class="mt-auto ml-auto pt-4">
				<SidebarToggleButton bind:isSidebarOpen />
			</div>
		</div>
		<!-- konec otevřeného sidebaru-->
	{:else}
		<!-- zavřený sidebar (ikony s tooltipem a popoverem) -->
		<div class="flex-1">
			<nav class="grid pt-4 gap-2 justify-center">
				<Tooltip.Root openDelay={250}>
					<Tooltip.Trigger>
						<button
							on:click={openSidebarCommand}
							class="m-auto mb-2 text-muted-foreground/75 hover:bg-muted/50 transition-all hover:text-primary"
						>
							<Search />
						</button>
					</Tooltip.Trigger>

					<Tooltip.Content class="ml-10 mt-10">
						Vyhledat
					</Tooltip.Content>
				</Tooltip.Root>

				<Separator class="mx-auto w-8"/>

				{#each filteredItems as item}
					<!-- item s children položkami. Po najetí myši ukáže tooltip a po kliknutí popover se všemi children položkami -->
					{#if item.children.length > 0}
						<Tooltip.Root openDelay={100}>
							<Tooltip.Trigger>

								<Popover.Root>
									<Popover.Trigger>
										<div
											class="flex text-sm font-medium  items-center gap-3 rounded-lg p-2 text-muted-foreground/75 hover:bg-muted/50 transition-all hover:text-primary">
											<svelte:component this={item.icon} />
										</div>
									</Popover.Trigger>

									<Popover.Content class="flex flex-col px-1 py-1 ml-12 -mt-10 text-sm w-fit ">
										{#each item.children as child}
											<a
												href={child.href}
												class="hover:bg-muted/50 rounded px-2 py-1.5"
												on:click={() => handleTabClick(child, 1)}
											>
												{child.name}
											</a>

											{#if child.children.length > 0}
												{#each child.children as scndChild}
													<a
														href={scndChild.href}
														class="hover:bg-muted/50 rounded pr-2 pl-6 py-1.5"
														on:click={() => handleTabClick(scndChild, 2)}
													>
														{scndChild.name}
													</a>
												{/each}
											{/if}
										{/each}
									</Popover.Content>
								</Popover.Root>
							</Tooltip.Trigger>

							<Tooltip.Content class="ml-10 mt-10">
								{item.name}
							</Tooltip.Content>
						</Tooltip.Root>

						<!-- item bez children položek. Po najetí myši ukáže tooltip -->
					{:else }
						<Tooltip.Root openDelay={250}>
							<Tooltip.Trigger>
								<a
									href={item.href}
									class="flex text-sm font-medium items-center gap-3 rounded-lg px-2 py-2 text-muted-foreground/75 hover:bg-muted/50 transition-all hover:text-primary"
									on:click={() => handleTabClick(item, 0)}
								>
									<svelte:component this={item.icon} />
								</a>
							</Tooltip.Trigger>

							<Tooltip.Content class="ml-10 mt-10">
								{item.name}
							</Tooltip.Content>
						</Tooltip.Root>
					{/if}
				{/each}
			</nav>
		</div>
		<div class="flex justify-center pb-2">
			<SidebarToggleButton bind:isSidebarOpen />
		</div>
	{/if}
</div>

<!-- hledání v sidebaru pomocí dialogu -->
<SidebarCommand items={allItems} bind:isSidebarCommandOpen />
