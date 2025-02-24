<script lang="ts">
	import { authDetails, pageKey } from "$lib/runes/page.svelte";
	import { disableNavigation } from '$lib/runes/navigation.svelte';
	import { serverSideTables} from '$lib/runes/table.svelte';
	import { beforeNavigate } from '$app/navigation';
	import type { LayoutData } from './$types';
	import { type Snippet } from 'svelte';
	import './../../app.pcss';
	import RibbonDialog from '$lib/components/dialog/RibbonDialog.svelte';
	import Sidebar from '$lib/components/sidebar/Sidebar.svelte';
	import Header from '$lib/components/header/Header.svelte';
	import Ribbon from '$lib/components/ribbon/Ribbon.svelte';
	import * as Tooltip from "$lib/components/ui/tooltip/index.js";
	import {page} from "$app/state";

	let { children, data }: { children?: Snippet, data: LayoutData } = $props();

	authDetails.userName = data.auth.userName;
	authDetails.sessionKey = data.auth.sessionKey;

	$effect(() => {
		pageKey.value = btoa(page.route.id || "");
	})

	const table = $state(serverSideTables[pageKey.value])

	beforeNavigate(({ cancel }) => {
		if (table) {
			if (table.editedTableData.length > 0) {
				if (!confirm('Opravdu chcete opustit tuhle stránku? Vaše neuložená data budou ztracena.')) {
					cancel();
				} else {
					table.editedTableData = [];
					disableNavigation.value = false;
				}
			}
		}
	})
</script>



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

	<RibbonDialog/>
</div>


