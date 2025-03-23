<script lang="ts">
	import * as Sidebar from "$lib/components/ui/sidebar";
	import * as Collapsible from "$lib/components/ui/collapsible";
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
	import Calendar from "@lucide/svelte/icons/calendar";
	import House from "@lucide/svelte/icons/house";
	import Inbox from "@lucide/svelte/icons/inbox";
	import Search from "@lucide/svelte/icons/search";
	import Settings from "@lucide/svelte/icons/settings";
	import ChevronDown from "lucide-svelte/icons/chevron-down";
	import ChevronUp from "lucide-svelte/icons/chevron-up";
	import Rows3 from "lucide-svelte/icons/rows-3";
	import Clock2 from "lucide-svelte/icons/clock-2";
	import Heart from "lucide-svelte/icons/heart";
	import ChevronsUpDown from "lucide-svelte/icons/chevrons-up-down";
	import Plus from "lucide-svelte/icons/plus";
	import {useSidebar} from "$lib/components/ui/sidebar";
	import SidebarCategorySwitcher from "$lib/components/sidebar/better/SidebarCategorySwitcher.svelte";
	import SidebarMain from "$lib/components/sidebar/better/SidebarMain.svelte";


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




<Sidebar.Root collapsible="icon" variant="floating"  >
	<Sidebar.Header class="bg-white">
		<SidebarCategorySwitcher/>
	</Sidebar.Header>


	<Sidebar.Content class="bg-white">
		<SidebarMain/>
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
