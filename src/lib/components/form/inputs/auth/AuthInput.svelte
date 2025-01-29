<script lang="ts">
	import InputLabel from "$lib/components/form/labels/InputLabel.svelte";
	import {Input} from "$lib/components/ui/input/index.js";

	interface Props {
		label: () => string,
		name: string,
		placeholder?: string,
	}

	let {
		label,
		name,
		placeholder
	}: Props = $props();

</script>

<div>
	<InputLabel
		label={label()}
	/>

	<Input
		class="bg-albi-50 h-12 font-bold rounded-lg placeholder:text-albi-300 text-albi-900"
		name={name}
		type="text"
		autocomplete="off"
		required={true}
		placeholder={placeholder}
	/>
</div>
