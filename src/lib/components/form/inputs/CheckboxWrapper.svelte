<script lang="ts">
	import { Checkbox } from '$lib/components/ui/checkbox';
	import InputLabel from '../labels/InputLabel.svelte';
	import { getContext } from 'svelte';
	import { addToEditedFormData } from '$lib/utils/addToEditedFormData';

	interface Props {
		value: boolean;
		label: string;
		disable?: boolean;
		field?: string;
		addToEdited?: boolean;
	}

	let {
		value = $bindable(),
		label,
		disable = false,
		field = "",
		addToEdited = true
	}: Props = $props();

	const initialValue = value;

	if (!initialValue) {
		value = false;
	}
</script>


<div class="w-full flex items-center gap-1.5">
	<Checkbox
		bind:checked={value}
		disabled={disable}
		onclick={() => {
			if (addToEdited) {
				addToEditedFormData(initialValue, field, !value);
			}
		}}
	/>

	<InputLabel
		label={label}
	/>
</div>
