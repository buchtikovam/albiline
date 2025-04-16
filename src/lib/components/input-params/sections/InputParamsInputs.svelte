<script lang="ts">
	import {Checkbox} from "$lib/components/ui/checkbox/index.js";
	import {isEqual} from "lodash-es";
	import type {InputParamsInput} from "$lib/types/components/input-params/inputParams";
	import InputLabelWithContext from "$lib/components/form/labels/InputLabelWithContext.svelte";
	import deepcopy from "deepcopy";

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


	// One-time merge on component initialization
	$effect(() => {
		const merged= initialInputs.map(initial => {
			const loaded = inputs?.find(i => i.field === initial.field);
			return loaded ? { ...initial, value: loaded.value } : initial;
		});

		if (!isEqual(merged, allInputs)) {
			allInputs = merged;
		}
	});


	// Handle external input changes with deep comparison
	$effect(() => {
		if (isUpdating || !inputs) return;

		const merged = initialInputs.map(initial => {
			const loaded = inputs.find(i => i.field === initial.field);
			return loaded ? { ...initial, value: loaded.value } : initial;
		});

		if (!isEqual(merged, allInputs)) {
			allInputs = merged;
		}
	});


	// Handle local changes with proper immutability
	function handleInputChange(index: number, newValue: boolean) {
		isUpdating = true;

		// Create a new array with updated value
		const updatedInputs = allInputs.map((input, i) =>
			i === index ? { ...input, value: newValue } : input
		);

		// Update local state only if changed
		if (!isEqual(updatedInputs, allInputs)) {
			allInputs = updatedInputs;
			onInputsChange(deepcopy(updatedInputs));
		}

		isUpdating = false;
	}
</script>




<p class="mb-1.5 text-albi-500 text-sm font-bold">
	Hledat podle parametrů
</p>

<div class="mb-4">
	{#each allInputs as paramInput, i}
		<div class="mb-3">
			{#if paramInput.type === 'boolean'}
				<div class="flex items-center gap-2">
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
