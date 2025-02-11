<script>
	/** @type {{children?: import('svelte').Snippet}} */
	let { children } = $props();
</script>



<div class="h-full max-w-[2000px] p-4 overflow-auto">
	{@render children?.()}
</div>

