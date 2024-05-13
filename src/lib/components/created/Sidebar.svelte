<script lang="ts">
	import Menu from 'lucide-svelte/icons/menu';
	import Search from 'lucide-svelte/icons/search';
	import {
		allParentItems,
		allSingleItems,
		recentSingleItems,
		recentParentItems,
		favoriteParentItems,
		favoriteSingleItems
	} from '$lib/temporary-data/sidebar';
	import { Button } from '$lib/components/ui/button';
	import { Separator } from '$lib/components/ui/separator';
	import * as Accordion from '$lib/components/ui/accordion';
	import * as Tooltip from '$lib/components/ui/tooltip';
	import * as Popover from '$lib/components/ui/popover';
	import * as Command from '$lib/components/ui/command';
	import { sidebarStateStore } from '$lib/stores/store';
	import { onMount } from 'svelte';

	let singleItems = allSingleItems;
	let parentItems = allParentItems;

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

	let show: unknown;

	sidebarStateStore.subscribe((data) => {
		show = data;
	});

	function setSidebar() {
		const value = localStorage.getItem('sidebarState')?.trim();

		if (value === 'true' || value === 'false') {
			sidebarStateStore.set(value);
		} else {
			localStorage.setItem('sidebarState', 'true');
		}
	}

	function toggleShow() {
		if (show === 'true') {
			sidebarStateStore.update(() => 'false');
			localStorage.setItem('sidebarState', 'false');
		} else {
			sidebarStateStore.update(() => 'true');
			localStorage.setItem('sidebarState', 'true');
		}
	}

	function toggleCommandFn() {
		open = !open;
	}

	onMount(() => {
		setSidebar();

		function handleKeydown(e: KeyboardEvent) {
			if (e.key === 's' && (e.metaKey || e.ctrlKey)) {
				e.preventDefault();
				open = !open;
			}
		}

		document.addEventListener('keydown', handleKeydown);
		return () => {
			document.removeEventListener('keydown', handleKeydown);
		};
	});
</script>

<!--TODO: search bar with responsive sidebar content. Using reduce when input in search bar ?-->

<div class="flex h-full max-h-screen flex-col border-r">
	{#if show === "true"}
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


	{#if show === "true"}
		<div class="flex-1 w-[320px] h-full">
			<Accordion.Root class="h-full overflow-y-auto" multiple>
				<nav class="flex flex-col p-4 pb-2 gap-2 h-full ">
					<div class="flex flex-col gap-2">
						{#each singleItems as item}
							<a
								href={item.href}
								class="flex text-sm font-medium  items-center gap-3 rounded-lg px-3 py-2 hover:bg-muted/50 text-muted-foreground/75 transition-all hover:text-primary"
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

								<Accordion.Trigger class="hover:bg-muted/50 rounded-md">
									<div
										class="flex text-sm font-medium w-full items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground/75 transition-all hover:text-primary">
										<svelte:component this={parent.icon} />
										{parent.name}
									</div>
								</Accordion.Trigger>

								<Accordion.Content class="px-4 py-2">
									{#each parent.children as child}
										<a href={child.href} class="hover:bg-muted/50 px-4 py-0.5">{child.name}</a>
									{/each}
								</Accordion.Content>
							</Accordion.Item>

						{/each}
					</div>
					<div class="ml-auto pb-2">
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


				{#each singleItems as item}

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
				{/each}

				<Separator />

				{#each parentItems as parent}
					<Tooltip.Root openDelay={100}>
						<Tooltip.Trigger>

							<Popover.Root>
								<Popover.Trigger>
									<div
										class="flex text-sm font-medium  items-center gap-3 rounded-lg px-2 py-2 text-muted-foreground/75 hover:bg-muted/50 transition-all hover:text-primary">
										<svelte:component this={parent.icon} />
									</div>
								</Popover.Trigger>

								<Popover.Content class="flex flex-col px-2 py-1.5 ml-12 w-fit text-sm">
									{#each parent.children as child}
										<a href={child.href} class="hover:bg-muted/50 rounded p-2">{child.name}</a>
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
			{#each allSingleItems as item}
				<Command.Item>
					<a href={item.href} class="w-full" on:click={toggleCommandFn}>
						{item.name}
					</a>
				</Command.Item>
			{/each}
		</div>


		{#each allParentItems as item}
			<Command.Separator />
			<Command.Group heading="{item.name}" class="my-2">
				{#each item.children as child}
					<Command.Item>
						<a href={child.href} class="w-full" on:click={toggleCommandFn}>
							{child.name}
						</a>
					</Command.Item>
				{/each}
			</Command.Group>
		{/each}
	</Command.List>
</Command.Dialog>
