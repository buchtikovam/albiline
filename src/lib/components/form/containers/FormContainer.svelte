<script>
	/** @type {{children?: import('svelte').Snippet}} */
	let { children } = $props();
</script>



<div class="bg-slate-50 border border-slate-300 rounded-lg p-2 md:p-4 md:pt-2 flex flex-col gap-1 max-w-[800px]">
	{@render children?.()}
</div>
