<script lang="ts">
	import {formatDateValueToString} from "$lib/utils/formatting/formatDateValueToString";
	import {parseStringToDateValue} from "$lib/utils/formatting/parseStringToDateValue";
	import {languageTag} from '$lib/paraglide/runtime.js'
	import ChevronLeft from 'lucide-svelte/icons/chevron-left';
	import ChevronRight from 'lucide-svelte/icons/chevron-right';
	import CalendarRange from 'lucide-svelte/icons/calendar-range';
	import Portal from "svelte-portal";
	import {type DateValue} from '@internationalized/date';
	import { DatePicker } from 'bits-ui';
	import InputLabelWithContext from "$lib/components/form/labels/InputLabelWithContext.svelte";

	interface Props {
		dateValue?: string;
		hasError?: boolean;
		label?: string;
		field?: string;
		onchange?: () => void;
	}

	let {
		dateValue = $bindable(),
		hasError,
		label,
		field,
	}: Props = $props();


	let value: DateValue|undefined = $state();


	$effect(() => {
		if (dateValue) {
			value = parseStringToDateValue(dateValue);
		} else {
			value = undefined;
		}
	})


	$effect(() => {
		if (value) {
			dateValue = formatDateValueToString(value);
		}
	});
</script>



<DatePicker.Root
	weekdayFormat="short"
	fixedWeeks={true}
	weekStartsOn={1}
	disabled={false}
	bind:value={value}
	locale={languageTag()}
>
	<div class="flex w-full flex-col">
		{#if label}
			<InputLabelWithContext
				contextMenuField={field}
				{label}
			/>
		{/if}


		<DatePicker.Input
			class={(hasError ? "border-red-600" : "") + " flex h-input w-full h-10 select-none items-center rounded-md border border-slate-300 bg-background sm:pl-3 sm:pr-2 px-2 py-2 text-sm tracking-[0.01em] text-foreground"}
		>
			{#snippet children({ segments })}
				{#each segments as { part, value }}
					<div class="inline-block select-none">
						{#if part === "literal"}
							<DatePicker.Segment {part} class="">
								{value}
							</DatePicker.Segment>
						{:else}
							<DatePicker.Segment
								{part}
								class="p-0 focus:outline-none focus-visible:bg-muted rounded text-sm"
							>
								{value === "yyyy" ? "rrrr" : value}
							</DatePicker.Segment>
						{/if}
					</div>
				{/each}

				<DatePicker.Trigger
					class="ml-auto flex items-center justify-center size-7 rounded-md transition-all hover:bg-muted/50 text-albi-900 hover:text-black active:bg-dark-10"
				>
					<CalendarRange class="size-5" />
				</DatePicker.Trigger>
			{/snippet}
		</DatePicker.Input>



		<Portal target="body">
			<DatePicker.Content
				sideOffset={0}
				class="!z-50 overflow-visible shadow-lg m-6 rounded-lg"
			>
				<DatePicker.Calendar
					class="rounded-lg border bg-background p-4"
				>
					{#snippet children({ months, weekdays })}
						<DatePicker.Header
							class="flex items-center justify-between"
						>
							<DatePicker.PrevButton
								class="size-8 rounded-9px rounded-md text-albi-500 hover:text-albi-700 hover:bg-muted/50"
							>
								<ChevronLeft
									strokeWidth="3"
									class="mx-auto size-4"
								/>
							</DatePicker.PrevButton>

							<DatePicker.Heading class="text-sm font-bold" />

							<DatePicker.NextButton
								class="size-8 rounded-9px rounded-md text-albi-500 hover:text-albi-700 hover:bg-muted/50"
							>
								<ChevronRight
									strokeWidth="3"
									class="mx-auto size-4"
								/>
							</DatePicker.NextButton>
						</DatePicker.Header>



						<div class="pt-2">
							{#each months as month}
								<DatePicker.Grid
									class="w-full select-none"
								>
									<DatePicker.GridHead>
										<DatePicker.GridRow
											class="mb-1 flex w-full justify-between"
										>
											{#each weekdays as day}
												<DatePicker.HeadCell
													class="w-8 rounded-md text-xs !font-normal text-muted-foreground"
												>
													<div>{day.slice(0, 2)}</div>
												</DatePicker.HeadCell>
											{/each}
										</DatePicker.GridRow>
									</DatePicker.GridHead>

									<DatePicker.GridBody>
										{#each month.weeks as weekDates}
											<DatePicker.GridRow class="flex w-full">
												{#each weekDates as date}
													<DatePicker.Cell
														{date}
														month={month.value}
														class="relative size-8 !p-0 text-center text-sm"
													>
														<DatePicker.Day
															class={
																`group relative inline-flex size-8 items-center justify-center whitespace-nowrap
																rounded-sm border border-transparent bg-transparent p-0 text-sm font-normal text-foreground
																transition-all hover:bg-muted/70 hover:text-black data-[disabled]:pointer-events-none data-[outside-month]:pointer-events-none
																data-[selected]:bg-albi-500 data-[selected]:font-bold data-[disabled]:text-foreground/30
																data-[selected]:text-white data-[unavailable]:text-muted-foreground data-[unavailable]:line-through`
															}
														>
															<div
																class="absolute top-[4px] hidden size-1 rounded-full bg-albi-500 transition-all group-data-[today]:block group-data-[selected]:bg-background"
															></div>
															{date.day}
														</DatePicker.Day>
													</DatePicker.Cell>
												{/each}
											</DatePicker.GridRow>
										{/each}
									</DatePicker.GridBody>
								</DatePicker.Grid>
							{/each}
						</div>
					{/snippet}
				</DatePicker.Calendar>
			</DatePicker.Content>
		</Portal>

	</div>
</DatePicker.Root>
