<script lang="ts">
    import { ParaglideJS } from "@inlang/paraglide-sveltekit"
    import { i18n } from "$lib/i18n"
	// import { pwaAssetsHead } from "virtual:pwa-assets/head";
	// import { pwaInfo } from "virtual:pwa-info";
	import { type Snippet } from 'svelte';
	import {isMobile} from "$lib/runes/page.svelte";
	import {Toaster} from "svelte-sonner";

	// let webManifest = $derived(pwaInfo ? pwaInfo.webManifest.linkTag : '');

	let { children }: { children?: Snippet } = $props();


	let innerWidth: number = $state(0);

	$effect(() => {
		isMobile.value = innerWidth < 768;
		console.log(isMobile.value)
	});

</script>

<!--<svelte:head>-->
<!--	{#if pwaAssetsHead.themeColor}-->
<!--		<meta name="theme-color" content={pwaAssetsHead.themeColor.content} />-->
<!--	{/if}-->

<!--	{#each pwaAssetsHead.links as link}-->
<!--		<link {...link} />-->
<!--	{/each}-->

<!--	{@html webManifest}-->
<!--</svelte:head>-->



<!--{#await import('$lib/PWAReloadPrompt.svelte') then { default: ReloadPrompt }}-->
<!--	<ReloadPrompt />-->
<!--{/await}-->

<svelte:window bind:innerWidth/>


<Toaster
	position={isMobile.value ? "top-center" : "bottom-right"}
	class="h-dvh overflow-visible flex justify-center md:justify-end"
/>


<ParaglideJS {i18n}>
	{@render children?.()}
</ParaglideJS>
