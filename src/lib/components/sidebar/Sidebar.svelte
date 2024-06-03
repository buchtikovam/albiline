<script lang="ts">
	import Menu from 'lucide-svelte/icons/menu';
	import Search from 'lucide-svelte/icons/search';
	import deepcopy from 'deepcopy';
	import { onMount } from 'svelte';
	import type { Item, Tab } from '$lib/types/sidebar';
	import { allItems } from '$lib/data/sidebar';
	import { Button } from '$lib/components/ui/button';
	import { Separator } from '$lib/components/ui/separator';
	import { Input } from '$lib/components/ui/input';
	import { buttonBorderSwitch } from '$lib/utils/buttonBorderSwitch';
	import {
		sidebarStateStore,
		recentSidebarStore,
		favoriteSidebarStore,
		activeCategoryStore
	} from '$lib/stores/sidebarStore';
	import { openedTabsStore, currentActiveTabStore } from '$lib/stores/tabStore';
	import CategoryButton from '$lib/components/sidebar/CategoryButton.svelte';
	import * as Accordion from '$lib/components/ui/accordion';
	import * as Tooltip from '$lib/components/ui/tooltip';
	import * as Popover from '$lib/components/ui/popover';
	import * as Command from '$lib/components/ui/command';
	import * as ContextMenu from '$lib/components/ui/context-menu/index.js';
	import ContextMenuContent from '$lib/components/sidebar/ContextMenuContent.svelte';

	let open: boolean = false;
	let show: boolean;
	let items: Item[] = allItems;
	let filteredItems: Item[] = items;
	let searchTerm = '';

	let openedTabs: Tab[];
	openedTabsStore.subscribe(data => openedTabs = data);

	let recentItemValues: string[] = [];
	recentSidebarStore.subscribe(data => recentItemValues = data);

	let favoriteItemValues: string[] = [];
	favoriteSidebarStore.subscribe(data => {
		favoriteItemValues = data;
		// TODO: reactive content when deleting from favorites
		// items = filterItemsCategory(deepcopy(allItems), favoriteItemValues);
	});


	// změna kontentu sidebaru na základě kategorií
	function filterItemsCategory(items: Item[], searchTerms: string[]): Item[] {
		let results: Item[] = [];

		items.map((item: Item): Item => {
			if (searchTerms.includes(item.value)) {
				results.includes(item) ? [] : results.push(item);
			}

			item.children.map((child: Item) => {
				if (searchTerms.includes(child.value)) {
					item.children = item.children.filter(child => searchTerms.includes(child.value));
					results.includes(item) ? [] : results.push(item);
				}
			});

			item.children.forEach((filteredChild: Item) => {
				filteredChild.children.map((scndChild) => {
					if (searchTerms.includes(scndChild.value)) {
						item.children = item.children.filter(child => child === filteredChild);

						item.children.forEach((child: Item) => {
							child.children = child.children.filter(child => searchTerms.includes(child.value));
						});

						results.includes(item) ? [] : results.push(item);
					}
				});
			});
		});

		return results;
	}

	// otevírání sidebaru
	sidebarStateStore.subscribe((data) => {
		show = data;
	});

	function toggleShow() {
		if (show === true) {
			sidebarStateStore.update(() => false);
		} else {
			sidebarStateStore.update(() => true);
		}
	}


	// otevírání vyhledávání v dialogu
	function toggleCommandFn() {
		open = !open;
	}


	// vyhledávání přes input v sidebaru pomocí rekurzivního filtrování
	function search(searchTerm: string) {
		if (searchTerm === '') {
			filteredItems = items;
			return;
		}

		filteredItems = filterItemsSearch(deepcopy(items), searchTerm);
		console.log(filteredItems);
	}

	function filterItemsSearch(items: Item[], searchTerm: string): Item[] {
		return items.map((item: Item): Item => {
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

	function setCategory(category: string) {

		if (category === 'all') {
			items = allItems;
			filteredItems = filterItemsSearch(
				deepcopy(items),
				searchTerm
			);

			buttonBorderSwitch('all');
		}

		if (category === 'recent') {
			items = filterItemsCategory(deepcopy(allItems), recentItemValues);
			filteredItems = filterItemsSearch(items, searchTerm);

			buttonBorderSwitch('recent');
		}

		if (category === 'favorite') {
			items = filterItemsCategory(deepcopy(allItems), favoriteItemValues);
			filteredItems = filterItemsSearch(items, searchTerm);

			buttonBorderSwitch('favorite');
		}
	}

	function handleTabClick(item: Item, treeDepth: number): void {
		let tab: Tab = {
			name: item.name,
			url: item.href,
			closingState: 'hidden',
			treeDepth: treeDepth
		};

		const containsObject = openedTabs.some(obj => obj.name === tab.name);

		if (containsObject === false) {
			openedTabsStore.update((data) => data.concat(tab));
		}

		currentActiveTabStore.set(tab.url);

		if (!recentItemValues.includes(item.value)) {
			recentSidebarStore.update((data) => data.concat(item.value));
			console.log(recentItemValues);
		}
	}


	// event listener pro otevření vyhledávání v dialogu po zmáčknutí CTRL+F
	onMount(() => {
			function handleKeydown(e: KeyboardEvent) {
				if (e.key === 'f' && (e.metaKey || e.ctrlKey)) {
					e.preventDefault();
					open = !open;
				}
			}

			document.addEventListener('keydown', handleKeydown);

		activeCategoryStore.subscribe((data) => {
			if (data === null) {
				data = "all";
			}

			if (data === 'all') {
				items = allItems;
				filteredItems = filterItemsSearch(
					deepcopy(items),
					searchTerm
				);

				buttonBorderSwitch('all');
			}

			if (data === 'recent') {
				items = filterItemsCategory(deepcopy(allItems), recentItemValues);
				filteredItems = filterItemsSearch(items, searchTerm);

				buttonBorderSwitch('recent');
			}

			if (data === 'favorite') {
				items = filterItemsCategory(deepcopy(allItems), favoriteItemValues);
				filteredItems = filterItemsSearch(items, searchTerm);

				buttonBorderSwitch('favorite');
			}
		})
		}
	);
</script>


<div class="flex h-full flex-col border-r overflow-auto">
	<!-- otevřený sidebar (buttons na překlikávání kategorií, input pole a stromová struktura sidebaru) -->
	{#if show === true}
		<div class="flex justify-center pt-3 px-4 gap-4 text-sm w-[320px]">
			<CategoryButton buttonName="Všechny" category="all" />
			<CategoryButton buttonName="Nedávné" category="recent" />
			<CategoryButton buttonName="Oblíbené" category="favorite" />
		</div>

		<!--	TODO: make components to shorten code -->

		<div class="flex-1 flex flex-col p-4">
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
				<div class="gap-2 h-full overflow-auto">
					{#each filteredItems as item}
						<div class={(item.hide ? "hidden" : "") + " flex flex-col gap-2 "}>
							<!-- accordiony první vrstvy (item má children položky) -->
							{#if item.children.length > 0 }
								<ContextMenu.Root>

									<Accordion.Item value={item.value}>
										<ContextMenu.Trigger>
											<Accordion.Trigger class="hover:bg-muted/50 rounded-md">
												<div
													class="flex text-sm font-medium w-full items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground/75 transition-all hover:text-primary">
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
																	<Accordion.Trigger class="hover:bg-muted/50 rounded-md">
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
																					<ContextMenuContent itemValue={thirdChild.value}/>
																				{/each}
																		</Accordion.Root>
																		</ContextMenu.Root>
																	</div>
																</Accordion.Content>
															</Accordion.Item>

															<ContextMenuContent itemValue={secondChild.value}/>
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

															<ContextMenuContent itemValue={secondChild.value}/>

														</ContextMenu.Root>
													{/if}
												{/each}
											</Accordion.Root>
										</Accordion.Content>
									</Accordion.Item>

									<ContextMenuContent itemValue={item.value}/>
								</ContextMenu.Root>

							{:else}
								<!-- accordiony první vrstvy (item nemá children položky) -->
								<ContextMenu.Root>
									<ContextMenu.Trigger>
										<a
											href={item.href}
											on:click={() => handleTabClick(item, 0)}
											class="flex text-sm font-medium  items-center gap-3 rounded-lg px-3 py-2 hover:bg-muted/50 text-muted-foreground/75 transition-all hover:text-primary"
										>
											<svelte:component this={item.icon} />
											{item.name}
										</a>
									</ContextMenu.Trigger>

									<ContextMenuContent itemValue={item.value}/>
								</ContextMenu.Root>
							{/if}
						</div>
					{/each}
				</div>
			</Accordion.Root>

			<div class="mt-auto ml-auto pt-4">
				<Button
					variant="ghost"
					size="icon"
					class="hover:bg-muted/50"
					on:click={toggleShow}
				>
					<Menu class="h-5 w-5" />
				</Button>
			</div>
		</div>
		<!-- konec otevřeného sidebaru-->
	{:else}
		<!-- zavřený sidebar (ikony s tooltipem a popoverem) -->
		<div class="flex-1 w-[60px]">
			<nav class="grid pt-4 gap-2 justify-center">
				<Tooltip.Root openDelay={250}>
					<Tooltip.Trigger>
						<button
							on:click={toggleCommandFn}
							class="m-auto mb-2 text-muted-foreground/75 hover:bg-muted/50 transition-all hover:text-primary"
						>
							<Search />
						</button>
					</Tooltip.Trigger>
					<Tooltip.Content class="ml-10 mt-10">Vyhledat</Tooltip.Content>
				</Tooltip.Root>

				<Separator />

				{#each items as item}
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
			<Button
				variant="ghost"
				size="icon"
				class="hover:bg-muted/50"
				on:click={toggleShow}
			>
				<Menu class="h-5 w-5" />
			</Button>
		</div>
	{/if}
</div>

<!-- hledání v sidebaru pomocí dialogu -->
<Command.Dialog bind:open>
	<Command.Input placeholder="Vyhledat..." />

	<Command.List class="mt-2">
		<Command.Empty class="-mt-2">
			Nic nebylo nalezeno.
		</Command.Empty>

		{#each items as item}
			{#if item.children.length > 0}
				<Command.Separator class="my-2" />
				<!-- items s children položkami -->
				<Command.Group heading="{item.name}" class="my-2">
					{#each item.children as child}
						<Command.Item class="decoration-0">
							<a href={child.href} on:click={toggleCommandFn}>
								{child.name}
							</a>
						</Command.Item>

						{#if child.children}
							{#each child.children as secondChild}
								<Command.Item>
									<a href={secondChild.href} class="text-sm pl-4" on:click={toggleCommandFn}>
										{secondChild.name}
									</a>
								</Command.Item>
							{/each}
						{/if}
					{/each}
				</Command.Group>
			{:else}
				<!-- items bez children položek -->
				<Command.Group>
					<Command.Item class="decoration-0">
						<a href={item.href} on:click={toggleCommandFn} class="">
							{item.name}
						</a>
					</Command.Item>
				</Command.Group>
			{/if}
		{/each}
	</Command.List>
</Command.Dialog>
