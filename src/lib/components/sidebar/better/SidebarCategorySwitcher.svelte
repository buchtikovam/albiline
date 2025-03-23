<script lang="ts">
	import {useSidebar} from "$lib/components/ui/sidebar";
	import ChevronsUpDown from "lucide-svelte/icons/chevrons-up-down";
	import Clock2 from "lucide-svelte/icons/clock-2";
	import Rows3 from "lucide-svelte/icons/rows-3";
	import Heart from "lucide-svelte/icons/heart";
	import * as Sidebar from "$lib/components/ui/sidebar";
	import * as Collapsible from "$lib/components/ui/collapsible";
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu";

	let categories: { name: string; value: string, icon: any}[] = [
		{
			name: "Všechny",
			value: "all",
			icon: Rows3
		},
		{
			name: "Nedávné",
			value: "recent",
			icon: Clock2
		},
		{
			name: "Oblíbené",
			value: "favorite",
			icon: Heart
		}
	];

	let activeCategory = $state(categories[0])
	const sidebar = useSidebar();
</script>


<Sidebar.Menu>
	<Sidebar.MenuItem>
		<DropdownMenu.Root>
			<DropdownMenu.Trigger>
				{#snippet child({ props })}
					<Sidebar.MenuButton
						{...props}
						size="lg"
						class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
					>
						<div
							class="bg-sidebar-primary text-white flex aspect-square size-8 min-w-8 bg-albi-500 items-center justify-center rounded-lg"
						>
							<activeCategory.icon class="size-4" />
						</div>

						<div class="grid flex-1 text-left text-sm leading-tight">
							<span class="truncate font-semibold">
								Albiline 2.0
							</span>

							<span class="truncate text-xs">{activeCategory.name}</span>
						</div>

						<ChevronsUpDown class="ml-auto" />
					</Sidebar.MenuButton>
				{/snippet}
			</DropdownMenu.Trigger>


			<DropdownMenu.Content
				class="w-[var(--bits-dropdown-menu-anchor-width)] min-w-56 rounded-lg"
				align="start"
				side={sidebar.isMobile ? "bottom" : "right"}
				sideOffset={4}
			>
				<DropdownMenu.Label
					class="text-muted-foreground text-xs"
				>
					Zobrazit
				</DropdownMenu.Label>

				{#each categories as category (category.name)}
					<DropdownMenu.Item
						onSelect={() => (activeCategory = category)}
						class="gap-2 p-2"
					>
						<div
							class="flex size-6 items-center justify-center rounded-sm border"
						>
							<category.icon class="size-4 shrink-0" />
						</div>

						{category.name}
					</DropdownMenu.Item>
				{/each}
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	</Sidebar.MenuItem>
</Sidebar.Menu>
