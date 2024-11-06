<script lang="ts">
	import './../../app.pcss';
	import { Toaster } from '$lib/components/ui/sonner';
	import Sidebar from '$lib/components/sidebar/Sidebar.svelte';
	import Ribbon from '$lib/components/ribbon/Ribbon.svelte';
	import Header from '$lib/components/header/Header.svelte';
	import MainDialog from '$lib/components/dialog/global/MainDialog.svelte';
	import { isMobileStore, isMobileLayoutExpandedStore } from '$lib/stores/pageStore';
	import { onMount } from 'svelte';
	import { ribbonActionStore } from '$lib/stores/ribbonStore';
	import { RibbonActionEnum } from '$lib/enums/ribbon/ribbonAction';

	// PWA
	import { pwaInfo } from 'virtual:pwa-info';
	import { pwaAssetsHead } from 'virtual:pwa-assets/head';
	import { beforeNavigate } from '$app/navigation';
	import { get } from 'svelte/store';
	import { editedDataStore } from '$lib/stores/tableStore';
	$: webManifest = pwaInfo ? pwaInfo.webManifest.linkTag : ''

	let innerWidth: number;

    $: if (innerWidth < 768) {
		isMobileStore.set(true)
	} else {
		isMobileStore.set(false)
	}

	let isMobile: boolean = false;
	isMobileStore.subscribe((data) => isMobile = data)

	let isMobileLayoutExpanded: boolean;
	isMobileLayoutExpandedStore.subscribe((data) => isMobileLayoutExpanded = data)

	onMount(() => {
		// klávesové zkratky pro ribbon
		function handleKeydown(e: KeyboardEvent) {
			if (e.key === 'f' && (e.metaKey || e.ctrlKey)) {
				e.preventDefault();
				ribbonActionStore.set(RibbonActionEnum.FILTER_QUICK)
			}

			if (e.key === 's' && (e.metaKey || e.ctrlKey)) {
				e.preventDefault();
				ribbonActionStore.set(RibbonActionEnum.SAVE);
			}

			if (e.key === 'r' && (e.metaKey || e.ctrlKey)) {
				e.preventDefault();
				ribbonActionStore.set(RibbonActionEnum.LOAD);
			}
		}

		document.addEventListener('keydown', handleKeydown);
	})

	beforeNavigate(({cancel}) => {
		if (get(editedDataStore).length > 0) {
			if (!confirm('Opravdu chcete opustit tuhle stránku? Vaše neuložená data budou ztracena.')) {
				cancel();
			} else {
				editedDataStore.set([]);
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
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html webManifest}
</svelte:head>

<svelte:window bind:innerWidth/>

{#await import('$lib/PWAReloadPrompt.svelte') then { default: ReloadPrompt }}
	<ReloadPrompt />
{/await}



<Toaster
	position={isMobile ? "top-center" : "bottom-right"}
	class="h-52 overflow-visible md:flex md:justify-end"
/>

<div class="h-dvh w-dvh bg-albi-50">
	<div class="flex h-dvh flex-col">
		<header>
			<Header />
		</header>

		<div class="flex flex-row flex-1 pb-4">
			<div class="hidden md:block pl-4">
				<Sidebar />
			</div>
			<main class="flex flex-1 flex-col rounded-l-md">
				<Ribbon />
				
				<div class={(isMobileLayoutExpanded ? "px-4" : "px-4") + " flex flex-col flex-1 rounded-lg md:p-2 md:pr-4 md:pb-0"}>
					<slot />
				</div>
			</main>
		</div>
	</div>
</div>

<MainDialog/>
