<script lang="ts">
	import {
		activeSelectedRowIndex,
		editedTableData,
		nextSelectedRowIndex
	} from '$lib/runes/table.svelte';
	import { disableNavigation } from '$lib/runes/navigation.svelte';
	import { editedFormValues } from '$lib/runes/autoformStore.svelte';
	import { pwaInfo } from 'virtual:pwa-info';
	import { pwaAssetsHead } from 'virtual:pwa-assets/head';
	import { i18n } from '$lib/i18n.js'
	import { beforeNavigate } from '$app/navigation';
	import { ParaglideJS } from '@inlang/paraglide-sveltekit'
	import { Toaster } from 'svelte-sonner';
	import './../../app.pcss';
	import { type Snippet } from 'svelte';
	import MainDialog from '$lib/components/dialog/global/MainDialog.svelte';
	import Sidebar from '$lib/components/sidebar/Sidebar.svelte';
	import Header from '$lib/components/header/Header.svelte';
	import * as Tooltip from "$lib/components/ui/tooltip/index.js";
	import Ribbon from '$lib/components/ribbon/Ribbon.svelte';

	let { children }: { children?: Snippet } = $props();

	let webManifest = $derived(pwaInfo ? pwaInfo.webManifest.linkTag : '')

	// let innerWidth: number = $state();
	//
    // run(() => {
	// 	if (innerWidth < 768) {
	// 		isMobileStore.set(true)
	// 	} else {
	// 		isMobileStore.set(false)
	// 	}
	// });
	//
	// let isMobile: boolean = $state(false);
	// isMobileStore.subscribe((data) => isMobile = data)

	// let isMobileLayoutExpanded: boolean = $state();
	// isMobileLayoutExpandedStore.subscribe((data) => isMobileLayoutExpanded = data)

	// let webManifest = $state("");

	beforeNavigate(({ cancel }) => {
		if (editedTableData.value.length > 0) {
			if (!confirm('Opravdu chcete opustit tuhle stránku? Vaše neuložená data budou ztracena.')) {
				cancel();
			} else {
				editedTableData.value = [];
				disableNavigation.value = false;
			}
		}

		if (Object.keys(editedFormValues.value).length > 0) {
			if (!confirm('Opravdu chcete opustit tuhle stránku? Vaše neuložená data budou ztracena.')) {
				cancel();
			} else {
				editedFormValues.value = {};
				disableNavigation.value = false;
				activeSelectedRowIndex.value = nextSelectedRowIndex.value;
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



<!--<svelte:window bind:innerWidth/>-->

{#await import('$lib/PWAReloadPrompt.svelte') then { default: ReloadPrompt }}
	<ReloadPrompt />
{/await}



<!-- isMobile ? "top-center" : "bottom-right" -->
<Toaster
	position="bottom-right"
	class="h-52 overflow-visible md:flex md:justify-end"
/>

<ParaglideJS {i18n}>
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

						<div class="flex flex-col flex-1 rounded-lg md:p-2 md:pr-4 md:pb-0">
							{@render children?.()}
						</div>
					</main>
				</div>
			</div>
		</div>
	</Tooltip.Provider>

	<MainDialog/>
</ParaglideJS>


