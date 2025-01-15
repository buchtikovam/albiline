<script lang="ts">
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();
</script>


<svelte:head>
	<title>Průvodní list</title>
</svelte:head>



<div class="h-full bg-white rounded-lg border-albi-200">
	{@render children?.()}
</div>
