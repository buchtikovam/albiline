<script lang="ts">
	import './../../app.pcss';
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();
</script>




<div class="bg-slate-100 h-dvh w-dvh">
	{@render children?.()}
</div>
