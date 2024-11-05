<script lang="ts">
	import { _ } from 'svelte-i18n'
	import type { AutoFormSimpleType } from "$lib/types/components/form/autoform/autoform";
	import FormInputSection from '$lib/components/form/containers/FormInputSection.svelte';
	import CheckboxWrapper from '$lib/components/form/inputs/CheckboxWrapper.svelte';
	import InputWrapper from '$lib/components/form/inputs/InputWrapper.svelte';
	import FormCheckboxSection from '$lib/components/form/containers/FormCheckboxSection.svelte';

	export let autoform: AutoFormSimpleType;
	export let translationRoute: string;

	console.log(translationRoute);
</script>


<form method="POST" autocomplete="off">
	<div class="w-full flex flex-col gap-1">
		{#each autoform as row}
			{#if row.rowType === "full"}
				<FormInputSection>
					{#each Object.entries(row.rowInputs) as [key, value]}
						{#if value.inputType === "text" || value.inputType === "number"}
							<InputWrapper
								value={""}
								label={$_(translationRoute + '.' + key)}
								type={value.inputType}
								schema={value.schema}
							/>
						{/if}

					{/each}
				</FormInputSection>
			{/if}

			{#if row.rowType === "checkbox"}
				<div class="grid grid-cols-2 gap-x-4 gap-y-2 mt-2">
					{#each Object.entries(row.rowInputs) as [key, value]}
						<CheckboxWrapper
							field={key}
							value={false}
							label={$_(translationRoute + '.' + key)}
						/>
					{/each}
				</div>
			{/if}
		{/each}
	</div>
</form>
