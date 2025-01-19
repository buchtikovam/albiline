<script lang="ts">
	import { editedTableData } from '$lib/runes/table.svelte';
	import { disableNavigation } from '$lib/runes/navigation.svelte';
	import { pwaAssetsHead } from 'virtual:pwa-assets/head';
	import { isMobile } from '$lib/runes/page.svelte';
	import { pwaInfo } from 'virtual:pwa-info';
	import { i18n } from '$lib/i18n.js'
	import { beforeNavigate } from '$app/navigation';
	import { ParaglideJS } from '@inlang/paraglide-sveltekit'
	import { Toaster } from 'svelte-sonner';
	import './../../app.pcss';
	import { type Snippet } from 'svelte';
	import MainDialog from '$lib/components/dialog/global/MainDialog.svelte';
	import Sidebar from '$lib/components/sidebar/Sidebar.svelte';
	import Header from '$lib/components/header/Header.svelte';
	import Ribbon from '$lib/components/ribbon/Ribbon.svelte';
	import * as Tooltip from "$lib/components/ui/tooltip/index.js";

	import { PUBLIC_FOO, PUBLIC_ENVIRONMENT } from '$env/static/public';
	console.log(PUBLIC_FOO, PUBLIC_ENVIRONMENT);

	let { children }: { children?: Snippet } = $props();

	let webManifest = $derived(pwaInfo ? pwaInfo.webManifest.linkTag : '')
	let innerWidth: number = $state(0);


    $effect(() => {
		isMobile.value = innerWidth < 768;
	});


	beforeNavigate(({ cancel }) => {
		if (editedTableData.value.length > 0) {
			if (!confirm('Opravdu chcete opustit tuhle stránku? Vaše neuložená data budou ztracena.')) {
				cancel();
			} else {
				editedTableData.value = [];
				disableNavigation.value = false;
			}
		}
	})
</script>



<svelte:head>
	{#if pwaAssetsHead.themeColor}
		<meta name="theme-color" content={pwaAssetsHead.themeColor.content} />
	{/if}
	{#each pwaAssetsHead.links as link}
		<link {...link} />
	{/each}

	{@html webManifest}
</svelte:head>



<svelte:window bind:innerWidth/>

{#await import('$lib/PWAReloadPrompt.svelte') then { default: ReloadPrompt }}
	<ReloadPrompt />
{/await}



<Toaster
	position={isMobile.value ? "top-center" : "bottom-right"}
	class="h-52 overflow-visible md:flex md:justify-end"
/>

<div>
	<Tooltip.Provider delayDuration={300}>
		<div class="h-dvh w-dvh bg-albi-50">
			<div class="flex h-dvh flex-col">
				<header class="">
					<Header />
				</header>

				<div class="flex flex-row flex-1 pb-4">
					<div class="hidden md:block pl-4">
						<Sidebar />
					</div>
					<main class="flex flex-1 flex-col rounded-l-md">
						<Ribbon />

						<div class="flex flex-col flex-1 rounded-lg md:p-2 md:pr-4 md:pb-0 px-4">
							{@render children?.()}
						</div>
					</main>
				</div>
			</div>
		</div>
	</Tooltip.Provider>

	<MainDialog/>
</div>


