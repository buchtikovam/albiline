<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from "$lib/components/ui/input";
	import InputDialogSelectWrapper from "$lib/components/form/select/InputDialogSelectWrapper.svelte";
	import InputWrapperText from "$lib/components/form/inputs/InputWrapperText.svelte";
	import * as Dialog from "$lib/components/ui/dialog/index.js";
	import {Separator} from "$lib/components/ui/separator";
	import Plus from "lucide-svelte/icons/plus";
	import X from "lucide-svelte/icons/x";
	import type {
		ColumnFilter,
		InputDialogSelectOption,
		InputDialogType
	} from "$lib/types/components/dialog/inputDialog";
	import StringOperatorSelectWrapper from "$lib/components/form/select/StringOperatorSelectWrapper.svelte";
	import Trash2 from "lucide-svelte/icons/trash-2";
	import ChevronDown from "lucide-svelte/icons/chevron-down";
	import ChevronRight from "lucide-svelte/icons/chevron-right";
	import MoveRight from "lucide-svelte/icons/move-right";
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";

	interface Props {
		open: boolean,
		defaultInputDialog: InputDialogType,
		selectOptions: InputDialogSelectOption[]
	}

	let {
		open = $bindable(),
		defaultInputDialog,
		selectOptions
	}: Props = $props();


	let inputDialog: InputDialogType = $state(defaultInputDialog);

	$inspect(inputDialog.fulltext)

	function addInput() {
		if (inputDialog.columnFilters) {
			inputDialog.columnFilters.push({
				columnName: null,
				type: "text",
				filterModel: {
					operator: null,
					conditions: [{
						type: null,
						value: null
					}]
				}
			})
		}
	}

	function addCondition(columnFilter: ColumnFilter, operator: "OR"|"AND") {
		columnFilter.filterModel.operator = "OR";
		columnFilter.filterModel.conditions.push({
			type: null,
			value: null
		})
	}

	//
	//
	// $inspect(inputs.fulltext);
	// $inspect(inputs.filters);

	$inspect(inputDialog.columnFilters)
</script>



<Dialog.Root bind:open={open}>
	<Dialog.Content class="w-[90%] md:w-[600px] max-w-[800px] max-h-[70%] overflow-auto">
		<Dialog.Header class="">
			<Dialog.Title class="">
				Vstupní parametry
			</Dialog.Title>
		</Dialog.Header>


<!--		<form method="POST" class="overflow-auto h-full flex flex-col">-->
			<div>
				{#if inputDialog.fulltext !== undefined}
					<p
						class="mb-2 text-albi-500 text-sm font-bold"
					>
						Hledat všude
					</p>

					<Input
						type="text"
						bind:value={inputDialog.fulltext}
						placeholder="Id, Název, Město, ..."
						class="border-border "
					/>
				{/if}


				{#if inputDialog.columnFilters !== undefined}
					<p
						class="mt-4 text-albi-500 text-sm font-bold"
					>
						Hledat podle sloupce
					</p>

					{#each inputDialog.columnFilters as columnFilter, i (i)}
						<div
							class={
								columnFilter.filterModel.conditions.length > 1
									? "rounded-lg bg-slate-50 p-2 mt-2 flex flex-col gap-2  "
									: "bg-white p-0 pt-2"
							}
						>
							{#each columnFilter.filterModel.conditions as condition, index (index)}
								<div class="flex gap-1">
									<div class="min-w-[200px]">
										<InputDialogSelectWrapper
											selectOptions={selectOptions}
											bind:columnFilter={inputDialog.columnFilters[i]}
										/>
									</div>

									<ChevronRight class="hidden sm:block min-w-3 max-w-3 text-albi-500 my-auto"/>



									{#if columnFilter.type === "text"}
										<StringOperatorSelectWrapper
											disabled={inputDialog.columnFilters[i].columnName === null}
											bind:condition={inputDialog.columnFilters[i].filterModel.conditions[index]}
										/>

										<ChevronRight class="hidden sm:block min-w-3 max-w-3 text-albi-500 my-auto"/>

										<Input
											disabled={inputDialog.columnFilters[i].columnName === null}
											bind:value={inputDialog.columnFilters[i].filterModel.conditions[index].value}
											type="text"
											class="border border-border w-full"
										/>
									{/if}

									{#if columnFilter.type === "number"}
										.
									{/if}

									{#if columnFilter.type === "boolean"}
										.
									{/if}

									{#if columnFilter.type === "date"}
										.
									{/if}

									{#if columnFilter.type === "enum"}
										.
									{/if}

									<DropdownMenu.Root>
										<DropdownMenu.Trigger
											class="min-w-10 ml-1 flex items-center justify-center border rounded bg-white"
										>
											<ChevronDown
												strokeWidth={3}
												class="w-4 text-albi-500"
											/>
										</DropdownMenu.Trigger>

										<DropdownMenu.Content>
											<DropdownMenu.Group>
												<DropdownMenu.Item
													onclick={() => addCondition(columnFilter, "AND")}
												>
													<Plus class="text-albi-500 size-4" />
													Přidat: A
												</DropdownMenu.Item>

												<DropdownMenu.Item
													onclick={() => addCondition(columnFilter, "OR")}
												>
													<Plus class="text-albi-500 size-4" />
													Přidat: NEBO
												</DropdownMenu.Item>

												<DropdownMenu.Item>
													<Trash2 class="text-red-500 size-4 hover:text-red-700"/>
													Smazat
												</DropdownMenu.Item>
											</DropdownMenu.Group>
										</DropdownMenu.Content>
									</DropdownMenu.Root>

								</div>

							{/each}
						</div>
					{/each}
				{/if}



				<Dialog.Footer class="w-full mt-4">
					<div class="w-full flex justify-between">
						<Button
							onclick={() => open = false}
						>
							Načíst
						</Button>

						{#if inputDialog.columnFilters !== undefined}
							<Button
								onclick={() => addInput()}
								class="size-10"
							>
								<Plus strokeWidth={3} class="text-white"/>
							</Button>
						{/if}

					</div>
				</Dialog.Footer>
			</div>


<!--		</form>-->
	</Dialog.Content>
</Dialog.Root>
