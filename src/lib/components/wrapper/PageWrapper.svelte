<script lang="ts">
	import type {Snippet} from "svelte";

	interface Props {
		children: Snippet
	}

	let { children } : Props = $props();
</script>


<div
	class="h-full w-full flex flex-col gap-[7px] "
>
	{@render children()}
</div>
