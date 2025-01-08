<script lang="ts">
	import { z } from 'zod';
	import InputLabel from '$lib/components/form/labels/InputLabel.svelte';
	import * as Select from "$lib/components/ui/select/index.js";

	export const disable: boolean = false;
	interface Props {
		value: string;
		options?: string[];
		schema: z.ZodType<T>;
		label: any;
		addToEditedFormData: (newValue: any, initialValue: any) => void;
	}

	let {
		value,
		options = [],
		schema,
		label,
		addToEditedFormData
	}: Props = $props();

	let dropdownValue = $state(value);

	if (!value) dropdownValue = "‎";

	let hasError = $state(false);
	let errorMessage = $state("");

	function validateDropdownSchema(selectedValue: any) {
		try {
			schema.parse(selectedValue);
			hasError = false;
			errorMessage = "";
			addToEditedFormData(selectedValue, value);
		} catch (e) {
			hasError = true;
			errorMessage = e.issues[0].message;
			addToEditedFormData(selectedValue, value);
			console.log(e);
		}
	}
</script>



<div class="w-full flex flex-col">
	<InputLabel label={label} />
	<Select.Root
		type="single"
		disabled={disable}
		bind:value={dropdownValue}
		onValueChange={(v) => validateDropdownSchema(v)}
	>
		<Select.Trigger class={hasError ? "focus:border-red-600" : "focus:border-albi-500"}>
			{ dropdownValue }
		</Select.Trigger>

		<Select.Content>
			{#each options as option}
				<Select.Item value={option} label={option} />
			{/each}
		</Select.Content>
	</Select.Root>

	<p class="text-xs text-red-700 w-full">
		{errorMessage}
	</p>
</div>
