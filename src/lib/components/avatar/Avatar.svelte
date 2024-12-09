<script lang="ts">
	import Settings from 'lucide-svelte/icons/settings';
	import LogOut from 'lucide-svelte/icons/log-out';
	import User from 'lucide-svelte/icons/user';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import FoldVertical from 'lucide-svelte/icons/fold-vertical';
	import UnfoldVertical from 'lucide-svelte/icons/unfold-vertical';
	import { pageCompactStore } from '$lib/runes-global/page.svelte';

	

	interface Props {
		/*
		Avatar komponent s dropdownem a uživatelskými nastaveními
	*/
		userName?: string;
	}

	let { userName = 'MBUC' }: Props = $props();
</script>


<DropdownMenu.Root closeOnItemClick={false}>
	<DropdownMenu.Trigger class="rounded-md bg-albi-500 min-w-8 size-8">
		<User class="size-5 m-1 mx-auto text-slate-50"/>
	</DropdownMenu.Trigger>

	<DropdownMenu.Content class="min-w-40 mr-4">
		<DropdownMenu.Label class="font-bold text-albi-950 text-base">
			{'components.avatar.welcome'}
			<span class="text-albi-500">
				{userName}
			</span>
		</DropdownMenu.Label>
		<DropdownMenu.Separator />

		<DropdownMenu.Group>
			<DropdownMenu.Item>
				<a href="/" class="flex items-center">
					<User class="size-5 mr-2" />
					{'components.avatar.profile'}

				</a>
			</DropdownMenu.Item>
			<DropdownMenu.Item>
				<a href="/" class="flex items-center">
					<Settings class="size-5 mr-2" />
					{'components.avatar.settings'}
				</a>
			</DropdownMenu.Item>
		</DropdownMenu.Group>
		<DropdownMenu.Separator />

		<DropdownMenu.Group>
			<DropdownMenu.Label>
				Zobrazení
			</DropdownMenu.Label>

			<DropdownMenu.Item>
				<button
					onclick={() => {
						pageCompactStore.set(false);
						window.location.reload();
					}}
					class="flex items-center"
				>
					<UnfoldVertical class="size-5 mr-2" />
					Výchozí
				</button>
			</DropdownMenu.Item>

			<DropdownMenu.Item>
				<button
					onclick={() => {
						pageCompactStore.set(true);
						window.location.reload();
					}}
					class="flex items-center"
				>
					<FoldVertical class="size-5 mr-2" />
					Kompaktní
				</button>
			</DropdownMenu.Item>
		</DropdownMenu.Group>
		<DropdownMenu.Separator />


		<DropdownMenu.Group>
			<DropdownMenu.Item>
				<a href="/" class="flex items-center">
					<LogOut class="size-5 mr-2" />
					{'components.avatar.logout'}
				</a>
			</DropdownMenu.Item>
		</DropdownMenu.Group>
	</DropdownMenu.Content>
</DropdownMenu.Root>


