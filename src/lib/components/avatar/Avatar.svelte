<script lang="ts">
	import { authDetails, pageCompact } from '$lib/runes/page.svelte';
	import { i18n } from '$lib/i18n.js';
	import { page } from '$app/state';
	import { languageTag, availableLanguageTags } from "$lib/paraglide/runtime.js";
	import UnfoldVertical from 'lucide-svelte/icons/unfold-vertical';
	import FoldVertical from 'lucide-svelte/icons/fold-vertical';
	import Settings from 'lucide-svelte/icons/settings';
	import LogOut from 'lucide-svelte/icons/log-out';
	import User from 'lucide-svelte/icons/user';
	import * as m from '$lib/paraglide/messages.js'
	import CountryFlag from '$lib/components/icons/CountryFlag.svelte';
	import * as Select from "$lib/components/ui/select/index.js";
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';


	let userName = $derived(authDetails.userName);
	let language = $state(languageTag());
</script>



<DropdownMenu.Root>
	<DropdownMenu.Trigger class="rounded-md bg-albi-500 min-w-8 size-8">
		<User class="size-5 m-1 mx-auto text-slate-50"/>
	</DropdownMenu.Trigger>

	<DropdownMenu.Content class="min-w-48 md:min-w-64  mr-4 mb-4">
		<DropdownMenu.Label class="font-bold  text-albi-950 max-w-[280px] text-base flex justify-between items-center overflow-visible">
			<p class="pr-2">
				{userName}
			</p>

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


				<Select.Content class="mr-7 min-w-fit overflow-visible! !z-50">
					{#each availableLanguageTags as lang}
						<a
							href={i18n.route(page.url.pathname)}
							hreflang={lang}
							aria-current={lang === languageTag() ? "page" : undefined}
						>
							<Select.Item
								hideCheck={false}
								value={lang}
								class="w-fit"
							>
								<CountryFlag language={lang}/>
							</Select.Item>
						</a>
					{/each}
				</Select.Content>
			</Select.Root>
		</DropdownMenu.Label>


		<DropdownMenu.Separator />


		<DropdownMenu.Group>
			<DropdownMenu.Item>
				<div class="flex items-center">
					<User class="size-5 mr-2" />
					{m.components_avatar_profile()}
				</div>
			</DropdownMenu.Item>
			<DropdownMenu.Item>
				<div class="flex items-center">
					<Settings class="size-5 mr-2" />
					{m.components_avatar_settings()}
				</div>
			</DropdownMenu.Item>
		</DropdownMenu.Group>


		<DropdownMenu.Separator />


		<DropdownMenu.Group>
			<DropdownMenu.Label>
				{m.components_avatar_view()}
			</DropdownMenu.Label>

			<DropdownMenu.Item
				class="flex items-center"
				onclick={() => {
					pageCompact.value = false;
					window.location.reload();
				}}
			>
				<UnfoldVertical class="size-5" />
				{m.components_avatar_view_default()}
			</DropdownMenu.Item>

			<DropdownMenu.Item
				onclick={() => {
					pageCompact.value = true;
					window.location.reload();
				}}
				class="flex items-center"
			>
				<FoldVertical class="size-5" />
				{m.components_avatar_view_compact()}
			</DropdownMenu.Item>
		</DropdownMenu.Group>


		<DropdownMenu.Separator />


		<DropdownMenu.Group>
			<form action="/logout" method="POST">
				<button class="w-full">
					<DropdownMenu.Item
						class="flex items-center"
					>
						<LogOut class="size-5" />
						{m.components_avatar_logout()}
					</DropdownMenu.Item>
				</button>
			</form>
		</DropdownMenu.Group>
	</DropdownMenu.Content>
</DropdownMenu.Root>
