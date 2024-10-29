<script lang="ts">
	import type { HTMLTdAttributes } from "svelte/elements";
	import { cn } from "$lib/utils.js";

	type $$Props = HTMLTdAttributes;

	let className: $$Props["class"] = undefined;

	let isCompact: string;


	export { className as class };
</script>

<td
	class={cn("px-3 py-1.5 align-middle whitespace-nowrap text-albi-950", className)}
	{...$$restProps}
	on:click
	on:keydown
>
	<slot />
</td>
