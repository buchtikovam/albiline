<script lang="ts">
	import * as Avatar from '$lib/components/ui/avatar';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { User } from 'lucide-svelte';
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger>
		<Avatar.Root class="w-7 h-7 ">
			<Avatar.Image src="/" alt="icon" />
			<Avatar.Fallback class="bg-albi-500">
				<User class="w-5 h-5 text-white" />
			</Avatar.Fallback>
		</Avatar.Root>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content>
		<DropdownMenu.Group>
			<DropdownMenu.Label>Albi</DropdownMenu.Label>
			<DropdownMenu.Separator />
			<DropdownMenu.Item><a href="/">Profil</a></DropdownMenu.Item>
			<DropdownMenu.Item><a href="/">Nastavení</a></DropdownMenu.Item>
			<DropdownMenu.Item><a href="/">Odhlásit se</a></DropdownMenu.Item>
		</DropdownMenu.Group>
	</DropdownMenu.Content>
</DropdownMenu.Root>
