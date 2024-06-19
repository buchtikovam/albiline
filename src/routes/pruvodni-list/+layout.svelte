<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import * as Tabs from '$lib/components/ui/tabs';

	export let preset: string = '/pruvodni-list';
</script>

<svelte:head>
	<title>Průvodní list</title>
</svelte:head>

<div class="w-full">
	<Tabs.Root value={$page.url.pathname}>
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
</div>

<div class="h-full bg-background rounded-bl-lg rounded-none border">
	<slot />
</div>
