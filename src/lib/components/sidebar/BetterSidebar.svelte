<script lang="ts">
	import * as Sidebar from "$lib/components/ui/sidebar/index.js";
	import * as Collapsible from "$lib/components/ui/collapsible/index.js";
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
	import Calendar from "@lucide/svelte/icons/calendar";
	import House from "@lucide/svelte/icons/house";
	import Inbox from "@lucide/svelte/icons/inbox";
	import Search from "@lucide/svelte/icons/search";
	import Settings from "@lucide/svelte/icons/settings";
	import ChevronDown from "lucide-svelte/icons/chevron-down";
	import ChevronUp from "lucide-svelte/icons/chevron-up";


	// Menu items.
	const items = [
		{
			title: "Home",
			url: "#",
			icon: House,
		},
		{
			title: "Inbox",
			url: "#",
			icon: Inbox,
		},
		{
			title: "Calendar",
			url: "#",
			icon: Calendar,
		},
		{
			title: "Search",
			url: "#",
			icon: Search,
		},
		{
			title: "Settings",
			url: "#",
			icon: Settings,
		},
	];
</script>

<Sidebar.Root collapsible="icon" variant="floating">
	<Sidebar.Header class="bg-white">
		<Sidebar.Menu>
			<Sidebar.MenuItem>
				<DropdownMenu.Root>
					<DropdownMenu.Trigger>
						{#snippet child({ props })}
							<Sidebar.MenuButton {...props}>
								Select Workspace
								<ChevronDown class="ml-auto" />
							</Sidebar.MenuButton>
						{/snippet}
					</DropdownMenu.Trigger>
					<DropdownMenu.Content class="w-[--bits-dropdown-menu-anchor-width]">
						<DropdownMenu.Item>
							<span>Acme Inc</span>
						</DropdownMenu.Item>
						<DropdownMenu.Item>
							<span>Acme Corp.</span>
						</DropdownMenu.Item>
					</DropdownMenu.Content>
				</DropdownMenu.Root>
			</Sidebar.MenuItem>
		</Sidebar.Menu>
	</Sidebar.Header>


	<Sidebar.Content class="bg-white">
		<Sidebar.Group>
			<Sidebar.GroupLabel>Application</Sidebar.GroupLabel>
			<Sidebar.GroupContent>
				<Sidebar.Menu>
					{#each items as item (item.title)}
						<Sidebar.MenuItem>
							<Sidebar.MenuButton>
								{#snippet child({ props })}
									<a href={item.url} {...props}>
										<item.icon />
										<span>{item.title}</span>
									</a>
								{/snippet}
							</Sidebar.MenuButton>
						</Sidebar.MenuItem>
					{/each}
				</Sidebar.Menu>


<!--				<Sidebar.Menu>-->
<!--					<Collapsible.Root open class="group/collapsible">-->
<!--						<Sidebar.MenuItem>-->
<!--							<Collapsible.Trigger>-->
<!--								{#snippet child({ props })}-->
<!--									<Sidebar.MenuButton {...props} />-->
<!--								{/snippet}-->
<!--							</Collapsible.Trigger>-->
<!--							<Collapsible.Content>-->
<!--								<Sidebar.MenuSub>-->
<!--									<Sidebar.MenuSubItem />-->
<!--								</Sidebar.MenuSub>-->
<!--							</Collapsible.Content>-->
<!--						</Sidebar.MenuItem>-->
<!--					</Collapsible.Root>-->
<!--				</Sidebar.Menu>-->
			</Sidebar.GroupContent>
		</Sidebar.Group>
	</Sidebar.Content>


	<Sidebar.Footer class="bg-white">
		<Sidebar.Menu>
			<Sidebar.MenuItem>
				<DropdownMenu.Root>
					<DropdownMenu.Trigger>
						{#snippet child({ props })}
							<Sidebar.MenuButton
								{...props}
								class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
							>
								Username
								<ChevronUp class="ml-auto" />
							</Sidebar.MenuButton>
						{/snippet}
					</DropdownMenu.Trigger>
					<DropdownMenu.Content
						side="top"
						class="w-[--bits-dropdown-menu-anchor-width]"
					>
						<DropdownMenu.Item>
							<span>Account</span>
						</DropdownMenu.Item>
						<DropdownMenu.Item>
							<span>Billing</span>
						</DropdownMenu.Item>
						<DropdownMenu.Item>
							<span>Sign out</span>
						</DropdownMenu.Item>
					</DropdownMenu.Content>
				</DropdownMenu.Root>
			</Sidebar.MenuItem>
		</Sidebar.Menu>
	</Sidebar.Footer>

<!--	<Sidebar.Trigger/>-->
<!--	<Sidebar.Rail />-->

</Sidebar.Root>
