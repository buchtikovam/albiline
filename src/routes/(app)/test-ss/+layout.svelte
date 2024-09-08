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
		Test
	</title>
</svelte:head>



<div class="w-full flex items-center justify-between">
	<Tabs.Root value={$page.url.pathname}>
		<Tabs.List class="w-fit">
			<Tabs.Trigger
				value="/test-ss"
				on:click={() => goto("/test-ss")}
			>
				Seznam
			</Tabs.Trigger>

			<Tabs.Trigger
				value="/test-ss/detail"
				on:click={() => goto("test-ss/detail")}
			>
				Detail
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

<div class="h-full bg-background rounded-bl rounded-none border">
	<slot />
</div>
