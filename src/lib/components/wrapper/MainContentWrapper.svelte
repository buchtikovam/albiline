<script lang="ts">
	import type {Snippet} from "svelte";

	interface Props {
		children: Snippet,
		border?: boolean,
	}

	let { children, border = true } : Props = $props();
</script>


<div
	class={`${border ? "border" : ""} h-full overflow-auto rounded-lg border-slate-300`}
>
	{@render children()}
</div>
