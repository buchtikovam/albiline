<script lang="ts">
	import { Checkbox } from '$lib/components/ui/checkbox';
	import InputLabel from '../labels/InputLabel.svelte';

	export let field: string;
	export let value: boolean;
	export let label: string;
</script>


<div class="w-full flex items-center gap-1.5">
	<Checkbox field={field} bind:checked={value} />
	<InputLabel field={field} label={label} />
</div>
