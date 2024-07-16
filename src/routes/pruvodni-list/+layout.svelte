<script lang="ts">
	import { get } from 'svelte/store';
	import { showFulltextSearchStore } from '$lib/stores/tableStore';
	import { filterValueStore } from '$lib/stores/tableStore';
	import { Input } from '$lib/components/ui/input';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import * as Tabs from '$lib/components/ui/tabs';

	let preset: string = '/pruvodni-list';
</script>


<svelte:head>
	<title>
		Průvodní list
	</title>
</svelte:head>



<div class="w-full flex items-center justify-between">
	<Tabs.Root value={$page.url.pathname} activateOnFocus={false}>
		<Tabs.List class="w-fit">
			<Tabs.Trigger
				value="/pruvodni-list"
				on:click={() => goto(`${preset}/`)}
			>
				Seznam
			</Tabs.Trigger>

			<Tabs.Trigger
				value="/pruvodni-list/detail"
				on:click={() => goto(`${preset}/detail`)}
			>
				Detail
			</Tabs.Trigger>

			<Tabs.Trigger
				value="/pruvodni-list/zpracovani"
				on:click={() => goto(`${preset}/zpracovani`)}
			>
				Zpracování
			</Tabs.Trigger>

			<Tabs.Trigger
				value="/pruvodni-list/cas-naklady"
				on:click={() => goto(`${preset}/cas-naklady`)}
			>
				Čas. náklady
			</Tabs.Trigger>

			<Tabs.Trigger
				value="/pruvodni-list/historie"
				on:click={() => goto(`${preset}/historie`)}
			>
				Historie
			</Tabs.Trigger>

			<Tabs.Trigger
				value="/pruvodni-list/cast-vyrobku"
				on:click={() => goto(`${preset}/cast-vyrobku`)}
			>
				Část výrobku
			</Tabs.Trigger>

			<Tabs.Trigger
				value="/pruvodni-list/preview"
				on:click={() => goto(`${preset}/preview`)}
			>
				Preview
			</Tabs.Trigger>

			<Tabs.Trigger
				value="/pruvodni-list/editace-pozic"
				on:click={() => goto(`${preset}/editace-pozic`)}
			>
				Editace pozic
			</Tabs.Trigger>
		</Tabs.List>
	</Tabs.Root>

	{#if $showFulltextSearchStore === true}
		<div class="flex items-center">
			<Input
				class="max-w-sm h-[31px] mr-4 border-b-white rounded-md rounded-b-none focus-visible:ring-0"
				placeholder="Filtrovat..."
				type="text"
				bind:value={$filterValueStore}
			/>
		</div>
	{/if}
</div>

<div class="h-full bg-background rounded-bl-lg rounded-none border">
	<slot />
</div>
