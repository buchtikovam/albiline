<script lang="ts">
	import {showFulltextSearch} from "$lib/runes/page.svelte.js";
	import {agGridTables, currentPageKey} from "$lib/runes/table.svelte.js";
	import {Input} from "$lib/components/ui/input";
	import type {AgGridTableType} from "$lib/types/components/table/table";
	import FilterAndPresetButtons from "$lib/components/button/FilterAndPresetButtons.svelte";
	import MainContentWrapper from "$lib/components/wrapper/MainContentWrapper.svelte";
	import TabFulltextWrapper from "$lib/components/wrapper/TabFulltextWrapper.svelte";
	import PageWrapper from "$lib/components/wrapper/PageWrapper.svelte";
	import * as m from "$lib/paraglide/messages";
	import * as Tabs from "$lib/components/ui/tabs";
	import {Checkbox} from "$lib/components/ui/checkbox";
	import {Separator} from "$lib/components/ui/separator";
	import {setContext} from "svelte";


	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();


	interface PageSections {
		 linieSection: boolean;
		 kspSection: boolean;
		 ksSection: boolean;
	}

	let pageSectionsState: PageSections = $state({
		linieSection: false,
		kspSection: false,
		ksSection: false,
	})

	currentPageKey.value = "SalesTotalByDivision";
	let table: AgGridTableType = $state(agGridTables.value[currentPageKey.value]);

	setContext("pageSections", pageSectionsState);

	$effect(() => {
		if (
			pageSectionsState.kspSection === false &&
			pageSectionsState.ksSection === true
		) {
			pageSectionsState.ksSection = false;
		}

		if (
			pageSectionsState.linieSection === false &&
			pageSectionsState.kspSection === true
		) {
			pageSectionsState.kspSection = false;
		}
	})
</script>



<PageWrapper>
	<TabFulltextWrapper>
		<div class="flex-1 flex justify-between">
			<p>blah blah blah</p>

			<div class="flex text-xs justify-end items-center gap-1.5 bg-white h-8 border border-slate-300 rounded-md w-fit px-2">
				<b>Detail: </b>

				<div class="flex items-center gap-1">
					<Checkbox
						class="size-4"
						bind:checked={pageSectionsState.linieSection}
					/>

					<p>po liniích</p>
				</div>

				<Separator orientation="vertical" class="bg-albi-500 min-h-3 w-[2px]"/>

				<div class="flex items-center gap-1">
					<Checkbox
						class="size-4"
						disabled={!pageSectionsState.linieSection}
						bind:checked={pageSectionsState.kspSection}
					/>

					<p>po ksp</p>
				</div>

				<Separator orientation="vertical" class="bg-albi-500 min-h-3 w-[2px]"/>

				<div class="flex items-center gap-1">
					<Checkbox
						class="size-4"
						disabled={!pageSectionsState.kspSection}
						bind:checked={pageSectionsState.ksSection}
					/>

					<p>po kusech</p>
				</div>
			</div>
		</div>

		<div class="flex gap-2 items-center">
			<FilterAndPresetButtons
				bind:table={table}
				routeId="/(app)/(main)/prodej/analyza-prodeju/celkem"
			/>

			{#if showFulltextSearch.value === true}
				<div
					class="hidden md:flex items-center h-8"
				>
					<Input
						class="xl:w-80 lg:w-60 w-40 h-8 border border-slate-300 focus-visible:border-albi-500"
						placeholder={m.components_header_search_placeholder()}
						type="text"
						bind:value={table.fulltextFilterValue}
					/>
				</div>
			{/if}
		</div>
	</TabFulltextWrapper>


	<MainContentWrapper>
		{@render children?.()}
	</MainContentWrapper>
</PageWrapper>
