<script lang="ts">
	import { Checkbox } from '$lib/components/ui/checkbox';
	import InputLabel from '../labels/InputLabel.svelte';
	import { z } from 'zod';

	interface Props {
		value: boolean;
		label: string;
		schema: z.ZodType<T>;
		disable?: boolean;
		addToEditedFormData: (newValue: boolean, initialValue: boolean) => void;
	}

	let {
		value,
		label,
		schema,
		disable = false,
		addToEditedFormData
	}: Props = $props();


	let checkedValue = $state(false);
	let hasError = $state(false);

	if (value) checkedValue = value;

	function validateBooleanSchema() {
		try {
			schema.parse(!checkedValue);
			hasError = false;
			addToEditedFormData(!checkedValue, value);
		} catch (e) {
			console.log(e);
			hasError = true;
			addToEditedFormData(!checkedValue, value);
		}
	}
</script>



<div class="w-full flex flex-col">
	<div class="flex items-center gap-1.5">
		<Checkbox
			class={(hasError ? "data-[state=checked]:border-red-600" : "data-[state=checked]:border-border") + " focus-visible:border-albi-500"}
			bind:checked={checkedValue}
			disabled={disable}
			onclick={() => validateBooleanSchema()}
		/>

		<InputLabel
			label={label}
		/>
	</div>
</div>
