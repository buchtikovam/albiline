<script lang="ts">
	import { openedDialogStore } from '$lib/stores/ribbonStore';
	import { dragHandleZone, dragHandle } from 'svelte-dnd-action';
	import { flip } from 'svelte/animate';
	import Grip from 'lucide-svelte/icons/grip';
	import type { AutoFormSection } from "$lib/types/components/form/autoform/autoform";
	import type { CustomerData } from '$lib/types/tables/zakaznici';
	import type { Writable } from 'svelte/store';
	import SectionLabel from './labels/SectionLabel.svelte';
	import InputWrapper from './inputs/InputWrapper.svelte';
	import FormContainer from './containers/FormContainer.svelte';
	import FormInputSection from './containers/FormInputSection.svelte';
	import FormCheckboxSection from './containers/FormCheckboxSection.svelte';
	import CheckboxWrapper from './inputs/CheckboxWrapper.svelte';
	import EmptyField from './inputs/EmptyField.svelte';
	import AutoForm from '$lib/components/form/AutoForm.svelte';
	import * as Accordion from "$lib/components/ui/accordion";

	export let items: AutoFormSection[];
	export let colName: string;
	export let formValues:  Writable<CustomerData[]>;
	export let autoformWritable: Writable<AutoForm>;

	const flipDurationMs = 300;

	function handleDndConsider(ev: CustomEvent<{ items: AutoFormSection[] }>) {
		items = ev.detail.items
	}

	function handleDndFinalize(ev: CustomEvent<{ items: AutoFormSection[] }>) {
		items = ev.detail.items;

		autoformWritable.update((autoform) => {
			const columnKey = Object.keys(autoform).find(key => key === colName);
			if (columnKey) {
				autoform[columnKey] = items;
			}
			return autoform;
		});
	}
</script>



<section
	use:dragHandleZone="{{ items, flipDurationMs }}"
	on:consider={handleDndConsider}
	on:finalize={handleDndFinalize}
	class="w-full pb-2 flex flex-col gap-2 min-h-4"
>
	{#each items as item (item.id)}
		<div animate:flip={{ duration: flipDurationMs }} class="bg-white rounded-lg">
			<Accordion.Root value={["item-1"]} >
				<Accordion.Item value="item-1">
					{#if item.hasDialog}
					   <div class="flex justify-between pb-2">
							<Accordion.Trigger class="text-albi-500 w-fit justify-start items-center gap-2">
								<SectionLabel name={item.label} />
							</Accordion.Trigger>

						   <div class="flex items-center gap-2">
							   <button type="button" on:click={() => openedDialogStore.set("customer-detail-invoice-addresses")}>
								   <svelte:component this={item.dialogIcon} class="size-4 text-albi-500"/>
							   </button>

							   <div use:dragHandle aria-label="drag-handle" class="handle">
								   <Grip class="size-4 text-slate-300"/>
							   </div>
						   </div>

					   </div>
					{:else}
						<div class="flex justify-between items-center pb-2">
							<Accordion.Trigger class="text-albi-500 w-fit justify-start items-center gap-2">
								<SectionLabel name={item.label} />
							</Accordion.Trigger>

							<div use:dragHandle aria-label="drag-handle" class="handle">
								<Grip class="size-4 text-slate-300"/>
							</div>
						</div>

					{/if}
					
					
					<Accordion.Content>
						<FormContainer>
							{#each item.sectionDef as row (row.id)}
								{#if row.rowType === "full"}
									<FormInputSection>
										{#each row.rowInputs as input}
											{#if input.type === "text" || input.type === "number"}
												<InputWrapper bind:value={$formValues[input.variableName]} label={input.label} type={input.type} schema={input.schema}/>
											{/if}

											{#if input.type === "checkbox"}
												<CheckboxWrapper field={input.variableName} bind:value={$formValues[input.variableName]} label={input.label} />
											{/if}

											{#if input.type === "empty"}
											<EmptyField/>
											{/if}
										{/each}
									</FormInputSection>
								{/if}

								{#if row.rowType === "checkbox"}
									<FormCheckboxSection>
										{#each row.rowInputs as input}
											<CheckboxWrapper field={input.variableName} bind:value={$formValues[input.variableName]} label={input.label} />
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
