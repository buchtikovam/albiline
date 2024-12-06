<script lang="ts">
  	import InputLabel from '$lib/components/form/labels/InputLabel.svelte';
	import * as Select from "$lib/components/ui/select/index.js";
	import { getContext } from 'svelte';
	import { addToEditedFormData } from '$lib/utils/addToEditedFormData';

	export const disable: boolean = false;
	interface Props {
		value?: string;
		options?: string[];
		label: any;
		field: string;
	}

	let {
		value = $bindable("A"),
		options = [],
		label,
		field
	}: Props = $props();

	const initialValue = value; // check if this works
	// value = value.toUpperCase();
</script>



<div class="w-full flex flex-col">
	<InputLabel label={label} />
	<Select.Root
		disabled={disable}
		selected={{value: value, label: value}}
		onSelectedChange={(v) => {
			v && (value = v.value);
			addToEditedFormData(initialValue, field, value);
		}}
	>
		<Select.Trigger>
			<Select.Value />
		</Select.Trigger>

		<Select.Content>
			{#each options as option}
				<Select.Item value={option} label={option} />
			{/each}
		</Select.Content>
	</Select.Root>
</div>
