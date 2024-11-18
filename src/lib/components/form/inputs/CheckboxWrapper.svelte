<script lang="ts">
	import { Checkbox } from '$lib/components/ui/checkbox';
	import InputLabel from '../labels/InputLabel.svelte';
	import { getContext } from 'svelte';

	export let value: boolean = false;
	export let label: string;
	export let disable: boolean = false;
</script>


<div class="w-full flex items-center gap-1.5">
	<Checkbox
		disabled={disable}
		bind:checked={value}
	/>
	<InputLabel label={label} />
</div>
