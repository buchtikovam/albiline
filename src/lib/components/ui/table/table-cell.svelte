<script lang="ts">
	import type { HTMLTdAttributes } from "svelte/elements";
	import { cn } from "$lib/utils.js";

	type $$Props = HTMLTdAttributes;

	let className: $$Props["class"] = undefined;

	let isCompact: string;


	export { className as class };
</script>

<td
	class={cn("px-2 py-2.5 align-middle w-fit border-t", className)}
	{...$$restProps}
	on:click
	on:keydown
>
	<slot />
</td>
