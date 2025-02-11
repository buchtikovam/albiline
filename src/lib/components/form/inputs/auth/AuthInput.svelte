<script lang="ts">
	import InputLabel from "$lib/components/form/labels/InputLabel.svelte";
	import {Input} from "$lib/components/ui/input/index.js";

	interface Props {
		label: () => string,
		name: string,
		placeholder?: string,
		value?: string,
	}

	let {
		label,
		name,
		placeholder,
		value = $bindable()
	}: Props = $props();

</script>

<div>
	<InputLabel
		label={label()}
	/>

	<Input
		class="bg-albi-50 h-12 font-bold rounded-lg placeholder:text-albi-300 text-albi-900 border-transparent"
		name={name}
		bind:value
		type="text"
		autocomplete="off"
		required={true}
		placeholder={placeholder}
	/>
</div>
