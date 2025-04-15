<script lang="ts">
	import { Button } from "$lib/components/ui/button";
	import { stringOperators } from "$lib/definitions/components/input-params/operators/stringOperators";
	import { numberOperators } from "$lib/definitions/components/input-params/operators/numberOperators";
	import { booleanOperators } from "$lib/definitions/components/input-params/operators/booleanOperators";
	import { dateOperators } from "$lib/definitions/components/input-params/operators/dateOperators";
	import { tick } from "svelte";
	import type {
		ConditionTypesBoolean,
		ConditionTypesDate,
		ConditionTypesNumber,
		ConditionTypesText,
		ColumnFilterType,
		InputParamsOperator, ColumnFilter, ColumnFilterModelCondition
	} from "$lib/types/components/input-params/inputParams";
	import Fa from 'svelte-fa'
	import * as Command from "$lib/components/ui/command";
	import * as Popover from "$lib/components/ui/popover";
	import * as Tooltip from "$lib/components/ui/tooltip";
	import {enumOperators} from "$lib/definitions/components/input-params/operators/enumOperators.js";

	interface Props {
		disabled?: boolean;
		columnFilter: ColumnFilter;
		condition: ColumnFilterModelCondition;
		onOperatorChange: (newCondition: ColumnFilterModelCondition) => void;
	}

	let {
		disabled = true,
		columnFilter,
		condition,
		onOperatorChange,  // Add this
	}: Props = $props();


	let open = $state(false);
	let triggerRef = $state<HTMLButtonElement>(null!);


	let operators = $derived.by(() => {
		if (columnFilter.type === "text") return stringOperators;

		if (columnFilter.type === "number") return numberOperators;

		if (columnFilter.type === "boolean") return booleanOperators;

		if (columnFilter.type === "date") return dateOperators;

		if (columnFilter.type === "enum") return enumOperators;

		return stringOperators;
	})


	function closeAndFocusTrigger() {
		open = false;
		tick().then(() => {
			triggerRef.focus();
		});
	}


	let activeItem: InputParamsOperator|null = $state(null);


	$effect(() => {
		activeItem = getItem(condition.type);
	})


	function getItem(operator: string|null) {
		if (!operator) return null;

		let item = null;

		operators.forEach(op => {
			if (op.field === operator) {
				item = op;
			}
		})

		return item;
	}


	function updateItem(option: InputParamsOperator) {
		// Create a NEW condition object instead of mutating
		const newCondition = {
			...condition,
			type: option.field,
			value: condition.value // Preserve existing value
		};

		onOperatorChange(newCondition); // Pass new condition up
	}
</script>



<Popover.Root bind:open>
	<Popover.Trigger
		bind:ref={triggerRef}
		class="font-normal hover:bg-muted/70 min-w-[40px] p-0"
	>
		{#snippet child({ props })}
			<Tooltip.Root>
				<Tooltip.Trigger class="min-w-[40px] p-0">
					<Button
						variant="outline"
						class="min-w-[40px] font-normal hover:bg-muted/50 p-0"
						{...props}
						role="combobox"
						aria-expanded={open}
					>
						{#if activeItem === null}
							<p class="text-slate-300">
								...
							</p>
						{:else}
							{@const Icon = activeItem?.icon}

							<Icon
								strokeWidth={2.5}
								class="!size-[18px] text-albi-900"
							/>

							{#if activeItem?.faIcon}
								<div class="text-albi-900">
									<Fa
										size="xs"
										color="currentColor"
										icon={activeItem.faIcon}
									/>
								</div>
							{/if}
						{/if}
					</Button>
				</Tooltip.Trigger>

				<Tooltip.Content
					class={activeItem?.label() ? "block" : "hidden"}
				>
					<p>{activeItem?.label()}</p>
				</Tooltip.Content>
			</Tooltip.Root>
		{/snippet}
	</Popover.Trigger>


	<Popover.Content
		side="bottom"
		class="p-0 w-[180px] h-fit"
	>
		<Command.Root>
			<Command.Input placeholder="..." />

			<Command.List>
				<Command.Empty>
					Zde nic není.
				</Command.Empty>

				<Command.Group>
					{#each operators as operator}
						{@const Icon = operator.icon}

						<Command.Item
							value={operator.label()}
							onSelect={() => {
								updateItem(operator);
								closeAndFocusTrigger();

							}}
						>
							<Icon
								strokeWidth={2.5}
								class="!size-[18px] text-albi-900"
							/>

							{#if operator.faIcon}
								<div class="ml-0.5 text-albi-900">
									<Fa
										size="xs"
										color="currentColor"
										icon={operator.faIcon}
									/>
								</div>
							{/if}

							{operator.label()}
						</Command.Item>
					{/each}
				</Command.Group>
			</Command.List>
		</Command.Root>
	</Popover.Content>
</Popover.Root>

