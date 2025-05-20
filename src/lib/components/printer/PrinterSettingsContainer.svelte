<script lang="ts">
	/** @type {{children?: import('svelte').Snippet}} */

	import {boolean} from "zod";

	interface Props {
		children?: import('svelte').Snippet;
		fullHeight?: boolean;
	}

	let { children, fullHeight }: Props = $props();

</script>



<div class={`${fullHeight ? "h-full" : ""} bg-slate-50 mt-0 border border-slate-300 rounded-lg p-2 flex flex-col gap-1 w-full`}>
	{@render children?.()}
</div>
