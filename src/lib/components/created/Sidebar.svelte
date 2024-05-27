<script lang="ts">
	import Menu from 'lucide-svelte/icons/menu';
	import Search from 'lucide-svelte/icons/search';
	import { onMount } from 'svelte';
	import deepcopy from 'deepcopy';
	import {
		allItems,
		recentItems,
		favoriteItems
	} from '$lib/data/sidebar';
	import type { Item } from '$lib/types/sidebar';
	import { Button } from '$lib/components/ui/button';
	import { Separator } from '$lib/components/ui/separator';
	import { Input } from '$lib/components/ui/input';
	import { sidebarStateStore } from '$lib/stores/store';
	import * as Accordion from '$lib/components/ui/accordion';
	import * as Tooltip from '$lib/components/ui/tooltip';
	import * as Popover from '$lib/components/ui/popover';
	import * as Command from '$lib/components/ui/command';
	import { derived } from 'svelte/store';

	let open: boolean = false;
	let show: boolean;
	let items: Item[] = allItems;


	function setCategory(category: 'all' | 'recent' | 'favorite'): void {
		// future: all routes will display only routes based on permission filter

		// recent routes will store in session storage ?

		// favorite routes will be stored by values on BE and filtered on FE.

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
	let filteredItems: Item[] = items;

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

	function search(searchTerm: string) {
		if (searchTerm === '') {
			filteredItems = items;
			return;
		}

		filteredItems = filterItems(
			deepcopy(items),
			searchTerm
		);
	}

	// TODO: move stuff out

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
			<button
				class="button recent border-b-albi-500 p-1 pb-0 rounded-t-md hover:bg-muted/50"
				on:click={() => setCategory("recent")}>
				Nedávné
			</button>
			<button
				class="button favorite border-b-albi-500 p-1 pb-0 rounded-t-md hover:bg-muted/50"
				on:click={() => setCategory("favorite")}>
				Oblíbené
			</button>
		</div>
	{/if}

	{#if show === true}
		<div class="flex-1 w-[320px] h-full p-4">
			<Input class="h-fit" placeholder="Vyhledat..." bind:value={searchTerm} on:input={() => search(searchTerm)} />

			<Accordion.Root
				class="h-full overflow-y-auto"
				multiple
				value={searchTerm !== "" ? filteredItems.map((child) => child.value) : []}
			>
				<nav class="flex flex-col py-4 gap-2 h-full ">
					{#each filteredItems.filter((child) => !child.hide) as item}
						<div class="flex flex-col gap-2 ">
							{#if item.children.length > 0 }
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
										<Accordion.Root multiple value={searchTerm !== "" ? item.children.map((child) => child.value) : []}>
											{#each item.children.filter((child) => !child.hide) as secondChild}
												<!-- child with children elements -->
												{#if secondChild.children.length > 0}
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
																<Accordion.Root multiple value={searchTerm !== "" ? secondChild.children.map((child) => child.value) : []}>
																{#each secondChild.children.filter((child) => !child.hide) as thirdChild}
																	<Accordion.Item value={thirdChild.value} class="hover:bg-muted/50 rounded-md">
																		<a
																			href="{thirdChild.href}"
																			class="flex text-sm font-medium w-full items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground/75 transition-all hover:text-primary">
																			{thirdChild.name}
																		</a>
																	</Accordion.Item>
																{/each}
																</Accordion.Root>
															</div>
														</Accordion.Content>
													</Accordion.Item>
												{:else}
													<!-- child with no children -->
													<Accordion.Item value={secondChild.value} class="hover:bg-muted/50 rounded-md">
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
								<!--	item with no child-->
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

									<Popover.Content class="flex flex-col px-1 py-1 ml-12 w-fit text-sm">
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
										<a href={secondChild.href} class="text-sm pl-4" on:click={toggleCommandFn}>
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
