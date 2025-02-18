<script lang="ts">
	import { disableInputs } from '$lib/runes/page.svelte';
	import { openedRibbonDialog } from '$lib/runes/ribbon.svelte';
	import { dragHandleZone, dragHandle, dndzone } from 'svelte-dnd-action';
	import { flip } from 'svelte/animate';
	import Grip from 'lucide-svelte/icons/grip';
	import type { AutoFormType, AutoFormSection } from '$lib/types/components/form/autoform';
	import FormCheckboxSection from '$lib/components/form/containers/FormCheckboxSection.svelte';
	import InputWrapperNumber from '$lib/components/form/inputs/InputWrapperNumber.svelte';
	import FormInputSection from '$lib/components/form/containers/FormInputSection.svelte';
	import InputWrapperText from '$lib/components/form/inputs/InputWrapperText.svelte';
	import CheckboxWrapper from '$lib/components/form/inputs/CheckboxWrapper.svelte';
	import DropdownWrapper from '$lib/components/form/inputs/DropdownWrapper.svelte';
	import FormContainer from '$lib/components/form/containers/FormContainer.svelte';
	import SectionLabel from '$lib/components/form/labels/SectionLabel.svelte';
	import DateWrapper from '$lib/components/form/inputs/DateWrapper.svelte';
	import EmptyField from '$lib/components/form/inputs/EmptyField.svelte';
	import * as Accordion from "$lib/components/ui/accordion";
	import { slide } from 'svelte/transition';
	import { cubicInOut } from "svelte/easing";

	interface Props {
		formDef: AutoFormType;
		colName: string;
		allowCrossColumnDND?: boolean;
		editedFormValues: Record<string, any>,
		initialFormValues: any
	}

	let {
		formDef = $bindable(),
		colName,
		initialFormValues,
		editedFormValues = $bindable(),
		allowCrossColumnDND = true,
	}: Props = $props();

	let disable = $derived(disableInputs);
	let column = $derived(formDef[colName]);

	const flipDurationMs = 300;

	function handleDndConsider(ev: CustomEvent<{ items: AutoFormSection[] }>) {
		formDef[colName] = ev.detail.items;
	}

	function handleDndFinalize(ev: CustomEvent<{ items: AutoFormSection[] }>) {
		formDef[colName] = ev.detail.items;
	}

	function updateFormValues(newValue: any, initialValue: any, field: string) {
		editedFormValues[field] = newValue;

		if (initialValue === newValue) {
			delete editedFormValues[field];
		}
	}
</script>




<section
	use:dragHandleZone="{{
	items: column,
	flipDurationMs,
	type: allowCrossColumnDND ? undefined : colName,
	dragDisabled: false,
}}"
	class="w-full pb-2 flex flex-col gap-2 min-h-4"
	onconsider={handleDndConsider}
	onfinalize={handleDndFinalize}
	aria-label="drag-handle-zone"
>
	{#each column as section (section.id)}
		<div animate:flip={{ duration: flipDurationMs }} >
			{#if section.hasDialog}
				{@const Icon = section.icon}

				<div class="flex justify-between items-center pb-2">
					<div class="flex">
						<button
						   type="button"
						   class="p-0 pr-2 text-albi-500 w-fit"
						   onclick={() => section.isOpen = !section.isOpen}
					   >
						   <SectionLabel label={section.translation()} />
					   </button>


					   <button
						   type="button"
						   onclick={() => openedRibbonDialog.value = section.dialogId || "empty"}
					   >
						   <Icon class="size-4 text-albi-500"/>
						   {section.dialogTitle || ""}
					   </button>
				   </div>

				   <div
					   use:dragHandle
					   aria-label="drag-handle"
					   class="handle"
				   >
					   <Grip class="size-4 text-slate-300"/>
				   </div>
			   </div>
			{:else}
				<div class="flex justify-between items-center pb-2">
					<button
						type="button"
						class="pr-2 w-full text-left text-albi-500"
						onclick={() => section.isOpen = !section.isOpen}
					>
						<SectionLabel label={section.translation()} />
					</button>


					<div
						use:dragHandle
						aria-label="drag-handle"
						class="handle"
					>
						<Grip class="size-4 text-slate-300"/>
					</div>
				</div>
			{/if}


			{#if section.isOpen}
				<div transition:slide={{duration: 300, easing: cubicInOut}}>
					<FormContainer>
						{#each section.rows as row}
							{#if row.rowType === "row"}
								<FormInputSection>
									{#each row.rowInputs as input}
										{#if input.type === "text"}
											<InputWrapperText
												label={input.translation()}
												schema={input.schema}
												value={initialFormValues[input.field]}
												disable={disable.value}
												addToEditedFormData={
												(newValue, initialValue) => updateFormValues(newValue, initialValue, input.field)
											}
											/>
										{/if}
										{#if input.type === "number"}
											<InputWrapperNumber
												label={input.translation()}
												schema={input.schema}
												value={initialFormValues[input.field]}
												disable={disable.value}
												addToEditedFormData={
												(newValue, initialValue) => updateFormValues(newValue, initialValue, input.field)
											}
											/>
										{/if}

										{#if input.type === "checkbox"}
											<div class="mt-5 w-full">
												<CheckboxWrapper
													label={input.translation()}
													schema={input.schema}
													value={initialFormValues[input.field]}
													disable={disable.value}
													addToEditedFormData={
													(newValue, initialValue) => updateFormValues(newValue, initialValue, input.field)
												}
												/>
											</div>
										{/if}

										{#if input.type === "empty"}
											<EmptyField/>
										{/if}

										{#if input.type === "dropdown"}
											<DropdownWrapper
												label={input.translation()}
												schema={input.schema}
												value={initialFormValues[input.field]}
												options={input.dropdownOptions}
												addToEditedFormData={
												(newValue, initialValue) => updateFormValues(newValue, initialValue, input.field)
											}
											/>
										{/if}

										{#if input.type === "date"}
											<DateWrapper
												label={input.translation()}
												schema={input.schema}
												disable={disable.value}
												value={initialFormValues[input.field]}
												addToEditedFormData={
													(newValue, initialValue) => updateFormValues(newValue, initialValue, input.field)
												}
											/>
										{/if}
									{/each}
								</FormInputSection>
							{/if}

							{#if row.rowType === "checkbox"}
								<FormCheckboxSection>
									{#each row.rowInputs as input}
										{#if input.type === "checkbox"}
											<CheckboxWrapper
												label={input.translation()}
												schema={input.schema}
												value={initialFormValues[input.field]}
												disable={disable.value}
												addToEditedFormData={
												(newValue, initialValue) => updateFormValues(newValue, initialValue, input.field)
											}
											/>
										{/if}
									{/each}
								</FormCheckboxSection>
							{/if}
						{/each}
					</FormContainer>
				</div>
			{/if}
		</div>
	{/each}
</section>
