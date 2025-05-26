<script lang="ts">
	import {Checkbox} from "$lib/components/ui/checkbox/index.js";
	import type {InputParamsInput} from "$lib/types/components/input-params/inputParams";
	import InputLabelWithContext from "$lib/components/form/labels/InputLabelWithContext.svelte";
	import deepcopy from "deepcopy";
	import DatePicker from "$lib/components/date/DatePicker.svelte";
	import {Input} from "$lib/components/ui/input";

	interface Props {
		initialInputs: InputParamsInput[];
		inputs: InputParamsInput[];
		onInputsChange: (updatedInputs: InputParamsInput[]) => void;
	}

	const {
		initialInputs,
		inputs,
		onInputsChange
	}: Props = $props();


	// Reactive state with deep equality check
	let allInputs: InputParamsInput[] = $state(deepcopy(initialInputs));
	let isUpdating = $state(false);


	// Updated to handle multiple value types
	function handleInputChange(index: number, newValue: any) {
		isUpdating = true;

		const updatedInputs = allInputs.map((input, i) =>
			i === index ? { ...input, value: newValue } : input
		);

		// if (!isEqual(updatedInputs, allInputs)) {
			allInputs = updatedInputs;
			onInputsChange(deepcopy(updatedInputs));
		// }

		isUpdating = false;
	}
</script>




<p class="mb-1.5 text-albi-500 text-sm font-bold">
	Hledat podle parametrů
</p>

<div class="mb-4 grid grid-cols-2 gap-x-2">
	{#each allInputs as paramInput, i}
		<div class="mb-3">
			{#if paramInput.type === "text"}
				<div>
					<InputLabelWithContext
						contextMenuField={paramInput.field}
						label={paramInput.label()}
					/>

					<Input
						bind:value={paramInput.value}
						type="text"
						onchange={() => handleInputChange(i, paramInput.value)}
					/>
				</div>
			{/if}

			{#if paramInput.type === "number"}
				<div>
					<InputLabelWithContext
						contextMenuField={paramInput.field}
						label={paramInput.label()}
					/>

					<Input
						bind:value={paramInput.value}
						type="number"
						onchange={() => handleInputChange(i, paramInput.value)}
					/>
				</div>
			{/if}

			{#if paramInput.type === "date"}
				<DatePicker
					hasError={false}
					bind:dateValue={paramInput.value}
					label={paramInput.label()}
					field={paramInput.field}
					onchange={() => handleInputChange(i, paramInput.value.split(" ")[0])}
				/>
			{/if}

			{#if paramInput.type === 'boolean'}
				<div class="flex items-center  gap-2">
					<Checkbox
						class="focus-visible:border-albi-500"
						checked={paramInput.value}
						onCheckedChange={(e) => handleInputChange(i, e)}
					/>
					{#if paramInput.label}
						<InputLabelWithContext
							contextMenuField={paramInput.field}
							label={paramInput.label()}
						/>
					{/if}
				</div>
			{/if}
		</div>
	{/each}
</div>
