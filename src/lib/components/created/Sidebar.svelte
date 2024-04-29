<script lang="ts">
	import {
		Menu,
		ShoppingBasket,
		TableProperties,
		Warehouse
	} from 'lucide-svelte';

	import { Button } from '$lib/components/ui/button';
	import * as Accordion from '$lib/components/ui/accordion';
	import * as Tooltip from '$lib/components/ui/tooltip';
	import * as Popover from '$lib/components/ui/popover';
	import * as Command from '$lib/components/ui/command';
	import { Separator } from '$lib/components/ui/separator';
	import type { ComponentType } from 'svelte';
	import type { Icon } from 'lucide-svelte';
	import Search from 'lucide-svelte/icons/search';

	type SingleItem = {
		name: string;
		href: string;
		icon: ComponentType<Icon>;
	}

	type ChildItem = {
		name: string;
		href: string;
	}

	type ParentItem = {
		name: string;
		value: string;
		href: string;
		icon: ComponentType<Icon>;
		children: ChildItem[]
	}

	const allSingleItems: SingleItem[] = [
		{
			name: 'Průvodní list',
			href: '/',
			icon: TableProperties
		},
		// {
		// 	name: 'Průvodní list 2',
		// 	href: '/',
		// 	icon: TableProperties
		// }
	];

	const recentSingleItems: SingleItem[] = [
		{
			name: 'Průvodní nedávný list',
			href: '/',
			icon: TableProperties
		}
	];

	const favoriteSingleItems: SingleItem[] = [
		{
			name: 'Průvodní oblíbený list',
			href: '/',
			icon: TableProperties
		}
	];


	const allParentItems: ParentItem[] = [
		{
			name: 'Sklad',
			value: 'sklad',
			href: '/',
			icon: Warehouse,
			children: [
				{
					name: 'Hodinovka',
					href: '/'
				},
				{
					name: 'Příjem a výdej',
					href: '/'
				},
				{
					name: 'Stav skladu',
					href: '/'
				}
			]
		},
		{
			name: 'Sklad 2',
			value: 'sklad2',
			href: '/',
			icon: ShoppingBasket,
			children: [
				{
					name: 'test',
					href: '/'
				},
				{
					name: 'Příjem a výdej',
					href: '/'
				},
				{
					name: 'Stav skladu',
					href: '/'
				}
			]
		}
	];

	const recentParentItems: ParentItem[] = [
		{
			name: 'Sklad',
			value: 'sklad',
			href: '/',
			icon: Warehouse,
			children: [
				{
					name: 'Hodinovka',
					href: '/'
				},
				{
					name: 'Příjem a výdej',
					href: '/'
				},
				{
					name: 'Stav skladu',
					href: '/'
				}
			]
		},
		{
			name: 'Sklad 2',
			value: 'sklad2',
			href: '/',
			icon: ShoppingBasket,
			children: [
				{
					name: 'test',
					href: '/'
				},
				{
					name: 'Příjem a výdej',
					href: '/'
				},
				{
					name: 'Stav skladu',
					href: '/'
				}
			]
		}
	];

	const favoriteParentItems: ParentItem[] = [
		{
			name: 'Sklad',
			value: 'sklad',
			href: '/',
			icon: Warehouse,
			children: [
				{
					name: 'Hodinovka',
					href: '/'
				},
				{
					name: 'Příjem a výdej',
					href: '/'
				},
				{
					name: 'Stav skladu',
					href: '/'
				}
			]
		},
		{
			name: 'Sklad 2',
			value: 'sklad2',
			href: '/',
			icon: ShoppingBasket,
			children: [
				{
					name: 'test',
					href: '/'
				},
				{
					name: 'Příjem a výdej',
					href: '/'
				},
				{
					name: 'Stav skladu',
					href: '/'
				}
			]
		}
	];

	let singleItems = allSingleItems;
	let parentItems = allParentItems;

	let show: boolean = true;
	let open: boolean = false;


	function setCategory(category: 'all' | 'recent' | 'favorite'): void {
		if (category === 'all') {
			singleItems = allSingleItems;
			parentItems = allParentItems;

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
			singleItems = recentSingleItems;
			parentItems = recentParentItems;

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
			singleItems = favoriteSingleItems;
			parentItems = favoriteParentItems;

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

	function toggleSidebarFn() {
		show = !show;
		console.log(show);
	}

	function toggleCommandFn() {
		open = !open;
		console.log(show);
	}

</script>

<div class="flex h-full max-h-screen flex-col">
	{#if show === true}
		<div class="flex items-start pt-4 gap-4 mx-auto text-sm">
			<button class="button all border-b-2 hover:bg-muted/40 transition-all" on:click={() => setCategory("all")}>
				Všechny
			</button>
			<button class="button recent hover:bg-muted/40 transition-all" on:click={() => setCategory("recent")}>
				Nedávné
			</button>
			<button class="button favorite hover:bg-muted/40 transition-all" on:click={() => setCategory("favorite")}>
				Oblíbené
			</button>
			<button on:click={toggleCommandFn} class="w-fit hover:bg-muted/40 transition-all">
				<Search class="h-4 pt-0.5" />
			</button>
		</div>
	{/if}


	{#if show === true}
		<div class="flex-1 w-[320px] h-full">
			<Accordion.Root class="h-full overflow-y-auto" multiple>
				<nav class="flex flex-col p-4 pb-2 gap-2 h-full">
					<div class="flex flex-col gap-2">
						{#each singleItems as item}
							<a
								href={item.href}
								class="flex text-sm font-medium  items-center gap-3 rounded-lg px-3 py-2 hover:bg-muted/40 text-muted-foreground transition-all hover:text-primary"
							>
								<svelte:component this={item.icon} />
								{item.name}
							</a>
						{/each}
					</div>

					<Separator />

					<div class="flex flex-col gap-2 flex-grow">
						{#each parentItems as parent}
							<Accordion.Item value={parent.value}>

								<Accordion.Trigger class="hover:bg-muted/40 rounded-md">
									<div
										class="flex text-sm font-medium w-full items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
										<svelte:component this={parent.icon} />
										{parent.name}
									</div>
								</Accordion.Trigger>

								<Accordion.Content class="">
									{#each parent.children as child}
										<a href={child.href}>{child.name}</a>
									{/each}
								</Accordion.Content>
							</Accordion.Item>

						{/each}
					</div>
					<div class="ml-auto pb-2">
						<Button
							variant="ghost"
							size="icon"
							class=""
							on:click={toggleSidebarFn}
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
				<button on:click={toggleCommandFn}
						class="m-auto mb-2 text-muted-foreground hover:bg-muted/40 transition-all hover:text-primary">
					<Search />
				</button>

				<Separator />


				{#each singleItems as item}

					<Tooltip.Root openDelay={100}>
						<Tooltip.Trigger>
							<a href={item.href}
							   class="flex text-sm font-medium items-center gap-3 rounded-lg px-2 py-2 text-muted-foreground hover:bg-muted/40 transition-all hover:text-primary">
								<svelte:component this={item.icon} />
							</a>
						</Tooltip.Trigger>

						<Tooltip.Content class="ml-10 mt-10">
							{item.name}
						</Tooltip.Content>
					</Tooltip.Root>
				{/each}

				<Separator />

				{#each parentItems as parent}
					<Tooltip.Root openDelay={100}>
						<Tooltip.Trigger>

							<Popover.Root>
								<Popover.Trigger>
									<div
										class="flex text-sm font-medium  items-center gap-3 rounded-lg px-2 py-2 text-muted-foreground hover:bg-muted/40 transition-all hover:text-primary">
										<svelte:component this={parent.icon} />
									</div>
								</Popover.Trigger>

								<Popover.Content class="flex flex-col p-2 ml-12 w-fit text-sm">
									{#each parent.children as child}
										<a href={child.href} class="hover:bg-muted/40 rounded p-2">{child.name}</a>
									{/each}
								</Popover.Content>
							</Popover.Root>

						</Tooltip.Trigger>

						<Tooltip.Content class="ml-10 mt-10">
							{parent.name}
						</Tooltip.Content>
					</Tooltip.Root>
				{/each}
			</nav>
		</div>
		<div class="flex justify-center pb-2">
			<Button
				variant="ghost"
				size="icon"
				on:click={toggleSidebarFn}
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
			{#each allSingleItems as item}
				<Command.Item>
					<a href={item.href} class="w-full" on:click={() => toggleCommandFn()}>
						{item.name}
					</a>
				</Command.Item>
			{/each}
		</div>


		{#each allParentItems as item}
			<Command.Separator/>
			<Command.Group heading="{item.name}" class="my-2">
				{#each item.children as child}
					<Command.Item>
						<a href={child.href} class="w-full" on:click={() => toggleCommandFn()}>
							{child.name}
						</a>
					</Command.Item>
				{/each}
			</Command.Group>
		{/each}
	</Command.List>
</Command.Dialog>
