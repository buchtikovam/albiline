<script>
	/** @type {{children?: import('svelte').Snippet}} */
	let { children } = $props();
</script>


<svelte:head>
	<title>Prodej</title>
</svelte:head>



{@render children?.()}
