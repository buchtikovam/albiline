<script>
	/** @type {{children?: import('svelte').Snippet}} */
	let { children } = $props();
</script>



<div class="bg-slate-50 border rounded-lg p-2 md:p-4 md:pt-2 flex flex-col gap-1">
	{@render children?.()}
</div>
