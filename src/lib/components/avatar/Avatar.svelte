<script lang="ts">
	import { rowHeightStore } from '$lib/stores/store';
	import * as Avatar from '$lib/components/ui/avatar';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';

	let isCompact: string;
	rowHeightStore.subscribe((data) => isCompact = data);

	function setHeight(state: string) {
		rowHeightStore.set(state);
	}

	export let userName: string = 'MBUC';

	import User from 'lucide-svelte/icons/user';
	import Settings from 'lucide-svelte/icons/settings';
	import LogOut from 'lucide-svelte/icons/log-out';
</script>

<DropdownMenu.Root closeOnItemClick={false}>
	<DropdownMenu.Trigger>
		<Avatar.Root class="w-7 h-7 ">
			<Avatar.Image src="/" alt="icon" />
			<Avatar.Fallback class="bg-albi-500">
				<User class="w-5 h-5 text-white" />
			</Avatar.Fallback>
		</Avatar.Root>
	</DropdownMenu.Trigger>

	<DropdownMenu.Content class="w-60">
		<DropdownMenu.Label class="font-bold text-base">
			Vítejte, <span class="text-albi-500">{userName}</span>
		</DropdownMenu.Label>
		<DropdownMenu.Separator />

		<DropdownMenu.Group>
			<DropdownMenu.Item>
				<a href="/static" class="flex items-center">
					<User class="w-4 h-4 mr-2" />
					Profil
				</a>
			</DropdownMenu.Item>
			<DropdownMenu.Item>
				<a href="/static" class="flex items-center">
					<Settings class="w-4 h-4 mr-2" />
					Nastavení
				</a>
			</DropdownMenu.Item>
		</DropdownMenu.Group>
		<DropdownMenu.Separator />

		<DropdownMenu.RadioGroup bind:value={isCompact}>
			<DropdownMenu.Label>Zobrazení</DropdownMenu.Label>
			<DropdownMenu.RadioItem value="standard" class="cursor-pointer" on:click={() => setHeight("standard")}>Standardní
			</DropdownMenu.RadioItem>
			<DropdownMenu.RadioItem value="compact" class="cursor-pointer" on:click={() => setHeight("compact")}>Kompaktní</DropdownMenu.RadioItem>
		</DropdownMenu.RadioGroup>
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


