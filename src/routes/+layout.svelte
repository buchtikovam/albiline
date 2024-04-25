<script lang="ts">
	import "../app.pcss";

	let open = false;

	import {
		Menu,
		Warehouse,
		Hammer,
		Croissant,
		Binary,
		HandCoins,
		ShoppingBasket,
		TableProperties,
		Bug,
		Star,
	} from 'lucide-svelte';

	import { Button } from "$lib/components/ui/button";
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
	import * as Avatar from "$lib/components/ui/avatar";
	import ChevronLeft from 'lucide-svelte/icons/chevron-left';
	import Logo from '$lib/icons/Logo.svelte';
	import { Separator } from '$lib/components/ui/separator';
	import Search from 'lucide-svelte/icons/search';
	import * as Command from "$lib/components/ui/command/index.js";

	function fnOpen() {
		open = !open
	}
</script>

<Command.Dialog bind:open>
	<Command.Input placeholder="Vyhledat..." />
	<Command.List>
		<Command.Empty>Nic nenalezeno</Command.Empty>
		<Command.Group heading="Průvodní list">
			<Command.Item>
				<span>1 Položka</span>
			</Command.Item>
			<Command.Item>
				<span>2 Položka</span>
			</Command.Item>
			<Command.Item>
				<span>3 Položka</span>
			</Command.Item>
		</Command.Group>
		<Command.Separator />
		<Command.Group heading="Sklad">
			<Command.Item>
				<span>4 Položka</span>
			</Command.Item>
			<Command.Item>
				<span>5 Položka</span>
			</Command.Item>
			<Command.Item>
				<span>6 Položka</span>
			</Command.Item>
		</Command.Group>
	</Command.List>
</Command.Dialog>

<div class="grid h-dvh w-full lg:grid-cols-[320px_1fr]">
	<div class="hidden border-r lg:block">
		<div class="flex h-full max-h-screen flex-col gap-4">
			<div class="flex items-center border-b p-2 lg:p-4 lg:h-16">
				<a href="/" class="flex items-center pl-2 h-7">
					<Logo />
				</a>
				<Button variant="outline" size="icon" class="ml-auto h-8 w-8">
					<ChevronLeft class="h-4 w-4" />
				</Button>
			</div>

			<div class="flex-1">
				<nav class="grid items-start px-2 lg:px-4 gap-2">
					<a href="##" class="flex text-sm font-medium  items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-muted/40 transition-all hover:text-primary">
						<Star class="h-6 w-6" />
						Oblíbené
					</a>
					<a href="/" class="bg-accent text-accent-foreground flex text-sm font-medium  items-center gap-3 rounded-lg px-3 py-2 hover:bg-muted/40 transition-all hover:text-primary">
						<TableProperties class="h-6 w-6" />
						Průvodní list
					</a>
					<a href="/sklad" class="flex text-sm font-medium  items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-muted/40 transition-all hover:text-primary">
						<Warehouse class="h-6 w-6" />
						Sklad
					</a>
					<a href="##" class="flex text-sm font-medium  items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-muted/40 transition-all hover:text-primary">
						<Hammer class="h-6 w-6" />
						Výroba
					</a>
					<a href="##" class="flex text-sm font-medium  items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-muted/40 transition-all hover:text-primary">
						<ShoppingBasket class="h-6 w-6" />
						Prodej
					</a>
					<a href="##" class="flex text-sm font-medium  items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-muted/40 transition-all hover:text-primary">
						<HandCoins class="h-6 w-6" />
						Účetní
					</a>
					<a href="##" class="flex text-sm font-medium  items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-muted/40 transition-all hover:text-primary">
						<Binary class="h-6 w-6" />
						IT
					</a>
					<a href="##" class="flex text-sm font-medium  items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-muted/40 transition-all hover:text-primary">
						<Croissant class="h-6 w-6" />
						Pekařství
					</a>
				</nav>
			</div>
			<div class="mt-auto p-4 grid items-start px-2 lg:px-4">
				<Separator class="my-4"/>
				<a href="##" class="flex text-sm font-medium  items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-muted/40 transition-all hover:text-primary">
					<Bug class="h-6 w-6" />
					Nahlásit chybu
				</a>
			</div>
		</div>
	</div>
	<div class="flex flex-col">
		<header class="flex items-center gap-4 border-b p-2 lg:p-4 lg:h-16">
			<Button
				variant="outline"
				size="icon"
				class="shrink-0 lg:hidden"
			>
				<Menu class="h-5 w-5" />
				<span class="sr-only">Toggle navigation menu</span>
			</Button>
			<div class="w-full flex-1">
				<Button on:click={fnOpen} variant="outline" size="icon" class="ml-auto h-8 w-8">
					<Search class="h-4 w-4" />
				</Button>
			</div>
			<DropdownMenu.Root>
				<DropdownMenu.Trigger>
					<Avatar.Root class="h-10 w-10">
						<Avatar.Image src="https://avatars.githubusercontent.com/u/100428768" />
						<Avatar.Fallback>MB</Avatar.Fallback>
					</Avatar.Root>
				</DropdownMenu.Trigger>
				<DropdownMenu.Content align="end">
					<DropdownMenu.Item>Položka 1</DropdownMenu.Item>
					<DropdownMenu.Item>Položka 2</DropdownMenu.Item>
					<DropdownMenu.Item>Položka 3</DropdownMenu.Item>
					<DropdownMenu.Separator />
					<DropdownMenu.Item>Nastavení</DropdownMenu.Item>
					<DropdownMenu.Item>Šablona</DropdownMenu.Item>
					<DropdownMenu.Separator />
					<DropdownMenu.Item>Odhlášení</DropdownMenu.Item>
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		</header>
		<main class="flex flex-1 flex-col bg-muted/40">
			<div class="flex flex-1 flex-col gap-2 lg:gap-4 p-2 lg:p-4">
				<slot />
			</div>
		</main>
	</div>
</div>
