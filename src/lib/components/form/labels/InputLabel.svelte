<script lang="ts">
	interface Props {
		label: string;
	}

	let { label }: Props = $props();
</script>

<label
	class="text-sm mx-auto line-clamp-1 w-full text-slate-500 "
>
	{@html label}
</label>
