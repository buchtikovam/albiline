<script>
	/** @type {{children?: import('svelte').Snippet}} */
	let { children } = $props();
</script>



<div class="p-4 max-w-[1640px]">
	{@render children?.()}
</div>
