<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from "$lib/components/ui/input";
	import type {InputDialogFields, InputDialogRequest} from "$lib/types/components/dialog/inputDialog";
	import InputDialogSelectWrapper from "$lib/components/form/select/InputDialogSelectWrapper.svelte";
	import InputWrapperText from "$lib/components/form/inputs/InputWrapperText.svelte";
	import * as Dialog from "$lib/components/ui/dialog/index.js";
	import {Separator} from "$lib/components/ui/separator";
	import Plus from "lucide-svelte/icons/plus";

	let { open = $bindable() }: { open: boolean } = $props();

	let fieldOptions: InputDialogFields = [
		{
			field: "name",
			label: "Prodejna",
			type: "string",
		},
		{
			field: "customerAddressCode",
			label: "Id prodejny",
			type: "number",
		},
	]

	let inputs: InputDialogRequest = $state({
		fulltext: null,
		filters: [
			{
				field: null,
				conditions: [
					{
						type: null,
						value: null
					}
				],
				operators: null,
			}
		]
	})


	function addInput() {
		inputs.filters.push({
			field: null,
			conditions: [
				{
					type: null,
					value: null
				}
			],
			operators: null,
		})
	}

	$inspect(inputs.fulltext);
	$inspect(inputs.filters);
</script>



<Dialog.Root bind:open={open}>
	<Dialog.Content class="w-[600px] max-w-[600px] max-h-[70%] overflow-auto">
		<Dialog.Header class="">
			<Dialog.Title class="">
				Vstupní parametry
			</Dialog.Title>
		</Dialog.Header>


		<form method="POST" class="overflow-auto h-full flex flex-col">
			<Input
				type="text"
				bind:value={inputs.fulltext}
				placeholder="Id, Název, Město, ..."
				class="border-border mb-4"
			/>

<!--			<Separator class="my-2 h-[1px]"/>-->

			{#each inputs.filters as input, i (i)}
				<div class="w-full mb-2">
					<InputDialogSelectWrapper
						options={fieldOptions}
						bind:activeItem={inputs.filters[i]}
					/>
				</div>
			{/each}


			<Dialog.Footer class="w-full mt-2">
				<div class="w-full flex justify-between">
					<Button
						onclick={() => open = false}
					>
						Načíst
					</Button>

					<Button
						onclick={() => addInput()}
						class="size-10"
					>
						<Plus strokeWidth={3} class="text-white"/>
					</Button>
				</div>
			</Dialog.Footer>
		</form>
	</Dialog.Content>
</Dialog.Root>
