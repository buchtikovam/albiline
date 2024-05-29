<script lang="ts">
	import Menu from 'lucide-svelte/icons/menu';
	import Search from 'lucide-svelte/icons/search';
	import deepcopy from 'deepcopy';
	import { onMount } from 'svelte';
	import type { Item, Tab } from '$lib/types/sidebar';
	import { allItems, recentItems, favoriteItems } from '$lib/data/sidebar';
	import { Button } from '$lib/components/ui/button';
	import { Separator } from '$lib/components/ui/separator';
	import { Input } from '$lib/components/ui/input';
	import { sidebarStateStore, openedTabsStore, currentActiveTabStore } from '$lib/stores/store';
	import * as Accordion from '$lib/components/ui/accordion';
	import * as Tooltip from '$lib/components/ui/tooltip';
	import * as Popover from '$lib/components/ui/popover';
	import * as Command from '$lib/components/ui/command';

	let open: boolean = false;
	let show: boolean;
	let items: Item[] = allItems;
	let filteredItems: Item[] = items;


	// změna kontentu sidebaru na základě kategorií
	// (později budou recent v session storage a favorite filtrované podle values z BE)
	function setCategory(category: 'all' | 'recent' | 'favorite'): void {
		// TODO: recent - session storage, favorite - filter by values
		if (category === 'all') {
			items = allItems;
			filteredItems = filterItems(
				deepcopy(items),
				searchTerm
			);

			let buttons = document.getElementsByClassName('button');

			Array.from(buttons).forEach((button) => {
				button.classList.remove('border-b-2');
			});

			let activeButton = document.querySelector('.all');
			if (activeButton) {
				activeButton.classList.add('border-b-2');
			}
		}

		if (category === 'recent') {
			items = recentItems;
			filteredItems = filterItems(
				deepcopy(items),
				searchTerm
			);

			let buttons = document.getElementsByClassName('button');

			Array.from(buttons).forEach((button) => {
				button.classList.remove('border-b-2');
			});

			let activeButton = document.querySelector('.recent');
			if (activeButton) {
				activeButton.classList.add('border-b-2');
			}
		}

		if (category === 'favorite') {
			items = favoriteItems;
			filteredItems = filterItems(
				deepcopy(items),
				searchTerm
			);

			let buttons = document.getElementsByClassName('button');

			Array.from(buttons).forEach((button) => {
				button.classList.remove('border-b-2');
			});

			let activeButton = document.querySelector('.favorite');
			if (activeButton) {
				activeButton.classList.add('border-b-2');
			}
		}
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
	let searchTerm = '';

	function search(searchTerm: string) {
		if (searchTerm === '') {
			filteredItems = items;
			return;
		}
		// TODO(bug): after searching, accordions open in pairs - check after clearing

		filteredItems = filterItems(
			deepcopy(items),
			searchTerm
		);
	}

	function filterItems(items: Item[], searchTerm: string): Item[] {
		return items.map((item: Item): Item => {
			item.open = false;
			item.hide = true;

			if (item.name.toLowerCase().includes(searchTerm.toLowerCase()) === true) {
				item.open = true;
				item.hide = false;
			}

			item.children = filterItems(item.children, searchTerm);
			if (item.children.some((child) => child.hide === false)) {
				item.open = true;
				item.hide = false;
			}

			return item;
		});
	}


	// otevírání hlavních tabů po kliknutí na položku v sidebaru
	let openedTabs: Tab[];

	openedTabsStore.subscribe((data) => {
		openedTabs = data;
	});

	function addToTabs(item: Tab): void {
		const containsObject = openedTabs.some(obj => obj.name === item.name);

		if (containsObject === false) {
			openedTabsStore.update((data) => data.concat(item));
		}

		currentActiveTabStore.set(item.url);
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
		}
	);
</script>

