<script lang="ts">
	import { Label } from "$lib/components/ui/label";
	import * as RadioGroup from "$lib/components/ui/radio-group";
	import type { DialogRadioGroup } from '$lib/types/input-dialog/inputDialog';

	export let item: DialogRadioGroup;

</script>

<RadioGroup.Root value={item.defaultValue}>
	{#each item.children as child}
		<div class="flex items-center space-x-2">
			<RadioGroup.Item value={child.id} id={child.id} />
			<Label for={child.id}>{child.label}</Label>
		</div>
	{/each}
</RadioGroup.Root>

<!--TODO: return value -->
