<script lang="ts">
	import {authDetails, isMobile} from "$lib/runes/page.svelte";
	import {sidebarOpen} from "$lib/runes/sidebar.svelte";
	import {ribbonOpen} from "$lib/runes/ribbon.svelte";
	import type { LayoutData } from './$types';
	import {type Snippet} from 'svelte';
	import './../../app.pcss';
	import BetterSidebar from "$lib/components/sidebar/BetterSidebar.svelte";
	import RibbonDialog from '$lib/components/dialog/RibbonDialog.svelte';
	import Header from '$lib/components/header/Header.svelte';
	import Ribbon from '$lib/components/ribbon/Ribbon.svelte';
	import * as Tooltip from "$lib/components/ui/tooltip/index.js";
	import * as Sidebar from "$lib/components/ui/sidebar/index.js";

	let { children, data }: { children?: Snippet, data: LayoutData } = $props();

	let hiddenHeader = $state(false);

	authDetails.userName = data.auth.userName;
	authDetails.sessionKey = data.auth.sessionKey;
	authDetails.email = data.auth.email;
	authDetails.icon = data.auth.icon;
</script>



<div class="h-dvh w-dvh bg-slate-100">
	<Sidebar.Provider
		style="--sidebar-width: 280px; --sidebar-width-mobile: 200px"
		class="!h-full pb-2 pr-2 w-full"
		bind:open={sidebarOpen.value}
	>

		{#if isMobile.value}
			<div class="pl-2">
				<BetterSidebar />
			</div>
		{:else}
			<div
				class={
					sidebarOpen.value
						? "w-[280px] max-w-[280px] min-w-[280px] transition-all duration-200 ease-linear"
						: "w-[66px] max-w-[66px] min-w-[66px] transition-all duration-200 ease-linear"
				}
			>
				<BetterSidebar />
			</div>
		{/if}


		<div
			class="flex flex-col w-full h-full"
		>
			<div class={`${hiddenHeader ? "hidden" : "flex"} flex-col gap-[7px] w-full pt-2 transition-all ease-linear`}>
				<div class={`${ribbonOpen.value ? "h-[37px]" : "h-9"}`}>
					<Header/>
				</div>

				<div class={(ribbonOpen.value ? "h-[66px] -mt-[1px]" : "h-9" + " transition-all ease-linear duration-200 ")}>
					<Ribbon />
				</div>
			</div>

			<button
				type="button"
				class="h-[7px] w-full bg-slate-100 hover:bg-albi-100 transition-all ease-linear cursor-ns-resize"
				onclick={() => hiddenHeader = !hiddenHeader}
				aria-label="button"
			></button>

			<div class="h-full w-full">
				{@render children?.()}
			</div>
		</div>
	</Sidebar.Provider>
</div>


<RibbonDialog/>
