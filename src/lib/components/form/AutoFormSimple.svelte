<script lang="ts">
	import { _ } from 'svelte-i18n'
	import type { AutoFormSimpleType } from "$lib/types/components/form/autoform/autoform";
	import FormInputSection from '$lib/components/form/containers/FormInputSection.svelte';
	import CheckboxWrapper from '$lib/components/form/inputs/CheckboxWrapper.svelte';
	import InputWrapperText from '$lib/components/form/inputs/InputWrapperText.svelte';
	import FormCheckboxSection from '$lib/components/form/containers/FormCheckboxSection.svelte';
	import InputWrapperNumber from '$lib/components/form/inputs/InputWrapperNumber.svelte';

	export let autoform: AutoFormSimpleType;
	export let translationRoute: string;

	console.log(translationRoute);
</script>


<form method="POST" autocomplete="off" class="overflow-auto">
	<div class="w-full flex flex-col gap-1 h-full">
		{#each autoform as row}
			{#if row.rowType === "full"}
				<FormInputSection>
					{#each Object.entries(row.inputs) as [key, value]}
						{#if value.type === "text"}
							<InputWrapperText
								value={""}
								disable={false}
								label={$_(translationRoute + '.' + key)}
								inputDef={value}
							/>
						{/if}

						{#if value.type === "number"}
							<InputWrapperNumber
								value={0}
								disable={false}
								label={$_(translationRoute + '.' + key)}
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
							value={false}
							label={$_(translationRoute + '.' + key)}
						/>
					{/each}
				</div>
			{/if}
		{/each}
	</div>
</form>
