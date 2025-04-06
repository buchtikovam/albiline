<script lang="ts">
	import { locales, localizeHref } from '$lib/paraglide/runtime';
	import {type Snippet} from 'svelte';
	import {isMobile} from "$lib/runes/page.svelte";
	import {Toaster} from "svelte-sonner";
	import Response from "$lib/components/response/Response.svelte";
	import { page } from '$app/state';
	import { pwaInfo } from 'virtual:pwa-info';
	import { pwaAssetsHead } from 'virtual:pwa-assets/head';

	let { children }: { children?: Snippet } = $props();

	let innerWidth: number = $state(0);
	let webManifestLink = $derived(pwaInfo ? pwaInfo.webManifest.linkTag : '')

	$effect(() => {
		isMobile.value = innerWidth < 640;
	});
</script>



<svelte:window bind:innerWidth/>


<svelte:head>
	{#if pwaAssetsHead.themeColor}
		<meta name="theme-color" content={pwaAssetsHead.themeColor.content} />
	{/if}

	{#each pwaAssetsHead.links as link}
		<link {...link} />
	{/each}

	{@html webManifestLink}
</svelte:head>



{#await import('$lib/PWAReloadPrompt.svelte') then { default: ReloadPrompt }}
	<ReloadPrompt />
{/await}



<Toaster
	position={isMobile.value ? "top-center" : "bottom-right"}
	class="h-dvh overflow-visible flex justify-center md:justify-end"
/>


<div style="display:none">
	{#each locales as locale}
		<a href={localizeHref(page.url.pathname, { locale })}>{locale}</a>
	{/each}
</div>


{@render children?.()}


<Response/>
