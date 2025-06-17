<script lang="ts">
	import { Tabs as TabsPrimitive } from "bits-ui";
	import { cn } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: TabsPrimitive.ListProps = $props();
</script>

<TabsPrimitive.List
	bind:ref
	class={cn(
		"bg-white text-albi-950 inline-flex h-8 min-h-8 px-1 items-center justify-center rounded-md ",
		// "bg-white text-albi-950 inline-flex h-8 px-0 items-center justify-center rounded-md ",
		className
	)}
	{...restProps}
/>
