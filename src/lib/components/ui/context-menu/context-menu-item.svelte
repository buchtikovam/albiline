<script lang="ts">
	import { ContextMenu as ContextMenuPrimitive } from "bits-ui";
	import { cn } from "$lib/utils.js";

	type $$Props = ContextMenuPrimitive.ItemProps & {
		inset?: boolean;
	};
	type $$Events = ContextMenuPrimitive.ItemEvents;

	let className: $$Props["class"] = undefined;
	export let inset: $$Props["inset"] = undefined;
	export { className as class };
</script>

<ContextMenuPrimitive.Item
	class={cn(
		"relative flex cursor-default select-none items-center rounded-sm px-1.5 py-1 text-sm text-albi-950 outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-muted/50 data-[highlighted]:text-black data-[disabled]:opacity-50",
		inset && "pl-8",
		className
	)}
	{...$$restProps}
	on:click
	on:keydown
	on:focusin
	on:focusout
	on:pointerdown
	on:pointerleave
	on:pointermove
>
	<slot />
</ContextMenuPrimitive.Item>
