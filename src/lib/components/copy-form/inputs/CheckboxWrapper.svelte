<script lang="ts">
	import { Checkbox } from '$lib/components/ui/checkbox';
	import InputLabel from '../labels/InputLabel.svelte';

	export let value: boolean;
	export let label;
</script>


<div class="w-full flex items-center gap-1.5">
	<Checkbox bind:checked={value} />
	<InputLabel label={label} />
</div>