<script>
	/** @type {{children?: import('svelte').Snippet}} */
	let { children } = $props();
</script>



<div class="flex flex-col gap-2 sm:flex-row md:gap-4">
	{@render children?.()}
</div>
