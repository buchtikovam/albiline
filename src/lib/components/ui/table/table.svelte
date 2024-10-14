<script lang="ts">
	import type { HTMLTableAttributes } from "svelte/elements";
	import { cn } from "$lib/utils.js";

	type $$Props = HTMLTableAttributes;

	let className: $$Props["class"] = undefined;
	export let wrapper: HTMLElement;
	export {
		className as class,
	};
</script>

<div class="relative w-full h-full overflow-auto" bind:this={wrapper}>
	<table class={cn("w-full caption-bottom text-sm", className)} {...$$restProps}>
		<slot />
	</table>
</div>
