<script lang="ts">
	import { fulltextFilterValueStore, showFulltextSearchStore } from '$lib/stores/tableStore';
	import { Input } from '$lib/components/ui/input';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import * as Tabs from '$lib/components/ui/tabs';
</script>


<svelte:head>
	<title>
		Test
	</title>
</svelte:head>


<div class="w-full flex items-center justify-between pb-2">
	<Tabs.Root value={$page.url.pathname} class="rounded-md hidden md:block">
		<Tabs.List class="w-fit">
			<Tabs.Trigger
				class="font-bold"
				value="/test-ss"
				on:click={() => goto("/test-ss")}
			>
				Seznam
			</Tabs.Trigger>

			<Tabs.Trigger
				class="font-bold"
				value="/test-ss/detail"
				on:click={() => goto("test-ss/detail")}
			>
				Detail
			</Tabs.Trigger>
		</Tabs.List>
	</Tabs.Root>

	{#if $showFulltextSearchStore === true}
		<div class="flex items-center py-0.5 pr-[1px] overflow-visible">
			<Input
				class=" w-40 h-[31px] rounded-md border border-albi-200 "
				placeholder="Hledat..."
				type="text"
				bind:value={$fulltextFilterValueStore}
			/>
		</div>
	{/if}
</div>

<div class="h-full bg-white rounded-lg border border-albi-200">
	<slot />
</div>
