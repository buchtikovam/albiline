<script lang="ts">
	import type {Snippet} from "svelte";

	interface Props {
		children: Snippet
	}

	let { children } : Props = $props();
</script>


<div
	class="flex h-[34px] justify-between items-center"
>
	{@render children()}
</div>
