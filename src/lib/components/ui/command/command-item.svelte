<script lang="ts">
	import { Command as CommandPrimitive } from "cmdk-sv";
	import { cn } from "$lib/utils.js";

	type $$Props = CommandPrimitive.ItemProps;

	export let asChild = false;

	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<CommandPrimitive.Item
	{asChild}
	class={cn(
		"cursor-default select-none rounded-sm text-sm outline-none !px-2 !py-2 hover:bg-muted/50 hover:text-black data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
		className
	)}
	{...$$restProps}
	let:action
	let:attrs
>
	<slot {action} {attrs} />
</CommandPrimitive.Item>
