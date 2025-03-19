<script lang="ts">
	import type { AutoFormSimpleType } from "$lib/types/components/form/autoform";
	import FormInputSection from '$lib/components/form/containers/FormInputSection.svelte';
	import CheckboxWrapper from '$lib/components/form/inputs/CheckboxWrapper.svelte';
	import InputWrapperText from '$lib/components/form/inputs/InputWrapperText.svelte';
	import InputWrapperNumber from '$lib/components/form/inputs/InputWrapperNumber.svelte';
	import DropdownWrapper from "$lib/components/form/inputs/DropdownWrapper.svelte";
	import DateWrapper from "$lib/components/form/inputs/DateWrapper.svelte";
	import EmptyField from "$lib/components/form/inputs/EmptyField.svelte";

	interface Props {
		autoform: AutoFormSimpleType;
		formValues: Record<string, any>;
	}

	let {
		autoform,
		formValues = $bindable(),
	}: Props = $props();


	function updateFormValues(
		newValue: any,
		initialValue: any,
		field: string
	) {
		formValues[field] = newValue;
	}
</script>



<form
	method="POST"
	autocomplete="off"
	class="overflow-auto"
>
	<div class="w-full flex flex-col gap-1 h-full">
		{#each autoform as row}
			{#if row.rowType === "row"}
				<FormInputSection>
					{#each row.rowInputs as input}
						{#if input.type === "text"}
							<InputWrapperText
								formInput={input}
								value={formValues[input.field]}
								addToEditedFormData={
									(newValue, initialValue) => updateFormValues(newValue, initialValue, input.field)
								}
							/>
						{/if}

						{#if input.type === "number"}
							<InputWrapperNumber
								formInput={input}
								value={formValues[input.field]}
								addToEditedFormData={
									(newValue, initialValue) => updateFormValues(newValue, initialValue, input.field)
								}
							/>
						{/if}

						{#if input.type === "dropdown"}
							<DropdownWrapper
								formInput={input}
								value={formValues[input.field]}
								addToEditedFormData={
									(newValue, initialValue) => updateFormValues(newValue, initialValue, input.field)
								}
							/>
						{/if}


						{#if input.type === "date"}
							<DateWrapper
								formInput={input}
								value={formValues[input.field]}
								addToEditedFormData={
									(newValue, initialValue) => updateFormValues(newValue, initialValue, input.field)
								}
							/>
						{/if}

						{#if input.type === "checkbox"}
							<div class="mt-5 w-full">
								<CheckboxWrapper
									formInput={input}
									value={formValues[input.field]}
									addToEditedFormData={
										(newValue, initialValue) => updateFormValues(newValue, initialValue, input.field)
									}
								/>
							</div>
						{/if}

						{#if input.type === "empty"}
							<EmptyField/>
						{/if}
					{/each}
				</FormInputSection>
			{/if}

			{#if row.rowType === "checkbox"}
				<div class="grid lg:grid-cols-2 sm:grid-cols-1 gap-y-2 gap-x-4 mt-1.5">
					{#each row.rowInputs as input}
						{#if input.type === "checkbox"}
							<CheckboxWrapper
								formInput={input}
								value={formValues[input.field]}
								disable={false}
								addToEditedFormData={
									(newValue, initialValue) => updateFormValues(newValue, initialValue, input.field)
								}
							/>
						{/if}
					{/each}
				</div>
			{/if}
		{/each}
	</div>
</form>
