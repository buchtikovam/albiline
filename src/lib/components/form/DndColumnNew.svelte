<script lang="ts">
	import { openedDialogStore } from '$lib/stores/ribbonStore';
	import { dragHandleZone, dragHandle } from 'svelte-dnd-action';
	import { flip } from 'svelte/animate';
	import type { AutoFormSection } from "$lib/types/components/form/autoform/autoform";
	import type { CustomerData } from '$lib/types/tables/zakaznici';
	import type { Writable } from 'svelte/store';
	import InputWrapper from './inputs/InputWrapper.svelte';
	import FormInputSection from './containers/FormInputSection.svelte';
	import FormCheckboxSection from './containers/FormCheckboxSection.svelte';
	import CheckboxWrapper from './inputs/CheckboxWrapper.svelte';
	import EmptyField from './inputs/EmptyField.svelte';
	import AutoForm from '$lib/components/form/AutoForm.svelte';
	import * as Accordion from "$lib/components/ui/accordion";
	import { _ } from 'svelte-i18n'
	import type { AutoFormNew, AutoFormNewSection } from '$lib/types/components/form/autoform/autoformNew';
	import SectionLabel from '$lib/components/form/labels/SectionLabel.svelte';
	import Grip from 'lucide-svelte/icons/grip';
	import FormContainer from '$lib/components/form/containers/FormContainer.svelte';
	import InputWrapperNew from '$lib/components/form/inputs/InputWrapperNewText.svelte';
	import InputWrapperNewText from '$lib/components/form/inputs/InputWrapperNewText.svelte';
	import InputWrapperNewNumber from '$lib/components/form/inputs/InputWrapperNewNumber.svelte';
	import DropdownWrapper from '$lib/components/form/inputs/DropdownWrapper.svelte';
	import DateWrapper from '$lib/components/form/inputs/DateWrapper.svelte';

	export let items: AutoFormNewSection[];
	export let colName: string;
	export let translationRoute: string;
	export let autoformWritable: Writable<AutoFormNew>;
	export let allowCrossColumnDND: boolean = true
	export let formValues: Writable<customerAddressType>;

	type customerAddressType = {
		[key: string] : any
	}

	const flipDurationMs = 300;

	console.log(colName);

	function handleDndConsider(ev: CustomEvent<{ items: AutoFormNewSection[] }>) {
		items = ev.detail.items
	}

	function handleDndFinalize(ev: CustomEvent<{ items: AutoFormNewSection[] }>) {
		items = ev.detail.items;

		autoformWritable.update((autoform) => {
			const columnKey = Object.keys(autoform).find(key => key === colName);
			if (columnKey) autoform[columnKey] = items;
			return autoform;
		});
	}
</script>



<section
	use:dragHandleZone="{{ items, flipDurationMs, type: allowCrossColumnDND ? undefined : colName }}"
	class="w-full pb-2 flex flex-col gap-2 min-h-4"
	on:consider={handleDndConsider}
	on:finalize={handleDndFinalize}
>
	{#each items as item (item.id)}
		<div animate:flip={{ duration: flipDurationMs }} >
			<Accordion.Root value={["item-1"]} >
				<Accordion.Item value="item-1">
					{#if item.hasDialog}
						<div class="flex justify-between pb-2">
						   <div class="flex">
							   <Accordion.Trigger class="text-albi-500 w-fit justify-start items-center gap-2">
								   <SectionLabel name={$_(translationRoute + item.field)} />
							   </Accordion.Trigger>

							   <button type="button" on:click={() => openedDialogStore.set(item.dialogId)}>
								   <svelte:component this={item.dialogIcon} class="size-4 text-albi-500"/>
								   {item.dialogTitle || ""}
							   </button>
						   </div>

						   <div use:dragHandle aria-label="drag-handle" class="handle">
							   <Grip class="size-4 text-slate-300"/>
						   </div>
					   </div>
					{:else}
						<div class="flex justify-between items-center pb-2">
							<Accordion.Trigger class="text-albi-500 w-fit justify-start items-center gap-2">
								<SectionLabel name={$_(translationRoute + item.field)} />
							</Accordion.Trigger>

							<div use:dragHandle aria-label="drag-handle" class="handle">
								<Grip class="size-4 text-slate-300"/>
							</div>
						</div>
					{/if}


					<Accordion.Content>
						<FormContainer>
							{#each item.rows as row}
								{#if row.rowType === "full"}
									<FormInputSection>
										{#each Object.entries(row.inputs) as [key, value]}
											{#if value.type === "text"}
												<InputWrapperNewText
													label={$_(translationRoute + key)}
													inputDef={value}
													bind:value={$formValues[key]}
												/>
											{/if}

											{#if value.type === "number"}
												<InputWrapperNewNumber
													label={$_(translationRoute + key)}
													inputDef={value}
													bind:value={$formValues[key]}
												/>
											{/if}

											{#if value.type === "checkbox"}
												<div class="mt-5 w-full">
													<CheckboxWrapper
														field={key}
														label={$_(translationRoute + key)}
														bind:value={$formValues[key]}
													/>
												</div>
											{/if}

											{#if value.type === "empty"}
												<EmptyField/>
											{/if}

											{#if value.type === "dropdown"}
												<DropdownWrapper
													bind:value={$formValues[key]}
													options={value.dropdownOptions}
													label={$_(translationRoute + key)}
												/>
											{/if}

											{#if value.type === "date"}
												<DateWrapper
													bind:value={$formValues[key]}
													label={$_(translationRoute + key)}
												/>
											{/if}
										{/each}
									</FormInputSection>
								{/if}

								{#if row.rowType === "checkbox"}
									<FormCheckboxSection>
										{#each Object.entries(row.inputs) as [key]}
											<CheckboxWrapper
												field={key}
												bind:value={$formValues[key]}
												label={$_(translationRoute + key)}
											/>
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
