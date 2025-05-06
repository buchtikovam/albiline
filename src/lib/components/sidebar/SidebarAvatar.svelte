<script lang="ts">
	import {agGridTables} from "$lib/runes/table.svelte.js";
	import {getLocale, locales, localizeHref, localizeUrl, setLocale} from "$lib/paraglide/runtime";
	import {clearCache} from "$lib/cacheManager";
	import {useSidebar} from "$lib/components/ui/sidebar";
	import {goto} from "$app/navigation";
	import ChevronsUpDown from "lucide-svelte/icons/chevrons-up-down";
	import Settings from "lucide-svelte/icons/settings";
	import LogOut from "lucide-svelte/icons/log-out";
	import User from "lucide-svelte/icons/user";
	import Bug from "lucide-svelte/icons/bug";
	import * as m from '$lib/paraglide/messages.js'
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
	import * as Sidebar from "$lib/components/ui/sidebar";
	import * as Avatar from "$lib/components/ui/avatar";
	import CountryFlag from "$lib/components/icons/CountryFlag.svelte";
	import * as Select from "$lib/components/ui/select/index.js";
	import { page } from "$app/state";
	import {authDetails} from "$lib/runes/page.svelte";

	let user = $derived(authDetails)

	const sidebar = useSidebar();
	let language = $state(getLocale());

	let initialsFallback = $derived.by(() => {
		if (user.userName) {
			let words = user.userName.split(" ").map(word => word[0]);

			return words.join("")
		}
	})
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
							<Avatar.Image
								src={user.icon}
								alt={user.icon}
							/>

							<Avatar.Fallback class="rounded-lg">
								{initialsFallback}
							</Avatar.Fallback>
						</Avatar.Root>

						<div class="grid flex-1 text-left text-sm leading-tight">
							<span class="truncate font-semibold">
								{user.userName}
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
						<Avatar.Root class="h-8 w-8 rounded-lg flex items-center justify-center">
							<Select.Root
								type="single"
								bind:value={language}
							>
								<Select.Trigger
									hideChevron={true}
									class="h-fit w-fit p-0 border-none rounded-none"
								>
									<CountryFlag language={language}/>
								</Select.Trigger>

								<Select.Content class="min-w-fit overflow-visible !z-50">
									<div class="flex flex-col">
										{#each locales as lang}
											<button
												onclick={() => setLocale(lang)}
											>
												<Select.Item
													hideCheck={false}
													value={lang}
													class="w-fit"
												>
													<CountryFlag language={lang}/>
												</Select.Item>
											</button>
										{/each}
									</div>

								</Select.Content>
							</Select.Root>
						</Avatar.Root>

						<div class="grid flex-1 text-left text-sm leading-tight">
							<span class="truncate font-semibold">
								{user.userName}
							</span>

							<span class="truncate text-xs">
								{user.email}
							</span>
						</div>
					</div>
				</DropdownMenu.Label>
				<DropdownMenu.Separator />

				<DropdownMenu.Group>
<!--					<DropdownMenu.Label-->
<!--						class="text-muted-foreground text-xs"-->
<!--					>-->
<!--						Uživatel-->
<!--					</DropdownMenu.Label>-->

					<DropdownMenu.Item
						class="flex w-full items-center"
						onclick={() => goto(localizeHref("profil"))}
					>
						<User />
						{m.components_avatar_profile()}
					</DropdownMenu.Item>


				</DropdownMenu.Group>
				<DropdownMenu.Separator />



				<DropdownMenu.Group>
<!--					<DropdownMenu.Label-->
<!--						class="text-muted-foreground text-xs"-->
<!--					>-->
<!--						Aplikace-->
<!--					</DropdownMenu.Label>-->

					<DropdownMenu.Item
						class="flex w-full items-center"
						onclick={() => goto(localizeHref("nastaveni"))}
					>
						<Settings />
						{m.components_avatar_settings()}
					</DropdownMenu.Item>

					<DropdownMenu.Item
						class="flex w-full items-center"
					>
						<Bug/>
						Nahlásit chybu
					</DropdownMenu.Item>
				</DropdownMenu.Group>
				<DropdownMenu.Separator />



				<DropdownMenu.Group>
					<form
						action="/logout"
						method="POST"
					>
						<button
							class="w-full"
							onclick={async () => {
								await clearCache();
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
