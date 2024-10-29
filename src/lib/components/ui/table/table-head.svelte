<script lang="ts">
	import type { HTMLThAttributes } from "svelte/elements";
	import { cn } from "$lib/utils.js";

	type $$Props = HTMLThAttributes;

	let className: $$Props["class"] = undefined;
	export { className as class };
</script>

<th
	class={cn(
		"px-3 pb-0.5 text-left align-end text-xs leading-[13px] font-medium text-muted-foreground/75",
		className
	)}
	{...$$restProps}
>
	<slot />
</th>
