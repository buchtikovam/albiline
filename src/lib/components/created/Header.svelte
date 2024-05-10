<script lang="ts">
	import { goto } from '$app/navigation';
	import Avatar from '$lib/components/created/Avatar.svelte';
	import * as Tabs from '$lib/components/ui/tabs';
</script>

<div class="flex justify-between bg-muted">
	<Tabs.Root class="w-fit h-fit pt-2">
		<Tabs.List>
			<Tabs.Trigger value="pruvodni-list" on:click={() => goto("/")}>Průvodní list</Tabs.Trigger>
			<Tabs.Trigger value="faktury-2024" on:click={() => goto("/")}>Faktury 2024</Tabs.Trigger>
		</Tabs.List>
	</Tabs.Root>


	<div class="my-auto pr-2">
		<Avatar />
	</div>
</div>
