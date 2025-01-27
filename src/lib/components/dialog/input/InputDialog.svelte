<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from "$lib/components/ui/input";
	import type {InputDialogFields, InputDialogRequest} from "$lib/types/components/dialog/inputDialog";
	import InputDialogSelectWrapper from "$lib/components/form/select/InputDialogSelectWrapper.svelte";
	import InputWrapperText from "$lib/components/form/inputs/InputWrapperText.svelte";
	import * as Dialog from "$lib/components/ui/dialog/index.js";
	import {Separator} from "$lib/components/ui/separator";
	import Plus from "lucide-svelte/icons/plus";
	import X from "lucide-svelte/icons/x";

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
		fulltext: "Hledání test 123",
		filters: [
			{
				field: "name",
				type: "string",
				filter: {
					operator: "starts-with",
					value: "Albert"
				}
			}
		]
	})


	function addInput() {
		inputs.filters.push({
			field: "",
			type: "string",
			filter: {
				operator: null,
				value: null
			}
		})
	}


	$inspect(inputs.fulltext);
	$inspect(inputs.filters);
</script>



<Dialog.Root bind:open={open}>
	<Dialog.Content class="w-[90%] md:w-[600px] max-w-[800px] max-h-[70%] overflow-auto">
		<Dialog.Header class="">
			<Dialog.Title class="">
				Vstupní parametry
			</Dialog.Title>
		</Dialog.Header>


		<form method="POST" class="overflow-auto h-full flex flex-col">
			<p
				class="mb-2 text-albi-500 text-sm font-bold"
			>
				Hledat všude
			</p>

			<Input
				type="text"
				bind:value={inputs.fulltext}
				placeholder="Id, Název, Město, ..."
				class="border-border "
			/>


			<p
				class="mb-2 mt-4 text-albi-500 text-sm font-bold"
			>
				Hledat podle sloupce
			</p>

			{#each inputs.filters as input, i (i)}
				<div class="flex gap-2">
					<div class="w-full flex pb-2">
						<InputDialogSelectWrapper
							options={fieldOptions}
							bind:item={inputs.filters[i]}
						/>
					</div>

<!--					<button-->
<!--						onclick={() => addInput()}-->
<!--						class="h-10 w-11 bg-white flex justify-center items-center"-->
<!--					>-->
<!--						<X strokeWidth={3} class="size-4 text-albi-500"/>-->
<!--					</button>-->
				</div>


			{/each}


			<Dialog.Footer class="w-full mt-4">
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
