<script lang="ts">
	import * as Tabs from '$lib/components/ui/tabs';
	import { goto } from '$app/navigation';

	// export let data;
	export let preset: string = "pruvodni-list";
</script>

<!--TODO: get route name, then set active tab, tabs are not in root ? -->

<!--<svelte:head>-->
<!--	<title>Albiline</title>-->
<!--</svelte:head>-->

<Tabs.Root value="seznam" class="flex flex-col flex-1">
	<Tabs.List class="w-fit">
		<Tabs.Trigger
			value="seznam"
			on:click={() => goto(`/${preset}/`)}
		>
			Seznam
		</Tabs.Trigger>

		<Tabs.Trigger
			value="detail"
			on:click={() => goto(`/${preset}/detail`)}
		>
			Detail
		</Tabs.Trigger>

		<Tabs.Trigger
			value="zpracovani"
			on:click={() => goto(`/${preset}/zpracovani`)}
		>
			Zpracování
		</Tabs.Trigger>

		<Tabs.Trigger
			value="cas-naklady"
			on:click={() => goto(`/${preset}/cas-naklady`)}
		>
			Čas. náklady
		</Tabs.Trigger>

		<Tabs.Trigger
			value="historie"
			on:click={() => goto(`/${preset}/historie`)}
		>
			Historie
		</Tabs.Trigger>

		<Tabs.Trigger
			value="cast-vyrobku"
			on:click={() => goto(`/${preset}/cast-vyrobku`)}
		>
			Část výrobku
		</Tabs.Trigger>

		<Tabs.Trigger
			value="preview"
			on:click={() => goto(`/${preset}/preview`)}
		>
			Preview
		</Tabs.Trigger>

		<Tabs.Trigger
			value="editace-pozic"
			on:click={() => goto(`/${preset}/editace-pozic`)}
		>
			Editace pozic
		</Tabs.Trigger>
	</Tabs.List>

</Tabs.Root>

<slot/>