<div class="flex h-full max-h-screen flex-col border-r">
	<!-- otevřený sidebar (buttons na překlikávání kategorií, input pole a stromová struktura sidebaru) -->
	{#if show === true}
		<div class="w-full flex justify-center pt-3 px-4 gap-4 text-sm">
			<button
				class="button all border-b-albi-500 border-b-2 p-1 pb-0 rounded-t-md hover:bg-muted/50 "
				on:click={() => setCategory("all")}
			>
				Všechny
			</button>

			<button
				class="button recent border-b-albi-500 p-1 pb-0 rounded-t-md hover:bg-muted/50"
				on:click={() => setCategory("recent")}
			>
				Nedávné
			</button>

			<button
				class="button favorite border-b-albi-500 p-1 pb-0 rounded-t-md hover:bg-muted/50"
				on:click={() => setCategory("favorite")}
			>
				Oblíbené
			</button>
		</div>

		<!-- TODO: scrollable sidebar -->

		<div class="flex-1 w-[320px] h-full p-4">
			<Input
				class="h-fit"
				placeholder="Vyhledat..."
				bind:value={searchTerm}
				on:input={() => search(searchTerm)}
			/>

			<Accordion.Root
				class="h-full overflow-y-auto"
				multiple
				value={searchTerm !== "" ? filteredItems.map((child) => child.value) : []}
			>
				<nav class="flex flex-col py-4 gap-2 h-full ">
					{#each filteredItems.filter((child) => !child.hide) as item}
						<div class="flex flex-col gap-2 ">

							<!-- accordiony první vrstvy (item má children položky) -->
							{#if item.children.length > 0 }
								<Accordion.Item value={item.value}>
									<Accordion.Trigger class="hover:bg-muted/50 rounded-md">
										<div class="flex text-sm font-medium w-full items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground/75 transition-all hover:text-primary">
											<svelte:component this={item.icon} />
											<a
												href={item.href}
												on:click={() => addToTabs(
													{
														name: item.name,
														url: item.href,
														closingState: "hidden",
														treeDepth: 0
													}
												)}
											>
												{item.name}
											</a>
										</div>
									</Accordion.Trigger>

									<Accordion.Content class="px-2 my-2">
										<!-- accordiony druhé vrstvy -->
										<Accordion.Root
											multiple
											value={searchTerm !== "" ? item.children.map((child) => child.value) : []}
										>
											{#each item.children.filter((child) => !child.hide) as secondChild}
												<!-- accordiony druhé vrstvy (child item má children položky) -->
												{#if secondChild.children.length > 0}
													<Accordion.Item value={secondChild.value}>
														<Accordion.Trigger class="hover:bg-muted/50 rounded-md">
															<div class="flex text-sm font-medium w-full items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground/75 transition-all hover:text-primary">
																<a
																	href={secondChild.href}
																	on:click={() => addToTabs(
																		{
																			name: secondChild.name,
																			url: secondChild.href,
																			closingState: "hidden",
																			treeDepth: 1
																		}
																	)}
																>
																	{secondChild.name}
																</a>
															</div>
														</Accordion.Trigger>

														<Accordion.Content>
															<div class="flex flex-col px-2 py-1">
																<Accordion.Root
																	multiple
																	value={searchTerm !== "" ? secondChild.children.map((child) => child.value) : []}
																>
																	{#each secondChild.children.filter((child) => !child.hide) as thirdChild}
																		<Accordion.Item
																			value={thirdChild.value}
																			class="hover:bg-muted/50 rounded-md"
																		>
																			<a
																				href="{thirdChild.href}"
																				on:click={() => addToTabs(
																					{
																						name: thirdChild.name,
																						url: thirdChild.href,
																						closingState: "hidden",
																						treeDepth: 2
																					}
																				)}
																				class="flex text-sm font-medium w-full items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground/75 transition-all hover:text-primary"
																			>
																				{thirdChild.name}
																			</a>
																		</Accordion.Item>
																	{/each}
																</Accordion.Root>
															</div>
														</Accordion.Content>
													</Accordion.Item>
												{:else}
													<!-- accordiony druhé vrstvy (child item nemá children položky) -->
													<Accordion.Item
														value={secondChild.value}
														class="hover:bg-muted/50 rounded-md"
													>
														<a
															href="{secondChild.href}"
															on:click={() => addToTabs(
																{
																	name: secondChild.name,
																	url: secondChild.href,
																	closingState: "hidden",
																	treeDepth: 1
																}
															)}
															class="flex text-sm font-medium w-full items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground/75 transition-all hover:text-primary"
														>
															{secondChild.name}
														</a>
													</Accordion.Item>
												{/if}
											{/each}
										</Accordion.Root>
									</Accordion.Content>
								</Accordion.Item>
							{:else}
								<!-- accordiony první vrstvy (item nemá children položky) -->
								<a
									href={item.href}
									on:click={() => addToTabs(
										{
											name: item.name,
											url: item.href,
											closingState: "hidden",
											treeDepth: 0
										}
									)}
									class="flex text-sm font-medium  items-center gap-3 rounded-lg px-3 py-2 hover:bg-muted/50 text-muted-foreground/75 transition-all hover:text-primary"
								>
									<svelte:component this={item.icon} />
									{item.name}
								</a>
							{/if}
						</div>
					{/each}

					<div class="mt-auto ml-auto pb-4">
						<Button
							variant="ghost"
							size="icon"
							class="hover:bg-muted/50"
							on:click={toggleShow}
						>
							<Menu class="h-5 w-5" />
						</Button>
					</div>
				</nav>
			</Accordion.Root>
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
												on:click={() => addToTabs(
													{
														name: child.name,
														url: child.href,
														closingState: "hidden",
														treeDepth: 1
													}
												)}
											>
												{child.name}
											</a>

											{#if child.children.length > 0}
												{#each child.children as scndChild}
													<a
														href={scndChild.href}
														class="hover:bg-muted/50 rounded pr-2 pl-6 py-1.5"
														on:click={() => addToTabs(
															{
																name: scndChild.name,
																url: scndChild.href,
																closingState: "hidden",
																treeDepth: 2
															}
														)}
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
									on:click={() => addToTabs(
										{
											name: item.name,
											url: item.href,
											closingState: "hidden",
											treeDepth: 0
										}
									)}
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
