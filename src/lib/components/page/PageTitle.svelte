<script lang="ts">
	import * as Popover from '$lib/components/ui/popover/index.js';
	import Info from "lucide-svelte/icons/info";

	interface Props {
	    title: string,
	}

	let {
	    title
	}: Props = $props();
</script>


{#if title.length > 0}
	<Popover.Root>
		<Popover.Trigger
			class="size-8 bg-white border border-slate-300 rounded-md flex 2xl:hidden justify-center items-center"
		>
			<Info strokeWidth="2" class="size-[18px]" />
		</Popover.Trigger>

		<Popover.Content
			side="right"
			class="text-xs h-8 py-0 px-2 w-fit flex items-center border-albi-500"
		>
			<p>{@html title}</p>
		</Popover.Content>
	</Popover.Root>

	<div class="h-8 hidden border border-slate-300 rounded-md px-2 bg-white 2xl:flex items-center mr-2">
		<p class="text-xs text-ellipsis line-clamp-1">
			{@html title}
		</p>
	</div>
{:else}
	<div class="w-1"></div>
{/if}
