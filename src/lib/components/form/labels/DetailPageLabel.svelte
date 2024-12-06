<script lang="ts">
	interface Props {
		label: any;
	}

	let { label }: Props = $props();
</script>

<p class="font-bold w-full text-lg">
	{ label }
</p>
