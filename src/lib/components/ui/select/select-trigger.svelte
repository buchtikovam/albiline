<script lang="ts">
	import { Select as SelectPrimitive, type WithoutChild } from "bits-ui";
	import ChevronDown from "lucide-svelte/icons/chevron-down";
	import { cn } from "$lib/utils.js";

	let {
		hideChevron,
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: WithoutChild<SelectPrimitive.TriggerProps> & { hideChevron?: boolean } = $props();
</script>

<SelectPrimitive.Trigger
	bind:ref
	class={cn(
		"border-input bg-background focus:border-albi-500 data-[placeholder]:text-muted-foreground  flex h-10 w-full items-center justify-between rounded-md border px-3 py-2 text-sm focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
		className
	)}
	{...restProps}
>
	{@render children?.()}

	{#if !hideChevron}
		<ChevronDown class="size-4 opacity-50" />
	{/if}
</SelectPrimitive.Trigger>
