<script lang="ts">
	import { Checkbox } from '$lib/components/ui/checkbox';
	import InputLabel from '../labels/InputLabel.svelte';
	import { getContext } from 'svelte';

	export let field: string;
	export let value: boolean = false;
	export let label: string;
	export let disable: boolean = false;

	const loadStatus = getContext("loadStatus")
</script>


<div class="w-full flex items-center gap-1.5">
	<Checkbox
		disabled={disable}
		field={field}
		bind:checked={value}
	/>
	<InputLabel field={field} label={label} />
</div>
