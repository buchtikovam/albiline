<script lang="ts">
	import type {Snippet} from "svelte";

	interface Props {
		children: Snippet
	}

	let { children } : Props = $props();
</script>


<div
	class="h-full overflow-auto rounded-lg border border-slate-300 bg-white"
>
	{@render children()}
</div>
