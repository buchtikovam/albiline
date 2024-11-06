<script lang="ts">
	import { Command as CommandPrimitive } from "cmdk-sv";
	import { cn } from "$lib/utils.js";
	type $$Props = CommandPrimitive.GroupProps;

	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<CommandPrimitive.Group
	class={cn(
		"overflow-hidden  [&_[data-cmdk-group-heading]]:px-2 [&_[data-cmdk-group-heading]]:py-1.5 [&_[data-cmdk-group-heading]]:text-sm [&_[data-cmdk-group-heading]]:font-extrabold  [&_[data-cmdk-group-heading]]:text-albi-500",
		className
	)}
	{...$$restProps}
>
	<slot />
</CommandPrimitive.Group>
