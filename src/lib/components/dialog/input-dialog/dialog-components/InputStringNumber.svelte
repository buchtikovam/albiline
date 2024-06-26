<script lang="ts">
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import type { DialogNumber, DialogString } from '$lib/types/input-dialog/inputDialog';

	export let item: DialogString | DialogNumber;
	export let value: string | number;
</script>

<div>
	<Label for={item.id} class="text-right">
		{item.label}
	</Label>
	<Input
		id={item.id}
		bind:value
		type={item.type}
		required
		class="focus-visible:ring-0 w-[220px]"
	/>
</div>
