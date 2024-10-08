<script lang="ts">
	import { Field, Control, FieldErrors } from "formsnap";
  	import InputLabel from '$lib/components/label/InputLabel.svelte';
	import Input from "$lib/components/ui/input/input.svelte";
	import * as Select from "$lib/components/ui/select/index.js";
	import { paymentTypeCode } from '$lib/constants/detailConstants';

	paymentTypeCode

	export let value: string;
	value = value.toUpperCase();
	export let options: string[];
	export let form;
	export let name;
	export let label;
</script>



<div class="w-full flex flex-col">
	<Field {form} name={name}>
		<Control let:attrs>
			<div class="w-full">
				<InputLabel name={label} />
				<Select.Root
					selected={{value: value, label: value}}
					onSelectedChange={(v) => {
          				v && (value = v.value);
      				}}
				>
					<Select.Trigger {...attrs} class="focus-visible:ring-0 focus:ring-0">
						<Select.Value  />
					</Select.Trigger>

					<Select.Content>
						{#each options as option}
							<Select.Item value={option} label={option} />
						{/each}
					</Select.Content>
				</Select.Root>
			</div>
<!--			<input hidden bind:value={value} name={attrs.name} />-->
		</Control>
		<FieldErrors />
	</Field>
</div>
