<script lang="ts">
	import type { AutoFormSimpleType } from "$lib/types/components/form/autoform/autoform";
	import FormInputSection from '$lib/components/form/containers/FormInputSection.svelte';
	import CheckboxWrapper from '$lib/components/form/inputs/CheckboxWrapper.svelte';
	import InputWrapperText from '$lib/components/form/inputs/InputWrapperText.svelte';
	import FormCheckboxSection from '$lib/components/form/containers/FormCheckboxSection.svelte';
	import InputWrapperNumber from '$lib/components/form/inputs/InputWrapperNumber.svelte';
	import type { CustomerContactType } from '$lib/types/page/customers';
	import type { Writable } from 'svelte/store';

	interface Props {
		autoform: AutoFormSimpleType;
		formValues: Record<string, any>;
	}

	let {
		autoform,
		formValues = $bindable(),
	}: Props = $props();

	function updateFormValues(newValue: any, initialValue: any, field: string) {
		formValues[field] = newValue;
	}
</script>


<form method="POST" autocomplete="off" class="overflow-auto">
	<div class="w-full flex flex-col gap-1 h-full">
		{#each autoform as row}
			{#if row.rowType === "row"}
				<FormInputSection>
					{#each row.rowInputs as input}
						{#if input.type === "text"}
							<InputWrapperText
								label={input.translation()}
								schema={input.schema}
								value={formValues[input.field]}
								disable={false}
								addToEditedFormData={
									(newValue, initialValue) => updateFormValues(newValue, initialValue, input.field)
								}
							/>
						{/if}

						{#if input.type === "number"}
							<InputWrapperNumber
								label={input.translation()}
								value={formValues[input.field]}
								schema={input.schema}
								disable={false}
								addToEditedFormData={
									(newValue, initialValue) => updateFormValues(newValue, initialValue, input.field)
								}							/>
						{/if}
					{/each}
				</FormInputSection>
			{/if}

			{#if row.rowType === "checkbox"}
				<div class="grid md:grid-cols-2 grid-cols-1 gap-x-4 gap-y-2 mt-2">
					{#each row.rowInputs as input}
						{#if input.type === "checkbox"}
							<CheckboxWrapper
								label={input.translation()}
								schema={input.schema}
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
