<script lang="ts">
	import {Input} from "$lib/components/ui/input";
	import * as m from '$lib/paraglide/messages.js'

	interface Props {
		fulltext: string|null;
		handleFulltextChange: (fulltext: string|null) => void;
	}

	let {
		fulltext = $bindable(),
		handleFulltextChange
	}: Props = $props();
</script>




<p class="mb-1 text-albi-500 text-sm font-bold">
	{m.components_input_params_section_fulltext()}
</p>

<Input
	type="text"
	bind:value={fulltext}
	oninput={() => handleFulltextChange(fulltext)}
	placeholder={m.components_input_params_fulltext_placeholder()}
	class="border-slate-300 mb-4"
/>
