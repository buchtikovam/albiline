<script lang="ts">
	import {responseDialogMessages} from "$lib/runes/page.svelte.js";
	import {Button} from "$lib/components/ui/button";
	import * as m from "$lib/paraglide/messages.js";
	import Save from "lucide-svelte/icons/save";
	import Upload from "lucide-svelte/icons/upload";
	import type {InputParamsType} from "$lib/types/components/input-params/inputParams";
	import * as Dialog from "$lib/components/ui/dialog";

	interface Props {
		defaultInputParams: InputParamsType;
		inputParams: InputParamsType;
		isLoadedParamChanged: boolean;
		isSaveDialogOpen: boolean;
		isLoadDialogOpen: boolean;
		loadInputParamsInTable: () => void;
	}

	let {
		defaultInputParams,
		inputParams,
		isLoadedParamChanged,
		isSaveDialogOpen = $bindable(),
		isLoadDialogOpen = $bindable(),
		loadInputParamsInTable,
	}: Props = $props();
</script>


<Dialog.Footer class="w-full mt-6">
	<div class="w-full flex justify-between">
		<div>
			<div class="flex gap-1.5 sm:gap-2">
				<Button
					type="button"
					class="size-10"
					variant="secondary"
					onclick={() => {
						if (
							JSON.stringify(defaultInputParams) === JSON.stringify(inputParams) ||
							!isLoadedParamChanged
						) {
							responseDialogMessages.value = [{
								type: "InfoToast",
								title: m.components_input_params_save_fail_info_toast_title(),
								content: m.components_input_params_save_fail_info_toast_content(),
							}]
						} else {
							isSaveDialogOpen = true;
						}
					}}
				>
					<Save
						strokeWidth="2.5"
						class="!size-[18px]"
					/>
				</Button>

				<Button
					type="button"
					class="bg-white size-10"
					variant="secondary"
					onclick={() => isLoadDialogOpen = true}
				>
					<!--{m.components_input_params_button_load_input_params()}-->
					<Upload
						strokeWidth="2.5"
						class="!size-[18px]"
					/>
				</Button>
			</div>
		</div>



		<div class="flex items-center gap-1.5 sm:gap-2">
			<Button
				type="button"
				onclick={loadInputParamsInTable}
			>
				{m.components_input_params_button_filter()}
			</Button>
		</div>
	</div>
</Dialog.Footer>
