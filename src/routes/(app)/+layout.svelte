<script lang="ts">
	import {authDetails} from "$lib/runes/page.svelte";
	import type { LayoutData } from './$types';
	import {type Snippet} from 'svelte';
	import './../../app.pcss';
	import RibbonDialog from '$lib/components/dialog/RibbonDialog.svelte';
	import Header from '$lib/components/header/Header.svelte';
	import Ribbon from '$lib/components/ribbon/Ribbon.svelte';
	import * as Tooltip from "$lib/components/ui/tooltip/index.js";
	import BetterSidebar from "$lib/components/sidebar/BetterSidebar.svelte";
	import * as Sidebar from "$lib/components/ui/sidebar/index.js";

	let { children, data }: { children?: Snippet, data: LayoutData } = $props();

	authDetails.userName = data.auth.userName;
	authDetails.sessionKey = data.auth.sessionKey;


	// const table = $state(serverSideTables[pageCode.value])

	// beforeNavigate(({ cancel }) => {
	// 	if (table) {
	// 		if (table.editedTableData.length > 0) {
	// 			if (!confirm('Opravdu chcete opustit tuhle stránku? Vaše neuložená data budou ztracena.')) {
	// 				cancel();
	// 			} else {
	// 				table.editedTableData = [];
	// 				disableNavigation.value = false;
	// 			}
	// 		}
	// 	}
	// })
</script>



<div>
	<Tooltip.Provider delayDuration={300}>
		<div class="h-dvh w-dvh bg-albi-50">
			<div class="flex h-dvh flex-col mt-2">
<!--				<header class="">-->
<!--					<Header />-->
<!--				</header>-->

				<div class="flex flex-row flex-1 pb-4">
					<div class="hidden md:block pl-4">
<!--						<Sidebar/>-->

						<Sidebar.Provider>
							<BetterSidebar />
							<Sidebar.Trigger />
						</Sidebar.Provider>
					</div>

					<main class="flex flex-1 flex-col rounded-l-md">
						<div>
							<Ribbon />
						</div>

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


