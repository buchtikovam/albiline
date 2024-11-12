<script lang="ts">
  	import InputLabel from '$lib/components/form/labels/InputLabel.svelte';
	import * as Select from "$lib/components/ui/select/index.js";
	import { getContext } from 'svelte';

	export let value: string = "A";
	export let options: string[] = [];
	export let label;
	export const disable: boolean = false;

	value = value.toUpperCase();
</script>



<div class="w-full flex flex-col">
	<InputLabel label={label} />
	<Select.Root
		disabled={disable}
		selected={{value: value, label: value}}
		onSelectedChange={(v) => {
			v && (value = v.value);
		}}
	>
		<Select.Trigger>
			<Select.Value  />
		</Select.Trigger>

		<Select.Content>
			{#each options as option}
				<Select.Item value={option} label={option} />
			{/each}
		</Select.Content>
	</Select.Root>
</div>
