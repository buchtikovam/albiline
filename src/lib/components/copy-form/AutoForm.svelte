<script lang="ts">
	import type { AutoForm } from "$lib/types/components/form/autoform/autoform";
	import SectionLabel from "../label/SectionLabel.svelte";
	import FormSectionFull from "$lib/components/form/FormSectionFull.svelte";
	import FSInputWrapper from '$lib/components/formsnap/FSInputWrapper.svelte';
	import FormContainer from "$lib/components/form/FormContainer.svelte";
	import { get } from "svelte/store";

	export let autoform: AutoForm;
	export let form;
	export let formValues;

	console.log(form);
	

	const { enhance } = form;

</script>

<form use:enhance method="POST" autocomplete="off">
	<div class="xl:flex gap-4 h-full">
		<div class="w-full">
			{#each autoform.formDef as section (section.id)}
				<div>
					<SectionLabel name={section.label} />

					<FormContainer>
						{#each section.sectionDef as row (row.id)}
							{#if row.rowType === "full"}
								<FormSectionFull>
									{#each row.rowInputs as input (input.variableName)}
										<FSInputWrapper bind:value={$formValues[input.variableName]} form={form} name={input.variableName} label={input.label}/>
									{/each}
									

								</FormSectionFull>
							{/if}
							
						{/each}
					</FormContainer>

					
					

				</div>	
			{/each}
			




		</div>
	</div>
</form>