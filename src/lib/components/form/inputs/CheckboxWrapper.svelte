<script lang="ts">
	import { Checkbox } from '$lib/components/ui/checkbox';
	import InputLabel from '../labels/InputLabel.svelte';
	import { getContext } from 'svelte';
	import { addToEditedFormData } from '$lib/utils/addToEditedFormData';

	export let value: boolean = false;
	export let label: string;
	export let disable: boolean = false;
	export let field: string = "";
	export let addToEdited: boolean = true;

	const initialValue = value;
</script>


<div class="w-full flex items-center gap-1.5">
	<Checkbox
		on:click={() => {
			if (addToEdited) {
				addToEditedFormData(initialValue, field, !value);
			}
		}}
		disabled={disable}
		bind:checked={value}
	/>

	<InputLabel
		label={label}
	/>
</div>
