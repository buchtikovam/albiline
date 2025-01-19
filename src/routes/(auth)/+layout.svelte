<script lang="ts">
	import './../../app.pcss';
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();
</script>




<div class="bg-albi-50 h-dvh w-dvh">
	{@render children?.()}
</div>
