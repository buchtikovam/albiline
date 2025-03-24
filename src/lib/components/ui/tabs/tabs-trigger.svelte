<script lang="ts">
	import { Tabs as TabsPrimitive } from "bits-ui";
	import { cn } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: TabsPrimitive.TriggerProps = $props();
</script>

<TabsPrimitive.Trigger
	bind:ref
	class={cn(
		"data-[state=active]:bg-albi-500 data-[state=active]:text-white text-albi-950 h-6 rounded-md inline-flex items-center justify-center whitespace-nowrap px-2 py-1 font-bold text-xs transition-all focus-visible:outline-none  disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm",
		// "data-[state=active]:bg-albi-500 data-[state=active]:text-white text-albi-950 h-8 rounded-none inline-flex items-center justify-center whitespace-nowrap px-2 py-1 font-bold text-xs transition-all focus-visible:outline-none  disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm",
		className
	)}
	{...restProps}
/>
