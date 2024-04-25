<script lang="ts">
	import {
		Binary,
		Croissant,
		Hammer,
		HandCoins, Menu,
		ShoppingBasket,
		TableProperties,
		Warehouse
	} from 'lucide-svelte';

	import { Button } from '$lib/components/ui/button';
	import * as Accordion from '$lib/components/ui/accordion';
	import * as ContextMenu from '$lib/components/ui/context-menu';
	import * as Tooltip from '$lib/components/ui/tooltip';

	let show: boolean = true;

	function toggleFn() {
		show = !show;
		console.log(show);
	}
</script>

{#if show === true}
	<div class="flex h-full max-h-screen flex-col w-[320px]">
		<div class="flex-1">
			<Accordion.Root>
				<nav class="grid items-start px-2 lg:p-4 gap-2">
					<!-- level 1 with no children elements -->
					<a href="/"
					   class="flex text-sm font-medium  items-center gap-3 rounded-lg px-3 py-2 hover:bg-muted/40 text-muted-foreground transition-all hover:text-primary">
						<TableProperties class="h-6 w-6" />
						Průvodní list
					</a>

					<!-- level 1 with children elements -->
					<Accordion.Item value="sklad">
						<Accordion.Trigger>
							<div
								class="flex text-sm font-medium  items-center gap-3 rounded-lg px-3 py-2 hover:bg-muted/40 text-muted-foreground transition-all hover:text-primary">
								<Warehouse class="h-6 w-6" />
								Sklad
							</div>
						</Accordion.Trigger>
						<Accordion.Content>
							<!-- level 2 children elements-->
							<a href="/">Hodinovka</a>
							<a href="/">Příjem a výdej</a>
							<a href="/">Stav skladu</a>
							<a href="/">Zásilky</a>
						</Accordion.Content>
					</Accordion.Item>

					<Accordion.Item value="vyroba">
						<Accordion.Trigger>
							<div
								class="flex text-sm font-medium  items-center gap-3 rounded-lg px-3 py-2 hover:bg-muted/40 text-muted-foreground transition-all hover:text-primary">
								<Hammer class="h-6 w-6" />
								Výroba
							</div>
						</Accordion.Trigger>
						<Accordion.Content>
							<a href="/">test</a>
							<a href="/">test</a>
							<a href="/">test</a>
							<a href="/">test</a>
						</Accordion.Content>
					</Accordion.Item>

					<Accordion.Item value="prodej">
						<Accordion.Trigger>
							<div
								class="flex text-sm font-medium  items-center gap-3 rounded-lg px-3 py-2 hover:bg-muted/40 text-muted-foreground transition-all hover:text-primary">
								<ShoppingBasket class="h-6 w-6" />
								Prodej
							</div>
						</Accordion.Trigger>
						<Accordion.Content>
							<a href="/">test</a>
							<a href="/">test</a>
							<a href="/">test</a>
							<a href="/">test</a>
						</Accordion.Content>
					</Accordion.Item>

					<Accordion.Item value="ucetni">
						<Accordion.Trigger>
							<div
								class="flex text-sm font-medium  items-center gap-3 rounded-lg px-3 py-2 hover:bg-muted/40 text-muted-foreground transition-all hover:text-primary">
								<HandCoins class="h-6 w-6" />
								Účetní
							</div>
						</Accordion.Trigger>
						<Accordion.Content>
							<a href="/">test</a>
							<a href="/">test</a>
							<a href="/">test</a>
							<a href="/">test</a>
						</Accordion.Content>
					</Accordion.Item>

					<Accordion.Item value="it">
						<Accordion.Trigger>
							<div
								class="flex text-sm font-medium  items-center gap-3 rounded-lg px-3 py-2 hover:bg-muted/40 text-muted-foreground transition-all hover:text-primary">
								<Binary class="h-6 w-6" />
								IT
							</div>
						</Accordion.Trigger>
						<Accordion.Content>
							<a href="/">test</a>
							<a href="/">test</a>
							<a href="/">test</a>
							<a href="/">test</a>
						</Accordion.Content>
					</Accordion.Item>

					<Accordion.Item value="pekarstvi">
						<Accordion.Trigger>
							<div
								class="flex text-sm font-medium  items-center gap-3 rounded-lg px-3 py-2 hover:bg-muted/40 text-muted-foreground transition-all hover:text-primary">
								<Croissant class="h-6 w-6" />
								Pekařství
							</div>
						</Accordion.Trigger>
						<Accordion.Content>
							<a href="/">test</a>
							<a href="/">test</a>
							<a href="/">test</a>
							<a href="/">test</a>
						</Accordion.Content>
					</Accordion.Item>
				</nav>
			</Accordion.Root>
		</div>
		<div class="flex justify-end">
			<Button
				variant="ghost"
				size="icon"
				class="float-right"
				on:click={toggleFn}
			>
				<Menu class="h-5 w-5" />
				<span class="sr-only">Toggle navigation menu</span>
			</Button>
		</div>
	</div>
{:else}
	<div class="flex h-full max-h-screen flex-col w-[60px]">
		<div class="flex-1">
			<nav class="grid pt-4  gap-2 justify-center">

				<Tooltip.Root>
					<Tooltip.Trigger>
						<a href="/"
						   class="flex text-sm font-medium items-center gap-3 rounded-lg px-2 py-2 text-muted-foreground hover:bg-muted/40 transition-all hover:text-primary">
							<TableProperties class="h-6 w-6" />
						</a>
					</Tooltip.Trigger>
					<Tooltip.Content class="ml-10 mt-10">
						<p>Průvodní list</p>
					</Tooltip.Content>
				</Tooltip.Root>

				<Tooltip.Root>
					<Tooltip.Trigger>
						<ContextMenu.Root>
							<ContextMenu.Trigger>
								<div
									class="flex text-sm font-medium  items-center gap-3 rounded-lg px-2 py-2 text-muted-foreground hover:bg-muted/40 transition-all hover:text-primary">
									<Warehouse class="h-6 w-6" />
								</div>
							</ContextMenu.Trigger>
							<ContextMenu.Content>
								<ContextMenu.Item>
									<a href="/">
										Hodinovka
									</a>
								</ContextMenu.Item>
								<ContextMenu.Item>
									<a href="/">
										Příjem a výdej
									</a>
								</ContextMenu.Item>
								<ContextMenu.Item>
									<a href="/">
										Stav skladu
									</a>
								</ContextMenu.Item>
								<ContextMenu.Item>
									<a href="/">
										Zásilky
									</a>
								</ContextMenu.Item>
							</ContextMenu.Content>
						</ContextMenu.Root>
					</Tooltip.Trigger>
					<Tooltip.Content class="ml-10 mt-10">
						<p>Sklad</p>
					</Tooltip.Content>
				</Tooltip.Root>

				<Tooltip.Root>
					<Tooltip.Trigger>
						<ContextMenu.Root>
							<ContextMenu.Trigger>
								<div
									class="flex text-sm font-medium  items-center gap-3 rounded-lg px-2 py-2 text-muted-foreground hover:bg-muted/40 transition-all hover:text-primary">
									<Hammer class="h-6 w-6" />
								</div>
							</ContextMenu.Trigger>
							<ContextMenu.Content>
								<ContextMenu.Item>
									<a href="/">
										test
									</a>
								</ContextMenu.Item>
								<ContextMenu.Item>
									<a href="/">
										test
									</a>
								</ContextMenu.Item>
								<ContextMenu.Item>
									<a href="/">
										test
									</a>
								</ContextMenu.Item>
							</ContextMenu.Content>
						</ContextMenu.Root>
					</Tooltip.Trigger>
					<Tooltip.Content class="ml-10 mt-10">
						<p>Výroba</p>
					</Tooltip.Content>
				</Tooltip.Root>

				<Tooltip.Root>
					<Tooltip.Trigger>
						<ContextMenu.Root>
							<ContextMenu.Trigger>
								<div
									class="flex text-sm font-medium  items-center gap-3 rounded-lg px-2 py-2 text-muted-foreground hover:bg-muted/40 transition-all hover:text-primary">
									<ShoppingBasket class="h-6 w-6" />
								</div>
							</ContextMenu.Trigger>
							<ContextMenu.Content>
								<ContextMenu.Item>
									<a href="/">
										test
									</a>
								</ContextMenu.Item>
								<ContextMenu.Item>
									<a href="/">
										test
									</a>
								</ContextMenu.Item>
								<ContextMenu.Item>
									<a href="/">
										test
									</a>
								</ContextMenu.Item>
							</ContextMenu.Content>
						</ContextMenu.Root>
					</Tooltip.Trigger>
					<Tooltip.Content class="ml-10 mt-10">
						<p>Prodej</p>
					</Tooltip.Content>
				</Tooltip.Root>

				<Tooltip.Root>
					<Tooltip.Trigger>
						<ContextMenu.Root>
							<ContextMenu.Trigger>
								<div
									class="flex text-sm font-medium  items-center gap-3 rounded-lg px-2 py-2 text-muted-foreground hover:bg-muted/40 transition-all hover:text-primary">
									<HandCoins class="h-6 w-6" />
								</div>
							</ContextMenu.Trigger>
							<ContextMenu.Content>
								<ContextMenu.Item>
									<a href="/">
										test
									</a>
								</ContextMenu.Item>
								<ContextMenu.Item>
									<a href="/">
										test
									</a>
								</ContextMenu.Item>
								<ContextMenu.Item>
									<a href="/">
										test
									</a>
								</ContextMenu.Item>
							</ContextMenu.Content>
						</ContextMenu.Root>
					</Tooltip.Trigger>
					<Tooltip.Content class="ml-10 mt-10">
						<p>Účetní</p>
					</Tooltip.Content>
				</Tooltip.Root>

				<Tooltip.Root>
					<Tooltip.Trigger>
						<ContextMenu.Root>
							<ContextMenu.Trigger>
								<div
									class="flex text-sm font-medium  items-center gap-3 rounded-lg px-2 py-2 text-muted-foreground hover:bg-muted/40 transition-all hover:text-primary">
									<Binary class="h-6 w-6" />
								</div>
							</ContextMenu.Trigger>
							<ContextMenu.Content>
								<ContextMenu.Item>
									<a href="/">
										test
									</a>
								</ContextMenu.Item>
								<ContextMenu.Item>
									<a href="/">
										test
									</a>
								</ContextMenu.Item>
								<ContextMenu.Item>
									<a href="/">
										test
									</a>
								</ContextMenu.Item>
							</ContextMenu.Content>
						</ContextMenu.Root>

					</Tooltip.Trigger>
					<Tooltip.Content class="ml-10 mt-10">
						<p>IT</p>
					</Tooltip.Content>
				</Tooltip.Root>

				<Tooltip.Root>
					<Tooltip.Trigger>
						<ContextMenu.Root>
							<ContextMenu.Trigger>
								<div
									class="flex text-sm font-medium  items-center gap-3 rounded-lg px-2 py-2 text-muted-foreground hover:bg-muted/40 transition-all hover:text-primary">
									<Croissant class="h-6 w-6" />
								</div>
							</ContextMenu.Trigger>
							<ContextMenu.Content>
								<ContextMenu.Item>
									<a href="/">
										test
									</a>
								</ContextMenu.Item>
								<ContextMenu.Item>
									<a href="/">
										test
									</a>
								</ContextMenu.Item>
								<ContextMenu.Item>
									<a href="/">
										test
									</a>
								</ContextMenu.Item>
							</ContextMenu.Content>
						</ContextMenu.Root>
					</Tooltip.Trigger>
					<Tooltip.Content class="ml-10 mt-10">
						<p>Pekařství</p>
					</Tooltip.Content>
				</Tooltip.Root>
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
	</div>
{/if}
