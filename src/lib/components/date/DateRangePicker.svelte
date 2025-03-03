<script lang="ts">
	import {formatDateValueToString} from "$lib/utils/formatting/formatDateValueToString";
	import {parseStringToDateValue} from "$lib/utils/formatting/parseStringToDateValue";
	import {languageTag} from "$lib/paraglide/runtime";
	import {cn} from "$lib/utils";
	import CalendarRange from "lucide-svelte/icons/calendar-range";
	import ChevronRight from "lucide-svelte/icons/chevron-right";
	import ChevronLeft from "lucide-svelte/icons/chevron-left";
	import Portal from "svelte-portal";
	import { type DateRange, DateRangePicker } from "bits-ui";

	interface Props {
		startValue: string;
		endValue: string;
		hasError?: boolean;
		label?: string;
	}

	let {
		startValue = $bindable(),
		endValue = $bindable(),
		hasError,
		label,
	}: Props = $props();


	let value: DateRange = $state({
		start: undefined,
		end: undefined,
	})


	$effect(() => {
		if (startValue) {
			value.start = parseStringToDateValue(startValue);
		}

		if (endValue) {
			value.end = parseStringToDateValue(endValue)
		}
	})



	$effect(() => {
		if (value.start && value.end) {
			startValue = formatDateValueToString(value.start);
			endValue = formatDateValueToString(value.end)
		}
	});
</script>



<DateRangePicker.Root
	bind:value
	weekdayFormat="short"
	fixedWeeks={true}
	locale={languageTag()}
>
	{#if label}
		<DateRangePicker.Label
			class="block select-none text-sm font-medium text-slate-500 mb-0.5"
		>
			{ label }
		</DateRangePicker.Label>
	{/if}


	<div
		class={
			`flex h-10 w-full md:pl-3 sm:pr-2 px-2 py-2 select-none items-center rounded-input border
			${hasError ? "border-red-600" : "border-border"}
			rounded-md bg-background px-2 py-3 text-sm tracking-[0.01em] text-foreground
			focus-within:border-border-input-hover focus-within:shadow-date-field-focus
			hover:border-border-input-hover`
		}
	>
		{#each ["start", "end"] as const as type}
			<DateRangePicker.Input
				class={"flex h-input  h-10  select-none items-center rounded-md  text-sm tracking-[0.01em] text-foreground"}
				{type}
			>
				{#snippet children({ segments })}
					{#each segments as { part, value }}
						<div class="inline-block select-none">
							{#if part === "literal"}
								<DateRangePicker.Segment {part}>
									{value}
								</DateRangePicker.Segment>
							{:else}
								<DateRangePicker.Segment
									{part}
									class="p-0 focus:outline-none focus-visible:bg-muted rounded text-xs md:text-sm"
								>
									{value === "yyyy" ? "rrrr" : value}
								</DateRangePicker.Segment>
							{/if}
						</div>
					{/each}
				{/snippet}
			</DateRangePicker.Input>
			{#if type === "start"}
				<div
					aria-hidden="true"
					class="px-1 text-muted-foreground"
				>
					-
				</div>
			{/if}
		{/each}

		<DateRangePicker.Trigger
			class="ml-auto flex items-center justify-center size-6 sm:size-7 rounded-md transition-all hover:bg-muted/50 text-albi-900 hover:text-black active:bg-dark-10"
		>
			<CalendarRange class="size-4 sm:size-5" />
		</DateRangePicker.Trigger>
	</div>


	<Portal target="body">
		<DateRangePicker.Content
			sideOffset={0}
			class="!z-50 overflow-visible shadow-lg m-6 rounded-lg"
		>
			<DateRangePicker.Calendar
				class="rounded-lg border bg-background p-4"
			>
				{#snippet children({ months, weekdays })}
					<DateRangePicker.Header
						class="flex items-center justify-between"
					>
						<DateRangePicker.PrevButton
							class="size-8 rounded-9px rounded-md text-albi-500 hover:text-albi-700 hover:bg-muted/50"
						>
							<ChevronLeft
								strokeWidth="3"
								class="mx-auto size-4"
							/>
						</DateRangePicker.PrevButton>

						<DateRangePicker.Heading class="text-sm font-bold" />

						<DateRangePicker.NextButton
							class="size-8 rounded-9px rounded-md text-albi-500 hover:text-albi-700 hover:bg-muted/50"
						>
							<ChevronRight
								strokeWidth="3"
								class="mx-auto size-4"
							/>
						</DateRangePicker.NextButton>
					</DateRangePicker.Header>



					<div class="pt-2">

						{#each months as month}
							<DateRangePicker.Grid
								class="w-full select-none"
							>
								<DateRangePicker.GridHead>
									<DateRangePicker.GridRow
										class="mb-1 flex w-full justify-between"
									>
										{#each weekdays as day}
											<DateRangePicker.HeadCell
												class="w-8 rounded-md text-xs !font-normal text-muted-foreground"
											>
												<div>{day.slice(0, 2)}</div>
											</DateRangePicker.HeadCell>
										{/each}
									</DateRangePicker.GridRow>
								</DateRangePicker.GridHead>

								<DateRangePicker.GridBody>
									{#each month.weeks as weekDates}
										<DateRangePicker.GridRow class="flex w-full">
											{#each weekDates as date}
												<DateRangePicker.Cell
													{date}
													month={month.value}
													class="relative size-8 !p-0 text-center text-sm"
												>
													<DateRangePicker.Day
														class={cn(
															`group relative inline-flex size-8 items-center justify-center overflow-visible
															whitespace-nowrap rounded-sm border border-transparent bg-background bg-transparent
															 p-0 text-sm font-normal text-foreground transition-all hover:bg-muted/70
															 focus-visible:!ring-foreground data-[disabled]:pointer-events-none data-[outside-month]:pointer-events-none
															 data-[highlighted]:rounded-none data-[selection-end]:rounded-sm data-[selection-start]:rounded-sm
															 data-[highlighted]:bg-muted/70 data-[selected]:bg-muted data-[selection-end]:bg-albi-500
															 data-[selection-start]:bg-albi-500 data-[selected]:font-medium data-[selection-end]:font-bold
															 data-[selection-start]:font-bold data-[disabled]:text-foreground/30 data-[selected]:text-foreground
															 data-[selection-end]:text-white data-[selection-start]:text-white data-[unavailable]:text-muted-foreground
															 data-[unavailable]:line-through data-[selection-start]:focus-visible:ring-2 data-[selection-start]:focus-visible:!ring-offset-2
															 data-[selected]:[&:not([data-selection-start])]:[&:not([data-selection-end])]:rounded-none
															 data-[selected]:[&:not([data-selection-start])]:[&:not([data-selection-end])]:focus-visible:border-foreground
															 data-[selected]:[&:not([data-selection-start])]:[&:not([data-selection-end])]:focus-visible:!ring-0
															 data-[selected]:[&:not([data-selection-start])]:[&:not([data-selection-end])]:focus-visible:!ring-offset-0`
														)}
													>
														<div
															class="absolute top-[4px] hidden size-1 rounded-full bg-albi-500 transition-all group-data-[today]:block group-data-[selected]:bg-background"
														></div>
														{date.day}
													</DateRangePicker.Day>
												</DateRangePicker.Cell>
											{/each}
										</DateRangePicker.GridRow>
									{/each}
								</DateRangePicker.GridBody>
							</DateRangePicker.Grid>
						{/each}
					</div>
				{/snippet}
			</DateRangePicker.Calendar>
		</DateRangePicker.Content>

	</Portal>
</DateRangePicker.Root>
