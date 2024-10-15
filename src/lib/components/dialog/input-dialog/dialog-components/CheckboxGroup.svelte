<script lang="ts">
	import { Checkbox } from "$lib/components/ui/checkbox/index.js";
	import { Label } from "$lib/components/ui/label/index.js";
	import type { InputCheckboxItem } from '$lib/types/components/form/input-dialog/inputDialog';

	export let items: InputCheckboxItem[];
</script>

<div class="flex flex-col gap-1">
	{#each items as item}
		<div class="flex items-center gap-2">
			<Checkbox
				id={item.id}
				bind:checked={item.checked}
				aria-labelledby={item.id}
				class="flex"
			/>

			<Label
				id={item.id}
				for={item.id}
				class="text-sm font-medium"
			>
				{item.label}
			</Label>
		</div>
	{/each}
</div>
