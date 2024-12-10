<script lang="ts">
	import './../../app.pcss';
	import { type Snippet } from 'svelte';
	import * as Tooltip from "$lib/components/ui/tooltip/index.js";
	import Header from '$lib/components/header/Header.svelte';
	import { ParaglideJS } from '@inlang/paraglide-sveltekit'
	import { i18n } from '$lib/i18n.js'
	import Sidebar from '$lib/components/sidebar/Sidebar.svelte';
	import Ribbon from '$lib/components/ribbon/Ribbon.svelte';


	let { children }: { children?: Snippet } = $props();
	// let webManifest = $derived(pwaInfo ? pwaInfo.webManifest.linkTag : '')
	//
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

	// onMount(() => {
	// 	// klávesové zkratky pro ribbon
	// 	function handleKeydown(e: KeyboardEvent) {
	// 		if (e.key === 'f' && (e.metaKey || e.ctrlKey)) {
	// 			e.preventDefault();
	// 			ribbonActionStore.set(RibbonActionEnum.FILTER_QUICK)
	// 		}
	//
	// 		if (e.key === 's' && (e.metaKey || e.ctrlKey)) {
	// 			e.preventDefault();
	// 			ribbonActionStore.set(RibbonActionEnum.SAVE);
	// 		}
	//
	// 		if (e.key === 'r' && (e.metaKey || e.ctrlKey)) {
	// 			e.preventDefault();
	// 			ribbonActionStore.set(RibbonActionEnum.LOAD);
	// 		}
	// 	}
	//
	// 	document.addEventListener('keydown', handleKeydown);
	//
	// 	if (!get(sessionKeyStore)) {
	// 		sessionKeyStore.set("504a58f3-58b2-48f9-8eed-40646bb9c122")
	// 	}
	// })

	// beforeNavigate(({cancel}) => {
	// 	if (get(editedTableDataStore).length > 0) {
	// 		if (!confirm('Opravdu chcete opustit tuhle stránku? Vaše neuložená data budou ztracena.')) {
	// 			cancel();
	// 		} else {
	// 			editedTableDataStore.set([]);
	// 			disableNavigationStore.set(false);
	// 		}
	// 	}
	//
	// 	if (Object.keys(get(editedFormValuesStore)).length > 0) {
	// 		if (!confirm('Opravdu chcete opustit tuhle stránku? Vaše neuložená data budou ztracena.')) {
	// 			cancel();
	// 		} else {
	// 			editedFormValuesStore.set({});
	// 			disableNavigationStore.set(false);
	// 			// activeSelectedRowIndexStore.set(get(nextSelectedRowIndexStore));
	// 		}
	// 	}
	// })
</script>

<!--<svelte:head>-->
<!--	{#if pwaAssetsHead.themeColor}-->
<!--		<meta name="theme-color" content={pwaAssetsHead.themeColor.content} />-->
<!--	{/if}-->
<!--	{#each pwaAssetsHead.links as link}-->
<!--		<link {...link} />-->
<!--	{/each}-->
<!--	&lt;!&ndash; eslint-disable-next-line svelte/no-at-html-tags &ndash;&gt;-->
<!--	{@html webManifest}-->
<!--</svelte:head>-->

<!--<svelte:window bind:innerWidth/>-->

<!--{#await import('$lib/PWAReloadPrompt.svelte') then { default: ReloadPrompt }}-->
<!--	<ReloadPrompt />-->
<!--{/await}-->



<!--<Toaster-->
<!--	position={isMobile ? "top-center" : "bottom-right"}-->
<!--	class="h-52 overflow-visible md:flex md:justify-end"-->
<!--/>-->

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
		<!--				-->
		<!--				<div class={(isMobileLayoutExpanded ? "px-4" : "px-4") + " flex flex-col flex-1 rounded-lg md:p-2 md:pr-4 md:pb-0"}>-->
		<!--					{@render children?.()}-->
		<!--				</div>-->
					</main>
				</div>
			</div>
		</div>
	</Tooltip.Provider>

	<!--<MainDialog/>-->


</ParaglideJS>


