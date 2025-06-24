<script lang="ts">
	import {Input} from "$lib/components/ui/input";
	import {showFulltextSearch} from "$lib/runes/page.svelte";
	import type {AgGridTableType} from "$lib/types/components/table/table";
	import * as m from "$lib/paraglide/messages";

	interface Props {
		table: AgGridTableType
	}

	let {
		table = $bindable()
	}: Props = $props();
</script>


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
