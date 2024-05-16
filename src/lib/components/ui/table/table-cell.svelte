<script lang="ts">
	import type { HTMLTdAttributes } from "svelte/elements";
	import { cn } from "$lib/utils.js";

	type $$Props = HTMLTdAttributes;

	let className: $$Props["class"] = undefined;
	export { className as class };
</script>

<td
	class={cn("p-2 align-middle border-b min-w-fit", className)}
	{...$$restProps}
	on:click
	on:keydown
>
	<slot />
</td>
