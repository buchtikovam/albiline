<script lang="ts">
	import { showFulltextSearchStore } from '$lib/stores/tableStore';
	import { fulltextFilterValueStore } from '$lib/stores/tableStore';
	import { Input } from '$lib/components/ui/input';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import * as Tabs from '$lib/components/ui/tabs';
</script>


<svelte:head>
	<title>
		Zákazníci
	</title>
</svelte:head>



<div class="w-full flex items-center justify-between">
	<Tabs.Root value={$page.url.pathname}>
		<Tabs.List class="w-fit">
			<Tabs.Trigger
				value="/prodej/zakaznici"
				on:click={() => goto("/prodej/zakaznici")}
			>
				Seznam
			</Tabs.Trigger>

			<Tabs.Trigger
				value="/prodej/zakaznici/detail"
				on:click={() => goto("/prodej/zakaznici/detail")}
			>
				Detail
			</Tabs.Trigger>

			<Tabs.Trigger
				value="/prodej/zakaznici/fakturacni-adresy"
				on:click={() => goto("/prodej/zakaznici/fakturacni-adresy")}
			>
				Fakturační adresy
			</Tabs.Trigger>

			<Tabs.Trigger
				value="/prodej/zakaznici/kontaktni-osoby"
				on:click={() => goto("/prodej/zakaznici/kontaktni-osoby")}
			>
				Kontaktní osoby
			</Tabs.Trigger>

			
		</Tabs.List>
	</Tabs.Root>

	<!-- {#if $showFulltextSearchStore === true} -->
		<div class="flex items-center">
			<Input
				class="max-w-sm h-[31px] mr-4 border-b-white rounded-md rounded-b-none focus-visible:ring-0"
				placeholder="Filtrovat..."
				type="text"
				bind:value={$fulltextFilterValueStore}
			/>
		</div>
	<!-- {/if} -->
</div>

<div class="h-full bg-background rounded-bl rounded-none ">
	<slot />
</div>
