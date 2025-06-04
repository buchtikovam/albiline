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
	import {
		CellSelectionModule,
		CellStyleModule, ClientSideRowModelApiModule,
		ClientSideRowModelModule,
		ColumnApiModule,
		ColumnMenuModule,
		ColumnsToolPanelModule,
		ContextMenuModule,
		FiltersToolPanelModule,
		LicenseManager,
		LocaleModule,
		ModuleRegistry,
		MultiFilterModule,
		NumberFilterModule, PinnedRowModule,
		QuickFilterModule,
		RichSelectModule,
		RowApiModule,
		RowGroupingModule,
		RowSelectionModule,
		ScrollApiModule,
		ServerSideRowModelApiModule,
		ServerSideRowModelModule,
		SideBarModule,
		StatusBarModule,
		TextEditorModule,
		TextFilterModule,
		UndoRedoEditModule,
		ValidationModule,
		ClipboardModule, RenderApiModule,

	} from "ag-grid-enterprise";

	let { children, data }: { children?: Snippet, data: LayoutData } = $props();

	let hiddenHeader = $state(false);

	LicenseManager.setLicenseKey("Using_this_{AG_Charts_and_AG_Grid}_Enterprise_key_{AG-087435}_in_excess_of_the_licence_granted_is_not_permitted___Please_report_misuse_to_legal@ag-grid.com___For_help_with_changing_this_key_please_contact_info@ag-grid.com___{Albi_Ceska_republika_a.s.}_is_granted_a_{Single_Application}_Developer_License_for_the_application_{AlbiLine}_only_for_{1}_Front-End_JavaScript_developer___All_Front-End_JavaScript_developers_working_on_{AlbiLine}_need_to_be_licensed___{AlbiLine}_has_not_been_granted_a_Deployment_License_Add-on___This_key_works_with_{AG_Charts_and_AG_Grid}_Enterprise_versions_released_before_{5_May_2026}____[v3]_[0102]_MTc3NzkzNTYwMDAwMA==24483e25ceca3b5fd77ae13e65d1a610");

	ModuleRegistry.registerModules([
		ClientSideRowModelModule,
		LocaleModule,
		RowApiModule,
		ScrollApiModule,
		ColumnMenuModule,
		ContextMenuModule,
		QuickFilterModule,
		ColumnApiModule,
		TextFilterModule,
		NumberFilterModule,
		CellStyleModule,
		RowGroupingModule,
		MultiFilterModule,
		RowSelectionModule,
		StatusBarModule,
		SideBarModule,
		FiltersToolPanelModule,
		ColumnsToolPanelModule,
		TextEditorModule,
		ServerSideRowModelModule,
		UndoRedoEditModule,
		CellSelectionModule,
		RichSelectModule,
		ServerSideRowModelApiModule,
		PinnedRowModule,
		ClientSideRowModelApiModule,
		ClipboardModule,
		RenderApiModule,
		...(process.env.NODE_ENV !== "production" ? [ValidationModule] : [])
	]);

	authDetails.userName = data.auth.userName;
	authDetails.sessionKey = data.auth.sessionKey;
	authDetails.email = data.auth.email;
	authDetails.icon = data.auth.icon;

	$effect(() => {
		if (isMobile.value) {
			hiddenHeader = false;
		}
	})
</script>



<div class="h-screen w-screen bg-slate-100 overflow-hidden">
	<Sidebar.Provider
		style="--sidebar-width: 320px; --sidebar-width-mobile: 320px"
		class="!h-full pb-2 pr-2  w-full flex"
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
						? "w-[320px] max-w-[320px] min-w-[320px] transition-all duration-200 ease-linear"
						: "w-[66px] max-w-[66px] min-w-[66px] transition-all duration-200 ease-linear"
				}
			>
				<BetterSidebar />
			</div>
		{/if}


		<div class="flex flex-col flex-1 min-w-0 h-full">
			<div class={`pt-2 ${hiddenHeader ? "hidden" : "flex"}  flex-col gap-2 flex-none`}>
				{#if isMobile.value}
					<Sidebar.Trigger class="bg-white border border-slate-300 !h-8 !w-8"/>
				{:else}
					<Header />
				{/if}

				<Ribbon />
			</div>

			{#if isMobile.value}
				<div class="h-2"></div>
			{:else}
				<button
					type="button"
					class="h-2 w-full bg-slate-100 hover:bg-albi-100 transition-all ease-linear cursor-ns-resize"
					onclick={() => hiddenHeader = !hiddenHeader}
					aria-label="button"
				></button>
			{/if}

			<div class="flex-1 min-h-0 overflow-auto">
				{@render children?.()}
			</div>
		</div>
	</Sidebar.Provider>
</div>


<RibbonDialog/>
