<script lang="ts">
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';

	export let value: string = '';
	export let id: string;
	export let label: string = 'Input';
	export let type;
</script>

<div>
	<Label for={id} class="text-right">
		{ label }
	</Label>
	<Input
		id={ id }
		bind:value
		type={type === "number" ? "number" : "text"}
		required
		class="focus-visible:ring-0 w-[220px]"
	/>
</div>
