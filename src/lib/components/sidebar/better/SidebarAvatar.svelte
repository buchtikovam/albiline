<script lang="ts">
	import * as Sidebar from "$lib/components/ui/sidebar";
	import * as Avatar from "$lib/components/ui/avatar/index.js";
	import * as m from '$lib/paraglide/messages.js'

	import * as Collapsible from "$lib/components/ui/collapsible";
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
	import BadgeCheck from "lucide-svelte/icons/badge-check";
	import Bell from "lucide-svelte/icons/bell";
	import ChevronsUpDown from "lucide-svelte/icons/chevrons-up-down";
	import CreditCard from "lucide-svelte/icons/credit-card";
	import LogOut from "lucide-svelte/icons/log-out";
	import Sparkles from "lucide-svelte/icons/sparkles";
	import {useSidebar} from "$lib/components/ui/sidebar";
	import {availableLanguageTags, languageTag} from "$lib/paraglide/runtime";
	import {i18n} from "$lib/i18n";
	import {page} from "$app/state";
	import CountryFlag from "$lib/components/icons/CountryFlag.svelte";
	import * as Select from "$lib/components/ui/select/index.js";
	import User from "lucide-svelte/icons/user";
	import {goto} from "$app/navigation";
	import Settings from "lucide-svelte/icons/settings";
	import {agGridTables} from "$lib/runes/table.svelte";

	let { user }: { user: { name: string; email: string; avatar: string } } = {
		user: {
			name: "MBUC",
			email: "monika.buchtikova@albi.cz",
			avatar: "MB",
		},
	}

	const sidebar = useSidebar();


	let language = $state(languageTag());

</script>

<Sidebar.Menu>
	<Sidebar.MenuItem>
		<DropdownMenu.Root>
			<DropdownMenu.Trigger>
				{#snippet child({ props })}
					<Sidebar.MenuButton
						size="lg"
						class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
						{...props}
					>
						<Avatar.Root class="h-8 w-8 rounded-lg">
<!--							<Avatar.Image-->
<!--								src={user.avatar}-->
<!--								alt={user.name}-->
<!--							/>-->

							<Avatar.Fallback class="rounded-lg">
								MB
							</Avatar.Fallback>


						</Avatar.Root>

						<div class="grid flex-1 text-left text-sm leading-tight">
							<span class="truncate font-semibold">
								{user.name}
							</span>

							<span class="truncate text-xs">
								{user.email}
							</span>
						</div>

						<ChevronsUpDown class="ml-auto size-4" />
					</Sidebar.MenuButton>
				{/snippet}
			</DropdownMenu.Trigger>


			<DropdownMenu.Content
				class="w-[var(--bits-dropdown-menu-anchor-width)] min-w-56 rounded-lg"
				side={sidebar.isMobile ? "bottom" : "right"}
				align="end"
				sideOffset={4}
			>
				<DropdownMenu.Label class="p-0 font-normal">
					<div class="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
						<Avatar.Root class="h-8 w-8 rounded-lg">
<!--							<Avatar.Image-->
<!--								src={user.avatar}-->
<!--								alt={user.name}-->
<!--							/>-->

							<Avatar.Fallback class="rounded-lg ">
								MB
							</Avatar.Fallback>
						</Avatar.Root>

						<div class="grid flex-1 text-left text-sm leading-tight">
							<span class="truncate font-semibold">
								{user.name}
							</span>

							<span class="truncate text-xs">
								{user.email}
							</span>
						</div>
					</div>
				</DropdownMenu.Label>
				<DropdownMenu.Separator />

				<DropdownMenu.Group>
					<DropdownMenu.Item
						class="flex w-full items-center"
						onclick={() => goto(i18n.resolveRoute("profil"))}
					>
						<User />
						{m.components_avatar_profile()}
					</DropdownMenu.Item>

					<DropdownMenu.Item
						class="flex w-full items-center"
						onclick={() => goto(i18n.resolveRoute("nastaveni"))}
					>
						<Settings />
						{m.components_avatar_settings()}
					</DropdownMenu.Item>
				</DropdownMenu.Group>
				<DropdownMenu.Separator />



				<DropdownMenu.Group>
					<form action="/logout" method="POST">
						<button
							class="w-full"
							onclick={() => {
								agGridTables.value = {};
							}}
						>
							<DropdownMenu.Item
								class="flex items-center"
							>
								<LogOut />
								{m.components_avatar_logout()}
							</DropdownMenu.Item>
						</button>
					</form>
				</DropdownMenu.Group>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	</Sidebar.MenuItem>
</Sidebar.Menu>
