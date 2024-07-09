<script lang="ts">
	import type { DateValue } from '@internationalized/date';
	import { flyAndScale } from '$lib/utils';
	import ChevronLeft from 'lucide-svelte/icons/chevron-left';
	import ChevronRight from 'lucide-svelte/icons/chevron-right';
	import CalendarRange from 'lucide-svelte/icons/calendar-range';
	import { DatePicker } from 'bits-ui';

	/*
		Kalendář s inputem a popoverem pro výběr datumu
	*/

	export let dateValue: Date|undefined;
	export let label: string;

	let value: DateValue|undefined;

	$: if (value) {
		dateValue = new Date(value.year, value.month, value.day)
	}
</script>



<DatePicker.Root
	weekdayFormat="short"
	fixedWeeks={true}
	weekStartsOn={1}
	bind:value={value}
	locale="cz"
>
	<div class="flex w-full max-w-[220px] flex-col gap-0.5">
		<DatePicker.Label class="block select-none text-sm font-medium">
			{ label }
		</DatePicker.Label>


		<DatePicker.Input
			let:segments
			class="flex h-input w-full max-w-[220px] h-10 select-none items-center rounded-md border border-border-input bg-background px-2 py-2 text-sm tracking-[0.01em] text-foreground"
		>
			{#each segments as { part, value }}
				<div class="inline-block select-none">
					{#if part === "literal"}
						<DatePicker.Segment {part} class="">
							{value}
						</DatePicker.Segment>
					{:else}
						<DatePicker.Segment
							{part}
							class="p-1 focus:outline-none focus-visible:bg-muted rounded"
						>
							{value === "yyyy" ? "rrrr" : value}
						</DatePicker.Segment>
					{/if}
				</div>
			{/each}

			<DatePicker.Trigger
				class="ml-auto inline-flex size-8 items-center justify-center rounded-[5px] text-foreground/60 transition-all hover:bg-muted active:bg-dark-10">
				<CalendarRange />
			</DatePicker.Trigger>
		</DatePicker.Input>


		<DatePicker.Content
			sideOffset={6}
			transition={flyAndScale}
			transitionConfig={{ duration: 150, y: -8 }}
			class="z-50"
		>
			<DatePicker.Calendar
				class="rounded-lg border bg-background p-4"
				let:months
				let:weekdays
			>
				<DatePicker.Header class="flex items-center justify-between">
					<DatePicker.PrevButton
						class="size-10 rounded-9px rounded-md text-muted-foreground hover:bg-muted/50 hover:text-black">
						<ChevronLeft class="mx-auto" />
					</DatePicker.PrevButton>

					<DatePicker.Heading class="font-medium" />

					<DatePicker.NextButton
						class="size-10 rounded-9px rounded-md text-muted-foreground hover:bg-muted/50 hover:text-black">
						<ChevronRight class="mx-auto" />
					</DatePicker.NextButton>
				</DatePicker.Header>

				<div class="pt-4">
					{#each months as month}
						<DatePicker.Grid
							class="w-full select-none"
						>
							<DatePicker.GridHead>
								<DatePicker.GridRow class="mb-1 flex w-full justify-between">
									{#each weekdays as day}
										<DatePicker.HeadCell
											class="w-10 rounded-md text-xs !font-normal text-muted-foreground"
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
												class="relative size-10 !p-0 text-center text-sm"
											>
												<DatePicker.Day
													{date}
													month={month.value}
													class="inline-flex size-10 items-center justify-center rounded-md border border-transparent bg-transparent text-sm hover:bg-muted data-[disabled]:pointer-events-none data-[outside-month]:pointer-events-none data-[selected]:bg-albi-500 data-[selected]:font-medium data-[disabled]:text-foreground/30 data-[selected]:text-background data-[unavailable]:text-muted-foreground data-[unavailable]:line-through"
												>
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
			</DatePicker.Calendar>
		</DatePicker.Content>
	</div>
</DatePicker.Root>
