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
		addToEdited?: boolean;
		autoform: AutoFormSimpleType;
		formValues: CustomerContactType;
		translationRoute: string;
	}

	let {
		addToEdited = true,
		autoform,
		formValues = $bindable(),
		translationRoute
	}: Props = $props();
</script>


<form method="POST" autocomplete="off" class="overflow-auto">
	<div class="w-full flex flex-col gap-1 h-full">
		{#each autoform as row}
			{#if row.rowType === "full"}
				<FormInputSection>
					{#each Object.entries(row.inputs) as [key, value]}
						{#if value.type === "text"}
							<InputWrapperText
								bind:value={formValues[key]}
								disable={false}
								addToEdited={addToEdited}
								label={$_(translationRoute + '.' + key)}
								inputDef={value}
								field={key}
							/>
						{/if}

						{#if value.type === "number"}
							<InputWrapperNumber
								bind:value={formValues[key]}
								disable={false}
								addToEdited={addToEdited}
								field={key}
								label={translationRoute + '.' + key}
								inputDef={value}
							/>
						{/if}
					{/each}
				</FormInputSection>
			{/if}

			{#if row.rowType === "checkbox"}
				<div class="grid md:grid-cols-2 grid-cols-1 gap-x-4 gap-y-2 mt-2">
					{#each Object.entries(row.inputs) as [key]}
						<CheckboxWrapper
							addToEdited={addToEdited}
							bind:value={formValues[key]}
							label={translationRoute + '.' + key}
							field={key}
						/>
					{/each}
				</div>
			{/if}
		{/each}
	</div>
</form>
