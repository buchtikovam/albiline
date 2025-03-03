<script lang="ts">
	interface Props {
		label: string;
	}

	let { label }: Props = $props();
</script>


<p class="font-bold w-full text-lg -mb-1 sm:-mb-0">
	{ label }
</p>
