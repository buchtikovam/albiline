<script lang="ts">
	import {authDetails} from "$lib/runes/page.svelte";
	import type { LayoutData } from './$types';
	import {type Snippet} from 'svelte';
	import './../../app.pcss';
	import RibbonDialog from '$lib/components/dialog/RibbonDialog.svelte';
	import Header from '$lib/components/header/Header.svelte';
	import Ribbon from '$lib/components/ribbon/Ribbon.svelte';
	import * as Tooltip from "$lib/components/ui/tooltip/index.js";
	import BetterSidebar from "$lib/components/sidebar/better/BetterSidebar.svelte";
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
		<div class="h-dvh w-dvh bg-slate-100">
			<Sidebar.Provider>
				<BetterSidebar />

				<div
					class="py-2 pr-2 flex flex-col gap-2 flex-1"
				>
					<div
						class="flex items-center gap-2"
					>
						<Sidebar.Trigger
							class="bg-white size-8 border border-slate-300"
						/>

						<Header/>
					</div>

					<div>
						<Ribbon />
					</div>

					<main class=" w-full flex-1 rounded-lg">
						{@render children?.()}
					</main>
				</div>

			</Sidebar.Provider>
		</div>
	</Tooltip.Provider>

	<RibbonDialog/>
</div>


