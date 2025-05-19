<script>
	/** @type {{children?: import('svelte').Snippet}} */
	let { children } = $props();
</script>



<div class="bg-slate-50 border border-slate-300 rounded-lg p-2 flex flex-col gap-1 w-full">
	{@render children?.()}
</div>
