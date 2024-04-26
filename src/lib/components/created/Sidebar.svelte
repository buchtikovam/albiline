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
	import { Separator } from '$lib/components/ui/separator';
	import type { ComponentType } from 'svelte';
	import type { Icon } from 'lucide-svelte';

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
		}
	];

	const favoriteSingleItems: SingleItem[] = [
		{
			name: 'Průvodní oblíbený list',
			href: '/',
			icon: TableProperties
		}
	];

	const recentSingleItems: SingleItem[] = [
		{
			name: 'Průvodní nedávný list',
			href: '/',
			icon: TableProperties
		}
	];

	let singleItems = allSingleItems;

	let parentItems: ParentItem[] = [
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

	let show: boolean = true;

	function setCategory(category: 'all' | 'recent' | 'favorite'): void {
		if (category === 'all') {
			singleItems = allSingleItems;
		}

		if (category === 'recent') {
			singleItems = recentSingleItems;
		}

		if (category === 'favorite') {
			singleItems = favoriteSingleItems;
		}
	}

	function toggleFn() {
		show = !show;
		console.log(show);
	}

</script>

<div class="flex h-full max-h-screen flex-col">
	{#if show === true}
		<div class="flex items-start pt-4 gap-4 mx-auto text-sm">
			<button class="border-b-2" on:click={() => setCategory("all")}>Všechny</button>
			<button on:click={() => setCategory("recent")}>Nedávné</button>
			<button on:click={() => setCategory("favorite")}>Oblíbené</button>
		</div>
	{/if}


	{#if show === true}
		<div class="flex-1 w-[320px]">
			<Accordion.Root>
				<nav class="grid p-4 gap-2">
					<div class="flex flex-col gap-2 flex-grow">
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

								<Accordion.Trigger>
									<div
										class="flex text-sm font-medium  items-center gap-3 rounded-lg px-3 py-2 hover:bg-muted/40 text-muted-foreground transition-all hover:text-primary">
										<svelte:component this={parent.icon} />
										{parent.name}
									</div>
								</Accordion.Trigger>

								<Accordion.Content>
									{#each parent.children as child}
										<a href={child.href}>{child.name}</a>
									{/each}
								</Accordion.Content>
							</Accordion.Item>

						{/each}
					</div>
				</nav>
			</Accordion.Root>

			<div class="flex justify-center">
				<Button
					variant="ghost"
					size="icon"
					class=""
					on:click={toggleFn}
				>
					<Menu class="h-5 w-5" />
					<span class="sr-only">Toggle navigation menu</span>
				</Button>
			</div>
		</div>
	{:else}
		<div class="flex-1 w-[60px]">
			<nav class="grid pt-4 gap-2 justify-center">

				{#each singleItems as item}

					<Tooltip.Root>
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
					<Tooltip.Root>
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
		<div class="flex justify-center">
			<Button
				variant="ghost"
				size="icon"
				class=""
				on:click={toggleFn}
			>
				<Menu class="h-5 w-5" />
				<span class="sr-only">Toggle navigation menu</span>
			</Button>
		</div>
	{/if}
</div>
