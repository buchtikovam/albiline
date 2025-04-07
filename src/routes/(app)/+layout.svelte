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

	authDetails.userName = data.auth.userName;
	authDetails.sessionKey = data.auth.sessionKey;
</script>



<div class="h-dvh w-dvh bg-slate-100">
	<Sidebar.Provider
		style="--sidebar-width: 260px; --sidebar-width-mobile: 200px"
		class="!h-full py-2 pr-2 w-full"
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
						? "w-[260px] max-w-[260px] min-w-[260px] transition-all duration-200 ease-linear"
						: "w-[66px] max-w-[66px] min-w-[66px] transition-all duration-200 ease-linear"
				}
			>
				<BetterSidebar />
			</div>
		{/if}


		<div
			class="flex flex-col gap-1.5 w-full h-full "
		>

			<div class="flex gap-[7px] h-9">
				<Sidebar.Trigger
					class="bg-white size-8 border border-slate-300"
				/>

				<Header/>
			</div>

			<div class={(ribbonOpen.value ? "h-[65px]" : "h-9" + " transition-all ease-linear duration-200 ")}>
				<Ribbon />
			</div>

			<div class="h-full w-full">
				{@render children?.()}
			</div>
		</div>
	</Sidebar.Provider>
</div>


<RibbonDialog/>
