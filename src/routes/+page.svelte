<script lang="ts">
	import Table from '$lib/components/created/Table.svelte';
	import * as Tabs from '$lib/components/ui/tabs';
	import { page } from '$app/stores';
</script>

<svelte:head>
	<title>Albiline</title>
</svelte:head>

<Tabs.Root value="seznam" class="flex flex-col flex-1">
	<Tabs.List class="w-fit">
		<Tabs.Trigger value="seznam">Seznam</Tabs.Trigger>
		<Tabs.Trigger value="detail">Detail</Tabs.Trigger>
		<Tabs.Trigger value="zpracovani">Zpracování</Tabs.Trigger>
		<Tabs.Trigger value="cas-naklady">Čas. náklady</Tabs.Trigger>
		<Tabs.Trigger value="historie">Historie</Tabs.Trigger>
		<Tabs.Trigger value="cast-vyrobku">Část výrobku</Tabs.Trigger>
		<Tabs.Trigger value="preview">Preview</Tabs.Trigger>
		<Tabs.Trigger value="editace-pozic">Editace pozic</Tabs.Trigger>
	</Tabs.List>

	<Tabs.Content value="seznam" class="flex-1">
		<div class="h-full w-full max-w-full rounded-bl-lg rounded-none bg-background border flex">
			<Table />
		</div>
	</Tabs.Content>

	<Tabs.Content value="detail" class="flex-1">
		<div class="h-full rounded-bl-lg rounded-none bg-background border flex">
			<div class="p-4">
				// detail
			</div>
		</div>
	</Tabs.Content>

	<Tabs.Content value="zpracovani" class="flex-1">
		<div class="h-full rounded-bl-lg rounded-none bg-background border flex">
			<div class="p-4">
				// zpracování
			</div>
		</div>
	</Tabs.Content>

	<Tabs.Content value="cas-naklady" class="flex-1">
		<div class="h-full rounded-bl-lg rounded-none bg-background border flex">
			<div class="p-4">
				// časové náklady
			</div>
		</div>
	</Tabs.Content>

	<Tabs.Content value="historie" class="flex-1">
		<div class="h-full rounded-bl-lg rounded-none bg-background border flex">
			<div class="p-4">
				// historie
			</div>
		</div>
	</Tabs.Content>

	<Tabs.Content value="cast-vyrobku" class="flex-1">
		<div class="h-full rounded-bl-lg rounded-none bg-background border flex">
			<div class="p-4">
				// historie
			</div>
		</div>
	</Tabs.Content>

	<Tabs.Content value="preview" class="flex-1">
		<div class="h-full rounded-bl-lg rounded-none bg-background border flex">
			<div class="p-4">
				// preview
			</div>
		</div>
	</Tabs.Content>

	<Tabs.Content value="editace-pozic" class="flex-1">
		<div class="h-full rounded-bl-lg rounded-none bg-background border flex">
			<div class="p-4">
				// editace-pozic
			</div>
		</div>
	</Tabs.Content>
</Tabs.Root>

