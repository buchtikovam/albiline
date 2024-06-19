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
	class={isCompact === "standard" ? cn("p-2 align-middle w-fit", className) : cn("p-0.5 pl-2 align-middle w-fit", className)}
	{...$$restProps}
	on:click
	on:keydown
>
	<slot />
</td>
