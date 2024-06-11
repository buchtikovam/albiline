<script lang="ts">
	import { pageCompactStore } from '$lib/stores/tableStore';
	import { allowTabAdding } from '$lib/stores/tabStore';
	import User from 'lucide-svelte/icons/user';
	import Settings from 'lucide-svelte/icons/settings';
	import LogOut from 'lucide-svelte/icons/log-out';
	import * as Avatar from '$lib/components/ui/avatar';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';

	// Avatar komponent s dropdownem a rychlými nastaveními

	export let userName: string = 'MBUC';
	export let userImage: string = '';

	let isCompact: 'standard' | 'compact';
	let isChecked: boolean;

	pageCompactStore.subscribe((data) => isCompact = data);
	allowTabAdding.subscribe((data) => isChecked = data);

	// Nastavení kompaktnosti stránky
	function setHeight(state: 'standard' | 'compact') {
		pageCompactStore.set(state);
	}

	// Povolení přidávání stránek do tabů
	function setTabAllow() {
		allowTabAdding.set(!isChecked)
	}
</script>

<DropdownMenu.Root closeOnItemClick={false}>
	<DropdownMenu.Trigger>
		<!-- Avatar ikona -->
		<Avatar.Root class="w-7 h-7 ">
			<Avatar.Image src={`/${userImage}`} alt="icon" />
			<Avatar.Fallback class="bg-albi-500">
				<User class="w-5 h-5 text-white" />
			</Avatar.Fallback>
		</Avatar.Root>
	</DropdownMenu.Trigger>

	<!-- Avatar dropdown -->
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

		<!-- Nastavení kompaktnosti stránky -->
		<DropdownMenu.RadioGroup bind:value={isCompact}>
			<DropdownMenu.Label>
				Zobrazení
			</DropdownMenu.Label>

			<DropdownMenu.RadioItem value="standard" class="cursor-pointer" on:click={() => setHeight("standard")}>
				Standardní
			</DropdownMenu.RadioItem>
			<DropdownMenu.RadioItem value="compact" class="cursor-pointer" on:click={() => setHeight("compact")}>
				Kompaktní
			</DropdownMenu.RadioItem>
		</DropdownMenu.RadioGroup>
		<DropdownMenu.Separator />


		<DropdownMenu.Group>
			<DropdownMenu.CheckboxItem bind:checked={isChecked} on:click={setTabAllow}>
				Povolit přidávání tabů
			</DropdownMenu.CheckboxItem>
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


