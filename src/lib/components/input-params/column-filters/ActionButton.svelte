<script lang="ts">
	import type { Snippet } from "svelte";

	interface Props {
		onclickFn: () => void;
		children: Snippet;
	}

	let {
		onclickFn,
		children
	}: Props = $props();
</script>



<button
	class="w-full flex items-center gap-2 px-2 py-1 hover:text-black hover:bg-muted/50 text-sm"
	onclick={onclickFn}
>
	{@render children?.()}
</button>
