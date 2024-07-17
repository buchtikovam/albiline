<script lang="ts">
	import type { HTMLTdAttributes } from "svelte/elements";
	import { cn } from "$lib/utils.js";
	import { pageCompactStore } from '$lib/stores/tableStore';

	type $$Props = HTMLTdAttributes;

	let className: $$Props["class"] = undefined;

	let isCompact: string;

	pageCompactStore.subscribe((data) => {
		isCompact = data;
	})

	export { className as class };
</script>

<td
	class={
		isCompact === "standard" 
			? cn("px-2 py-2.5 align-middle w-fit border-t", className) 
			: cn("px-2 py-1.5 align-middle w-fit border-t", className)}
	{...$$restProps}
	on:click
	on:keydown
>
	<slot />
</td>
