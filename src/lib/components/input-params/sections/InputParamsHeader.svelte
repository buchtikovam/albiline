<script lang="ts">
	import * as m from "$lib/paraglide/messages.js";
	import {isMobile} from "$lib/runes/page.svelte.js";
	import Pencil from "lucide-svelte/icons/pencil";
	import RefreshCcw from "lucide-svelte/icons/refresh-ccw";
	import Check from "lucide-svelte/icons/check";
	import type {FetchedInputParam} from "$lib/types/components/input-params/inputParams";

	interface Props {
	    selectedParam: FetchedInputParam|undefined;
		editedLabel: string;
		isLoadedParamChanged: boolean;
	}

	let {
	    selectedParam,
		editedLabel = $bindable(),
		isLoadedParamChanged,
	}: Props = $props();


	let editLabel = $state(false);
</script>




<div class="flex gap-1 items-center overflow-visible">
	{ m.components_input_params_label() }

	{#if selectedParam}
		{#if !editLabel}
			<div
				class={`${isMobile.value ? "hidden" : "flex"} gap-2 items-center`}
			>
				<p
					class={`${isLoadedParamChanged ? "text-slate-300" : "text-albi-950"} transition-all`}
				>
					({editedLabel.length > 0 ? editedLabel : selectedParam.paramName})
				</p>

				<button
					onclick={() => editLabel = !editLabel}
				>
					<Pencil
						strokeWidth={2.5}
						class="size-4 text-albi-500"
					/>
				</button>
			</div>
		{:else}
			<div
				class={`${isMobile.value ? "hidden" : "flex"} gap-2 items-center`}
			>
				<input
					onblur={(e: FocusEvent) => editLabel = !editLabel}
					onkeyup={(e: KeyboardEvent) => {
							if (e.key === 'Enter') {
							  e.preventDefault();
							  e.currentTarget?.blur();  // Safer than target (guaranteed to be input element)
							}
						 }}
					bind:value={editedLabel}
					class="w-fit py-1 px-1 h-[20px] border bg-slate-50 rounded-md"
				/>
			</div>

			<button
				onclick={() => editLabel = !editLabel}
			>
				<Check
					strokeWidth={3}
					class="size-4 text-albi-500"
				/>
			</button>
		{/if}
	{/if}
</div>



<button
	class={`hidden`}
>
	<RefreshCcw
		strokeWidth={2.5}
		class="size-4 text-albi-500"/>
</button>
