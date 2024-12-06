<script lang="ts">
	import InputLabel from '$lib/components/form/labels/InputLabel.svelte';
	import * as Select from "$lib/components/ui/select/index.js";

	interface Props {
		value: string;
		options: string[];
		label: any;
	}

	let { value = $bindable(), options, label }: Props = $props();

	value = value.toUpperCase();
</script>



<div class="w-full flex flex-col">
	<InputLabel label={label} />
	<Select.Root
		selected={{value: value, label: value}}
		onSelectedChange={(v) => {
			v && (value = v.value);
		}}
	>
		<Select.Trigger class="focus-visible:ring-0 focus:ring-0">
			<Select.Value  />
		</Select.Trigger>

		<Select.Content>
			{#each options as option}
				<Select.Item value={option} label={option} />
			{/each}
		</Select.Content>
	</Select.Root>
</div>
