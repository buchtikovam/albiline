<script lang="ts">
	import { sidebarCategory } from '$lib/runes/sidebar.svelte';
	import Clock from 'lucide-svelte/icons/clock';
	import Heart from 'lucide-svelte/icons/heart';
	import * as m from "$lib/paraglide/messages.js"
	import * as Tabs from "$lib/components/ui/tabs";
	import * as Select from "$lib/components/ui/select/index.js";
</script>



<div class="h-5  w-full">
	<Select.Root
		type="single"
		bind:value={sidebarCategory.value}
		allowDeselect={false}
	>
		<Select.Trigger class="h-5 border-none w-fit p-0 flex gap-1 text-albi-500 hover:text-albi-700">
			{#if sidebarCategory.value === "all"}
				<p class="text-xs font-bold">
					{ m.components_sidebar_category_all() }
				</p>
			{/if}

			{#if sidebarCategory.value === "recent"}
				<Clock strokeWidth="3" class="size-3"/>
				<p class="text-xs font-bold ">
					{ m.components_sidebar_category_recent() }
				</p>
			{/if}

			{#if sidebarCategory.value === "favorite"}
				<Heart strokeWidth="3" class="size-3"/>
				<p class="text-xs font-bold">
					{ m.components_sidebar_category_favorite() }
				</p>
			{/if}
		</Select.Trigger>

		<Select.Content class="min-w-2 pr-0">
			<Select.Item
				value="all"
				hideCheck={true}
				class="pl-2"
			>
				{ m.components_sidebar_category_all() }
			</Select.Item>

			<Select.Item
				value="recent"
				hideCheck={true}
				class="pl-2"
			>
				{ m.components_sidebar_category_recent() }
			</Select.Item>

			<Select.Item
				value="favorite"
				hideCheck={true}
				class="pl-2"
			>
				{ m.components_sidebar_category_favorite() }
			</Select.Item>
		</Select.Content>
	</Select.Root>
</div>
