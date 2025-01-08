<script lang="ts">
	import { disableInputs } from '$lib/runes/page.svelte';
	import { openedDialog } from '$lib/runes/ribbon.svelte';
	import { dragHandleZone, dragHandle } from 'svelte-dnd-action';
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
	use:dragHandleZone="{{ items: column, flipDurationMs, type: allowCrossColumnDND ? undefined : colName }}"
	class="w-full pb-2 flex flex-col gap-2 min-h-4"
	onconsider={handleDndConsider}
	onfinalize={handleDndFinalize}
>
	{#each column as section (section.id)}
		<div animate:flip={{ duration: flipDurationMs }} >
			<Accordion.Root type="single" value={(section.isOpen ? section.field : "")}>
				<Accordion.Item value={section.field}>
					{#if section.hasDialog}
						{@const Icon = section.icon}
						<div class="flex justify-between items-center pb-2">

							<div class="flex">
							   <Accordion.Trigger
								   class="p-0 pr-2 text-albi-500 w-fit justify-start items-center gap-2"
								   onclick={() => section.isOpen = !section.isOpen}
							   >
								   <SectionLabel label={section.translation()} />
							   </Accordion.Trigger>


							   <button
								   type="button"
								   onclick={() => openedDialog.value = section.dialogId || "empty"}
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
							<Accordion.Trigger
								class="p-0 pr-2 text-albi-500 w-fit justify-start items-center gap-2"
								onclick={() => section.isOpen = !section.isOpen}
							>
								<SectionLabel label={section.translation()} />
							</Accordion.Trigger>

							<div
								use:dragHandle
								aria-label="drag-handle"
								class="handle"
							>
								<Grip class="size-4 text-slate-300"/>
							</div>
						</div>
					{/if}


					<Accordion.Content>
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
					</Accordion.Content>
				</Accordion.Item>
			</Accordion.Root>
		</div>
	{/each}
</section>
