<script lang="ts">
	import {Button} from "$lib/components/ui/button/index.js";
	import DialogWrapper from "$lib/components/dialog/DialogWrapper.svelte";
	import * as Dialog from '$lib/components/ui/dialog';
	import * as m from "$lib/paraglide/messages";
	import SaveWithLabelDialog from "$lib/components/dialog/save/SaveWithLabelDialog.svelte";
	import type {FetchedInputParam} from "$lib/types/components/input-params/inputParams";
	import {Label} from "$lib/components/ui/label";
	import {Input} from "$lib/components/ui/input";


	interface Props {
		isOpen: boolean;
		onsubmit: () => void;
		onupdate: () => void;
		inputValue: string;
		selectedParam: FetchedInputParam|undefined;
		hasEditedData: boolean;
	}

	let {
		isOpen = $bindable(),
		onupdate,
		onsubmit,
		selectedParam,
		inputValue = $bindable(),
		hasEditedData,
	}: Props = $props();

	let showSaveNew = $state(false);

	$effect(() => {
		return(() => {
			showSaveNew = false;
		})
	})
</script>



<DialogWrapper
	bind:isOpen={isOpen}
	onChange={() => {
		setTimeout(() => {
			showSaveNew = false;
		}, 200)
	}}
	{header}
	{content}
	size="sm"
	fixedHeight={false}
/>

{#snippet header()}
	<Dialog.Title>
		{#if selectedParam && hasEditedData && !showSaveNew}
			{m.components_input_params_save_dialog_decision_label()}
		{:else}
			{m.components_input_params_save_dialog_label()}
		{/if}
	</Dialog.Title>
{/snippet}

{#snippet content()}
	{#if !selectedParam || showSaveNew}
		<form
			{onsubmit}
			class="p-0.5 pt-0 -mt-1"
		>
			<Label
				for="name"
				class="text-right"
			>
				{m.components_input_params_save_dialog_input_label()}
			</Label>

			<Input
				id="name"
				bind:value={inputValue}
				required
				class=""
			/>

			<Dialog.Footer>
				<Button
					type="submit"
					class="mt-6 w-full"
					onclick={() => showSaveNew = false}
				>
					{m.components_input_params_save_dialog_save_button()}
				</Button>
			</Dialog.Footer>
		</form>
	{/if}


	{#if selectedParam && !showSaveNew}
		<div class="flex flex-col gap-4 mt-2  w-[320px]">
			<Button
				class="w-full"
				onclick={onupdate}
			>
				{m.components_input_params_save_dialog_decision_choice_update()}
			</Button>

			<Button
				class="w-full"
				onclick={() => showSaveNew = true}
			>
				{m.components_input_params_save_dialog_decision_choice_save()}
			</Button>
		</div>
	{/if}
{/snippet}
