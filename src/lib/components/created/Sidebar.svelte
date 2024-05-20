<script lang="ts">
	import Menu from 'lucide-svelte/icons/menu';
	import Search from 'lucide-svelte/icons/search';
	import { onMount } from 'svelte';
	import {
		allItems,
		recentItems,
		favoriteItems
	} from '$lib/temporary-data/sidebar';
	import type { Item } from '$lib/types/sidebar';
	import { Button } from '$lib/components/ui/button';
	import { Separator } from '$lib/components/ui/separator';
	import { Input } from '$lib/components/ui/input';
	import { sidebarStateStore } from '$lib/stores/store';
	import * as Accordion from '$lib/components/ui/accordion';
	import * as Tooltip from '$lib/components/ui/tooltip';
	import * as Popover from '$lib/components/ui/popover';
	import * as Command from '$lib/components/ui/command';
	import { openAccordionsStore } from '$lib/stores/store';

	let open: boolean = false;
	let show: boolean;
	let items: Item[] = allItems;
	let initialItems = items;

	function setCategory(category: 'all' | 'recent' | 'favorite'): void {
		if (category === 'all') {
			items = allItems;

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

	function toggleCommandFn() {
		open = !open;
	}

	let searchTerm = '';
	let openAccordions: string[] = [];


	function searchItems(searchTerm: string) {
		console.log('searchTerm', searchTerm);

		const filteredItems: Item[] = [];
		const searchRecursive = (item: Item) => {
			const lowerSearchTerm = searchTerm.toLowerCase();
			const itemName = item.name.toLowerCase();

			if (itemName.includes(lowerSearchTerm)) {

				if (!filteredItems.includes(item)) {

					if (item.parentValue) {

						if (!openAccordions.includes(item.parentValue)) {
							openAccordions.push(item.parentValue);

							console.log('openAccordions', openAccordions);
						}
					}
					filteredItems.push(item);
				}
			}

			if (item.children) {
				item.children.forEach(child => searchRecursive(child));
			}
		};
		items.forEach(searchRecursive);

		if (searchTerm) {
			// items = filteredItems;
		} else {
			// items = initialItems;
			openAccordions = [];
		}

		console.log(items);
		return items;
	}







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
	{#if show === true}
		<div class="w-full flex justify-center pt-3 px-4 gap-4 text-sm">
			<button class="button all border-b-albi-500 border-b-2 p-1 pb-0 rounded-t-md hover:bg-muted/50 "
							on:click={() => setCategory("all")}>
				Všechny
			</button>
			<button class="button recent border-b-albi-500 p-1 pb-0 rounded-t-md hover:bg-muted/50 "
							on:click={() => setCategory("recent")}>
				Nedávné
			</button>
			<button class="button favorite border-b-albi-500 p-1 pb-0 rounded-t-md hover:bg-muted/50"
							on:click={() => setCategory("favorite")}>
				Oblíbené
			</button>
		</div>
	{/if}

	{#if show === true}
		<div class="flex-1 w-[320px] h-full p-4">
			<Input class="h-fit" placeholder="Vyhledat..." bind:value={searchTerm}
						 on:input={() => searchItems(searchTerm)} />


			<!--	TODO: make responsive search updating "value" -->
			<Accordion.Root class="h-full overflow-y-auto" multiple value={openAccordions}>

				<nav class="flex flex-col py-4 gap-2 h-full ">
					{#each items as item}
						<div class="flex flex-col gap-2 ">

							<!-- if sidebar element has children elements -->
							{#if item.children}
								<Accordion.Item value={item.value}>
									<Accordion.Trigger class="hover:bg-muted/50 rounded-md">
										<div
											class="flex text-sm font-medium w-full items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground/75 transition-all hover:text-primary"
										>
											<svelte:component this={item.icon} />
											<a href={item.href}>
												{item.name}
											</a>
										</div>
									</Accordion.Trigger>

									<Accordion.Content class="px-2 my-2">
										<Accordion.Root multiple value={openAccordions}>
											{#each item.children as secondChild}
												<!-- if child element has children elements -->
												{#if secondChild.children}
													<Accordion.Item value={secondChild.value}>
														<Accordion.Trigger class="hover:bg-muted/50 rounded-md">
															<div
																class="flex text-sm font-medium w-full items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground/75 transition-all hover:text-primary"
															>
																<a href={secondChild.href}>
																	{secondChild.name}
																</a>
															</div>
														</Accordion.Trigger>

														<Accordion.Content>
															<div class="flex flex-col px-2 py-1">
																{#each secondChild.children as thirdChild}
																	<a href={thirdChild.href}
																		 class="text-muted-foreground/75 hover:text-primary hover:bg-muted/50 p-1 px-6 rounded-md">{thirdChild.name}</a>
																{/each}
															</div>


														</Accordion.Content>
													</Accordion.Item>
												{:else}
													<Accordion.Item value={secondChild.value}
																					class="hover:bg-muted/50 rounded-md">
														<a
															href="{secondChild.href}"
															class="flex text-sm font-medium w-full items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground/75 transition-all hover:text-primary">
															{secondChild.name}
														</a>
													</Accordion.Item>
												{/if}
											{/each}
										</Accordion.Root>
									</Accordion.Content>
								</Accordion.Item>

							{:else}
								<a
									href={item.href}
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
							<span class="sr-only">Toggle navigation menu</span>
						</Button>
					</div>
				</nav>
			</Accordion.Root>


		</div>
	{:else}
		<div class="flex-1 w-[60px]">
			<nav class="grid pt-4 gap-2 justify-center">
				<Tooltip.Root openDelay={250}>
					<Tooltip.Trigger>
						<button on:click={toggleCommandFn}
										class="m-auto mb-2 text-muted-foreground/75 hover:bg-muted/50 transition-all hover:text-primary">
							<Search />
						</button>
					</Tooltip.Trigger>
					<Tooltip.Content class="ml-10 mt-10">Vyhledat</Tooltip.Content>
				</Tooltip.Root>

				<Separator />


				{#each items as item}
					{#if item.children}
						<Tooltip.Root openDelay={100}>
							<Tooltip.Trigger>

								<Popover.Root>
									<Popover.Trigger>
										<div
											class="flex text-sm font-medium  items-center gap-3 rounded-lg px-2 py-2 text-muted-foreground/75 hover:bg-muted/50 transition-all hover:text-primary">
											<svelte:component this={item.icon} />
										</div>
									</Popover.Trigger>

									<Popover.Content class="flex flex-col px-2 py-1.5 ml-12 w-fit text-sm">
										{#each item.children as child}
											<a href={child.href} class="hover:bg-muted/50 rounded p-2">{child.name}</a>
										{/each}
									</Popover.Content>
								</Popover.Root>

							</Tooltip.Trigger>

							<Tooltip.Content class="ml-10 mt-10">
								{item.name}
							</Tooltip.Content>
						</Tooltip.Root>


					{:else }
						<Tooltip.Root openDelay={250}>
							<Tooltip.Trigger>
								<a href={item.href}
									 class="flex text-sm font-medium items-center gap-3 rounded-lg px-2 py-2 text-muted-foreground/75 hover:bg-muted/50 transition-all hover:text-primary">
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
				<span class="sr-only">Toggle navigation menu</span>
			</Button>
		</div>
	{/if}
</div>

<Command.Dialog bind:open>
	<Command.Input placeholder="Vyhledat..." />
	<Command.List>
		<Command.Empty>Nic nebylo nalezeno.</Command.Empty>

			<div class="m-2">
				{#each items as item}
						{#if !item.children}
							<Command.Item>
								<a href={item.href} class="w-full" on:click={toggleCommandFn}>
									{item.name}
								</a>
							</Command.Item>
						{/if}
				{/each}
			</div>

			<Command.Separator />

			{#each items as item}
				{#if item.children}
					<Command.Separator />

					<Command.Group heading="{item.name}" class="my-2 ">
						{#each item.children as child}
							{#if !child.children}
									<Command.Item>
										<a href={child.href} class="" on:click={toggleCommandFn}>
											{child.name}
										</a>
									</Command.Item>

							{:else}
									<Command.Item class="decoration-0">
										<a href={child.href} class="" on:click={toggleCommandFn}>
											{child.name}
										</a>
									</Command.Item>

										{#if child.children}
											{#each child.children as secondChild}
												<Command.Item>
													<a href={secondChild.href} class="text-sm pl-2" on:click={toggleCommandFn}>
														{secondChild.name}
													</a>
												</Command.Item>
											{/each}
										{/if}
							{/if}
						{/each}
					</Command.Group>
				{/if}
			{/each}
	</Command.List>
</Command.Dialog>
