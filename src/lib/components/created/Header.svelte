<script lang="ts">
	import * as Tabs from '$lib/components/ui/tabs';
	// import Logo from '$lib/icons/Logo.svelte';
	import * as Avatar from '$lib/components/ui/avatar';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { goto } from '$app/navigation';
</script>

<div class="flex justify-between">
	<Tabs.Root class="w-fit h-fit pt-2">
		<Tabs.List>
			<Tabs.Trigger value="pruvodni-list" on:click={() => goto("/")}>Průvodní list</Tabs.Trigger>
			<Tabs.Trigger value="faktury-2024" on:click={() => goto("/")}>Faktury 2024</Tabs.Trigger>
		</Tabs.List>
	</Tabs.Root>


	<div class="pt-1 pr-2">
		<DropdownMenu.Root>
			<DropdownMenu.Trigger>
				<Avatar.Root class="w-8 h-8 ">
					<Avatar.Image src="" alt="icon" />
					<Avatar.Fallback>AB</Avatar.Fallback>
				</Avatar.Root>
			</DropdownMenu.Trigger>
			<DropdownMenu.Content>
				<DropdownMenu.Group>
					<DropdownMenu.Label>Albi</DropdownMenu.Label>
					<DropdownMenu.Separator />
					<DropdownMenu.Item>Profil</DropdownMenu.Item>
					<DropdownMenu.Item>Nastavení</DropdownMenu.Item>
					<DropdownMenu.Item>Odhlásit se</DropdownMenu.Item>
				</DropdownMenu.Group>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	</div>
</div>

