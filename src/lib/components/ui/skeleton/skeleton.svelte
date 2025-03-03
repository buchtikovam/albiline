<script lang="ts">
	import type { WithElementRef, WithoutChildren } from "bits-ui";
	import type { HTMLAttributes } from "svelte/elements";
	import { cn } from "$lib/utils.js";
	import {pageCompact} from "$lib/runes/page.svelte";

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: WithoutChildren<WithElementRef<HTMLAttributes<HTMLDivElement>>> = $props();
</script>

<div
	bind:this={ref}
	class={cn(`bg-slate-50 animate-pulse rounded-xl ${pageCompact.value ? "h-[20px]" : "h-[30px]"}`, className)}
	{...restProps}
></div>
