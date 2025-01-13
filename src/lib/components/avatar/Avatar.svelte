<script lang="ts">
	import { pageCompact } from '$lib/runes/page.svelte';
	import { i18n } from '$lib/i18n.js';
	import { page } from '$app/stores';
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


	interface Props {
		userName?: string;
	}

	let { userName = 'MBUC' }: Props = $props();

	let language = $state(languageTag());
</script>



<DropdownMenu.Root>
	<DropdownMenu.Trigger class="rounded-md bg-albi-500 min-w-8 size-8">
		<User class="size-5 m-1 mx-auto text-slate-50"/>
	</DropdownMenu.Trigger>

	<DropdownMenu.Content class="min-w-48 md:min-w-64 mr-4 mb-2">
		<DropdownMenu.Label class="font-bold text-albi-950 text-base flex justify-between items-center overflow-visible">
			<div>
				{m.components_avatar_welcome()}
				<span class="text-albi-500">
					{userName}
				</span>
			</div>


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
							href={i18n.route($page.url.pathname)}
							hreflang={lang}
							aria-current={lang === languageTag() ? "page" : undefined}
						>
							<Select.Item value={lang} class="w-fit">
								<CountryFlag language={lang}/>
							</Select.Item>
						</a>
					{/each}
				</Select.Content>
			</Select.Root>

		</DropdownMenu.Label>
		<DropdownMenu.Separator />

		<!-- profile, settings -->
		<DropdownMenu.Group>
			<DropdownMenu.Item>
				<a href="/" class="flex items-center">
					<User class="size-5 mr-2" />
					{m.components_avatar_profile()}
				</a>
			</DropdownMenu.Item>
			<DropdownMenu.Item>
				<a href="/" class="flex items-center">
					<Settings class="size-5 mr-2" />
					{m.components_avatar_settings()}
				</a>
			</DropdownMenu.Item>
		</DropdownMenu.Group>
		<DropdownMenu.Separator />


		<!-- view: compact, default -->
		<DropdownMenu.Group>
			<DropdownMenu.Label>
				{m.components_avatar_view()}
			</DropdownMenu.Label>

			<DropdownMenu.Item>
				<button
					onclick={() => {
						pageCompact.value = false;
						window.location.reload();
					}}
					class="flex items-center"
				>
					<UnfoldVertical class="size-5 mr-2" />
					{m.components_avatar_view_default()}
				</button>
			</DropdownMenu.Item>

			<DropdownMenu.Item>
				<button
					onclick={() => {
						pageCompact.value = true;
						window.location.reload();
					}}
					class="flex items-center"
				>
					<FoldVertical class="size-5 mr-2" />
					{m.components_avatar_view_compact()}
				</button>
			</DropdownMenu.Item>
		</DropdownMenu.Group>
		<DropdownMenu.Separator />


		<!-- logout -->
		<DropdownMenu.Group>
			<DropdownMenu.Item>
				<a href="/" class="flex items-center">
					<LogOut class="size-5 mr-2" />
					{m.components_avatar_logout()}
				</a>
			</DropdownMenu.Item>
		</DropdownMenu.Group>
	</DropdownMenu.Content>
</DropdownMenu.Root>
