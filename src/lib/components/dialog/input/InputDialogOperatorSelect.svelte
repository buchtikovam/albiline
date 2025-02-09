<script lang="ts">
	import { Button } from "$lib/components/ui/button";
	import { tick } from "svelte";
	import type {
		ColumnFilterModelConditionTypesString, InputDialogOperator
	} from "$lib/types/components/dialog/inputDialog";
	import * as Command from "$lib/components/ui/command";
	import * as Popover from "$lib/components/ui/popover";
	import * as Tooltip from "$lib/components/ui/tooltip";

	interface Props {
		disabled?: boolean;
		operator: ColumnFilterModelConditionTypesString|null,
		operators: InputDialogOperator[],
	}

	let {
		disabled = true,
		operator = $bindable(),
		operators,
	}: Props = $props();


	let open = $state(false);

	let triggerRef = $state<HTMLButtonElement>(null!);

	function closeAndFocusTrigger() {
		open = false;
		tick().then(() => {
			triggerRef.focus();
		});
	}


	let activeItem: InputDialogOperator|null = $state(null);


	$effect(() => {
		activeItem = getItem(operator);
	})


	function getItem(operator: string|null) {
		if (!operator) {
			return null;
		}

		let item = null;

		operators.forEach(op => {
			if (op.field === operator) {
				item = op;
			}
		})

		return item;
	}


	function updateItem(option: InputDialogOperator) {
		operator = option.field;
	}
</script>



<Popover.Root bind:open>
	<Popover.Trigger bind:ref={triggerRef} class="font-normal hover:bg-muted/70 min-w-[40px] p-0">
		{#snippet child({ props })}
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

					<Tooltip.Root>
						<Tooltip.Trigger >
							<Icon class="!size-4"/>
						</Tooltip.Trigger>
						<Tooltip.Content>
							<p>{activeItem?.label}</p>
						</Tooltip.Content>
					</Tooltip.Root>
				{/if}
			</Button>
		{/snippet}
	</Popover.Trigger>


	<Popover.Content side="bottom" class="p-0 w-[180px] max-h-60 h-60">
		<Command.Root>
			<Command.Input placeholder="..." />

			<Command.List>
				<Command.Empty>
					Zde nic není.
				</Command.Empty>


				<Command.Group>
					{#each operators as operator}
						<Command.Item
							value={operator.label}
							onSelect={() => {
								updateItem(operator);
								closeAndFocusTrigger();
							}}
						>
							{@const Icon = operator.icon}

							<Icon />

							{operator.label}
						</Command.Item>
					{/each}
				</Command.Group>
			</Command.List>
		</Command.Root>
	</Popover.Content>
</Popover.Root>

