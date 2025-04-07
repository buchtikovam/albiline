<script lang="ts">
	import {Checkbox} from "$lib/components/ui/checkbox/index.js";
	import type {InputParamsType} from "$lib/types/components/input-params/inputParams";
	import InputLabelWithContext from "$lib/components/form/labels/InputLabelWithContext.svelte";

	interface Props {
		defaultInputParams: InputParamsType;
		inputParams: InputParamsType;
	}

	let {
		defaultInputParams,
		inputParams = $bindable()
	}: Props = $props();
</script>



<p class="mb-2 text-albi-500 text-sm font-bold">
	Hledat podle parametrů
</p>

<div class="mb-4">
	{#if defaultInputParams?.inputs && inputParams.inputs}
		{#each defaultInputParams.inputs as paramInput, i}
			{#if paramInput.type === "boolean"}
				<div class="flex items-center gap-2">
					<Checkbox
						class={"focus-visible:border-albi-500"}
						bind:checked={inputParams.inputs[i].value}
					/>

					<InputLabelWithContext
						contextMenuField={paramInput.field}
						label={paramInput.label()}
					/>
				</div>
			{/if}
		{/each}
	{/if}
</div>
