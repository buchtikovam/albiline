<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from "$lib/components/ui/input";
	import Plus from "lucide-svelte/icons/plus";
	import type {
		InputDialogType,
		InputDialogSelectOption,
		ColumnFilter,
		ColumnFilterModelCondition
	} from "$lib/types/components/dialog/inputDialog";
	import InputDialogColumnFilterRowWrapper from "$lib/components/dialog/input/column-filters/InputDialogColumnFilterWrapper.svelte";
	import * as Dialog from "$lib/components/ui/dialog/index.js";
	import * as Popover from "$lib/components/ui/popover/index.js";


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
	let fulltextFilter: string|null|undefined = $state(inputDialog.fulltext);
	let columnFilters = $state(inputDialog.columnFilters);


	function addInput() {
		if (columnFilters) {
			let lastIndex = 0;

			columnFilters.length > 0
				? lastIndex = columnFilters[columnFilters.length - 1].id
				: lastIndex = 0;

			columnFilters.push({
				id: lastIndex + 1,
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


	function getColumnFilters() {
		const cleanedColumnFilters: ColumnFilter[] = [];

		columnFilters?.forEach((columnFilter) => {
			if (
				columnFilter.filterModel.conditions.length > 0 &&
				columnFilter.columnName !== null
			) {
				let cleanedConditions: ColumnFilterModelCondition[] = [];

				if (columnFilter.type === "text") {
					columnFilter.filterModel.conditions.forEach((condition) => {
						if (
							condition.type !== null &&
							condition.value !== null &&
							condition.value !== ""
						) {
							cleanedConditions.push(condition);
						}
					})
				}

				if (columnFilter.type === "number") {
					columnFilter.filterModel.conditions.forEach((condition) => {
						if (
							condition.type !== null &&
							condition.type !== "between" &&
							condition.value !== null
						) {
							cleanedConditions.push(condition);
						}

						if (condition.type === "between" && condition.endValue) {
							cleanedConditions.push(condition);
						}
					})
				}

				if (columnFilter.type === "boolean") {
					columnFilter.filterModel.conditions.forEach((condition) => {
						if (condition.type !== null) {
							const cleanCondition = condition;
							cleanCondition.value = condition.type === "true";
							cleanedConditions.push(cleanCondition);
						}
					})
				}

				if (columnFilter.type === "date") {
					columnFilter.filterModel.conditions.forEach((condition) => {
						if (condition.type !== null && condition.value) {
							cleanedConditions.push(condition);
						}
					})
				}

				if (cleanedConditions.length > 0) {
					let cleanedColumnFilter = columnFilter;

					if (cleanedConditions.length === 1) {
						cleanedColumnFilter.filterModel.operator = null;
					}

					cleanedColumnFilter.filterModel.conditions = cleanedConditions;
					cleanedColumnFilters.push(cleanedColumnFilter);
				}
			}
		})

		return cleanedColumnFilters;
	}


	function postInputParams() {
		let inputParamObj: InputDialogType = {
			fulltext: fulltextFilter,
			inputs: [],
			columnFilters: getColumnFilters(),
		}

		console.log(JSON.stringify(inputParamObj, null, 2));
	}

	$inspect(JSON.stringify(columnFilters, null, 2));
</script>



<Dialog.Root bind:open={open}>
	<Dialog.Content class="w-[90%] md:w-[720px] max-w-[720px] max-h-[70%] overflow-auto z-50">
		<Dialog.Header class="">
			<Dialog.Title class="">
				Vstupní parametry
			</Dialog.Title>
		</Dialog.Header>


		<div>
			{#if inputDialog.fulltext !== undefined}
				<p
					class="mb-2 text-albi-500 text-sm font-bold"
				>
					Hledat všude
				</p>

				<Input
					type="text"
					bind:value={fulltextFilter}
					placeholder="Id, Název, Město, ..."
					class="border-border mb-4"
				/>
			{/if}


			{#if columnFilters !== undefined}
				<p
					class="text-albi-500 text-sm font-bold "
				>
					Hledat podle sloupce
				</p>

				{#each columnFilters as columnFilter, i (columnFilter.id)}
					<div
						class={
							columnFilter.filterModel.conditions.length > 1
								? "rounded-lg border bg-slate-50 p-2 flex flex-col mt-2 "
								: "bg-white p-0"
						}
					>
						{#if columnFilter.filterModel.conditions.length > 1}
							<p class="text-xs font-bold text-slate-400">
								{columnFilter.filterModel.operator}
							</p>
						{/if}

						<InputDialogColumnFilterRowWrapper
							selectOptions={selectOptions}
							bind:columnFilter={columnFilters[columnFilter.id]}
						/>
					</div>
				{/each}
			{/if}


			<Dialog.Footer class="w-full mt-4">
				<div class="w-full flex justify-between">
					<Button
						type="button"
						onclick={postInputParams}
					>
						Načíst
					</Button>

					{#if columnFilters !== undefined}
						<Button
							type="button"
							onclick={() => addInput()}
							class="size-10"
						>
							<Plus strokeWidth={3} class="text-white"/>
						</Button>
					{/if}
				</div>
			</Dialog.Footer>
		</div>
	</Dialog.Content>
</Dialog.Root>

