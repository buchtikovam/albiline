<script lang="ts">
	interface Props {
		label: string;
	}

	let { label }: Props = $props();
</script>


<div
	class="text-sm mx-auto line-clamp-1 w-full text-slate-500 "
>
	{@html label}
</div>

