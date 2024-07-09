<script lang="ts">
	import { Label } from "$lib/components/ui/label";
	import type { DialogRadioGroup } from '$lib/types/input-dialog/inputDialog';
	import * as RadioGroup from "$lib/components/ui/radio-group";

	export let item: DialogRadioGroup;
</script>

<RadioGroup.Root bind:value={item.checkedValue}>
	{#each item.children as child}
		<div class="flex items-center space-x-2">
			<RadioGroup.Item value={child.id} id={child.id} />
			<Label for={child.id}>
				{child.label}
			</Label>
		</div>
	{/each}
</RadioGroup.Root>
