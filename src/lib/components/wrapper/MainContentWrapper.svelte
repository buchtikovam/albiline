<script lang="ts">
	import type {Snippet} from "svelte";

	interface Props {
		children: Snippet,
		border?: boolean,
		background?: boolean,
	}

	let { children, border = true, background = true } : Props = $props();
</script>


<div
	class={`${border ? "border" : ""} ${background ? "bg-white" : ""} h-full overflow-auto rounded-lg border-slate-300`}
>
	{@render children()}
</div>
