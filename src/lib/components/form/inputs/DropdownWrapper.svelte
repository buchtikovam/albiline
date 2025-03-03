<script lang="ts">
	import type {AutoFormInput} from "$lib/types/components/form/autoform";
	import InputLabelWithContext from "$lib/components/form/labels/InputLabelWithContext.svelte";
	import * as Select from "$lib/components/ui/select/index.js";

	export const disable: boolean = false;

	interface Props {
		value: string;
		formInput: AutoFormInput;
		addToEditedFormData: (newValue: any, initialValue: any) => void;
	}

	let {
		value,
		formInput,
		addToEditedFormData
	}: Props = $props();

	let dropdownValue = $state(value);

	if (!value) dropdownValue = "‎";

	let hasError = $state(false);
	let errorMessage = $state("");

	function validateDropdownSchema(selectedValue: any) {
		try {
			formInput.schema.parse(selectedValue);
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
	<InputLabelWithContext
		contextMenuField={formInput.field}
		label={formInput.translation()}
	/>

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
			{#if formInput.dropdownOptions}
				{#each formInput.dropdownOptions as option}
					<Select.Item
						value={option}
						label={option}
					/>
				{/each}
			{/if}
		</Select.Content>
	</Select.Root>

	<p class="text-xs text-red-700 w-full">
		{errorMessage}
	</p>
</div>
