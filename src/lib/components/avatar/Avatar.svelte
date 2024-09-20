<script lang="ts">
	import Settings from 'lucide-svelte/icons/settings';
	import LogOut from 'lucide-svelte/icons/log-out';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import User from 'lucide-svelte/icons/user';

	/*
		Avatar komponent s dropdownem a uživatelskými nastaveními
	*/

	export let userName: string = 'MBUC';
</script>



<DropdownMenu.Root closeOnItemClick={false}>
	<DropdownMenu.Trigger class="rounded-md bg-albi-500 min-w-8 size-8">
		<User class="size-5 m-1 mx-auto text-slate-50"/>
	</DropdownMenu.Trigger>

	<DropdownMenu.Content class="w-60">
		<DropdownMenu.Label class="font-bold text-base">
			Vítejte,
			<span class="text-albi-500">
				{userName}
			</span>
		</DropdownMenu.Label>
		<DropdownMenu.Separator />

		<DropdownMenu.Group>
			<DropdownMenu.Item>
				<a href="/" class="flex items-center">
					<User class="w-4 h-4 mr-2" />
					Profil
				</a>
			</DropdownMenu.Item>
			<DropdownMenu.Item>
				<a href="/" class="flex items-center">
					<Settings class="w-4 h-4 mr-2" />
					Nastavení
				</a>
			</DropdownMenu.Item>
		</DropdownMenu.Group>
		<DropdownMenu.Separator />


		<DropdownMenu.Group>
			<DropdownMenu.Item>
				<a href="/" class="flex items-center">
					<LogOut class="w-4 h-4 mr-2" />
					Odhlásit se
				</a>
			</DropdownMenu.Item>
		</DropdownMenu.Group>
	</DropdownMenu.Content>
</DropdownMenu.Root>


