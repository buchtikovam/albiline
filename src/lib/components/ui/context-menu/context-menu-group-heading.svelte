<script lang="ts">
	import { ContextMenu as ContextMenuPrimitive } from "bits-ui";
	import { cn } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		inset,
		bold,
		...restProps
	}: ContextMenuPrimitive.GroupHeadingProps & {
		inset?: boolean;
		bold?: boolean;
	} = $props();
</script>

<ContextMenuPrimitive.GroupHeading
	bind:ref
	class={cn(`text-albi-950 px-1.5 py-1 text-sm ${bold ? "font-semibold" : "font-normal"}`, inset && "pl-8", className)}
	{...restProps}
/>
