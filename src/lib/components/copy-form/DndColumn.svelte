<script lang="ts">
	import {dndzone} from 'svelte-dnd-action';
	import type { AutoFormSection } from "$lib/types/components/form/autoform/autoform";
	import SectionLabel from './labels/SectionLabel.svelte';
	import FormContainer from './containers/FormContainer.svelte';
	import FormSectionFull from '../form/FormSectionFull.svelte';
	import InputWrapper from './inputs/InputWrapper.svelte';
	import type { CustomerData } from '$lib/types/tables/zakaznici';
	import type { Writable } from 'svelte/store';
	import * as Accordion from "$lib/components/ui/accordion";
	import FormCheckboxSection from './containers/FormCheckboxSection.svelte';
	import CheckboxWrapper from './inputs/CheckboxWrapper.svelte';
	import EmptyField from './inputs/EmptyField.svelte';

	export let items: AutoFormSection[];
	export let formValues:  Writable<CustomerData[]>;

	const flipDurationMs = 300;

	function handleDndConsider(ev) {
		items = ev.detail.items;
	}

	function handleDndFinalize(ev) {		
		items = ev.detail.items;
	}
</script>


<section 
	use:dndzone={{items: items, flipDurationMs}}
	on:consider={handleDndConsider}
	on:finalize={handleDndFinalize}
	class="w-full pb-4 flex flex-col gap-2 min-h-4"
>
{#each items as item (item.id)}
	<Accordion.Root value={["item-1"]}>
		<Accordion.Item value="item-1">
			<Accordion.Trigger class="text-albi-500">
				<SectionLabel name={item.label} />
			</Accordion.Trigger>

			<Accordion.Content>
				<FormContainer>
					{#each item.sectionDef as row (row.id)}
						{#if row.rowType === "full"}
							<FormSectionFull>
								{#each row.rowInputs as input}
									{#if input.type === "text" || input.type === "number"}
										<InputWrapper bind:value={$formValues[input.variableName]} label={input.label} type={input.type} />
									{/if}
									
									{#if input.type === "empty"}
										<EmptyField/>
									{/if}
								{/each}
							</FormSectionFull>
						{/if}

						{#if row.rowType === "checkbox"}
						<FormCheckboxSection>
								{#each row.rowInputs as input}
									<CheckboxWrapper bind:value={$formValues[input.variableName]} label={input.label} />
								{/each}
						</FormCheckboxSection>
						{/if}
					{/each}
				</FormContainer>
		    </Accordion.Content>
		</Accordion.Item>
	</Accordion.Root>
{/each}
</section>