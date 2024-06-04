<script lang="ts">
	import { DatePicker } from 'bits-ui';
	import { flyAndScale } from '$lib/utils';
	import ChevronLeft from 'lucide-svelte/icons/chevron-left';
	import ChevronRight from 'lucide-svelte/icons/chevron-right';
	import CalendarRange from 'lucide-svelte/icons/calendar-range';
	import type { DateValue } from '@internationalized/date';

	function arrangeSegments(segments) {
		let temp = segments[0];
		segments[0] = segments[2];
		segments[2] = temp;
		return '';
	}

	let value: DateValue | undefined = undefined;
	// console.log(value);
	// TODO: pass value to parent (+page.svelte)


	export let name;
</script>

<DatePicker.Root weekdayFormat="short" fixedWeeks={true} weekStartsOn={1} bind:value >
	<div class="flex w-full max-w-[232px] flex-col gap-0.5">
		<DatePicker.Label class="block select-none text-sm font-medium">
			{name}
		</DatePicker.Label>

		<DatePicker.Input
			let:segments
			class="flex h-input w-full max-w-[232px] select-none items-center rounded-md border border-border-input bg-background px-2 py-2 text-sm tracking-[0.01em] text-foreground "
			on:input={() => console.log(value)}
		>
			{arrangeSegments(segments)}

			{#each segments as { part, value }}
				<div class="inline-block select-none">
					{#if part === "literal"}
						<DatePicker.Segment {part} class="p-0.5">
							{value}
						</DatePicker.Segment>
					{:else}
						<DatePicker.Segment
							{part}
							class="p-1 focus:outline-none focus-visible:bg-muted rounded"
						>
							{value}
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
				class="rounded-[15px] border border-dark-10 bg-background-alt p-[22px] shadow-popover"
				let:months
				let:weekdays
			>
				<DatePicker.Header class="flex items-center justify-between">
					<DatePicker.PrevButton
						class="inline-flex size-10 items-center justify-center rounded-9px bg-background-alt transition-all hover:bg-muted active:scale-98">
						<ChevronLeft />
					</DatePicker.PrevButton>

					<DatePicker.Heading class="text-[15px] font-medium" />

					<DatePicker.NextButton
						class="inline-flex size-10 items-center justify-center rounded-9px bg-background-alt transition-all hover:bg-muted active:scale-98">
						<ChevronRight />
					</DatePicker.NextButton>
				</DatePicker.Header>

				<div
					class="flex flex-col space-y-4 pt-4 sm:flex-row sm:space-x-4 sm:space-y-0"
				>
					{#each months as month}
						<DatePicker.Grid
							class="w-full border-collapse select-none space-y-1"
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
													class="group relative inline-flex size-10 items-center justify-center whitespace-nowrap rounded-9px border border-transparent bg-transparent p-0 text-sm font-normal text-foreground transition-all hover:border-foreground data-[disabled]:pointer-events-none data-[outside-month]:pointer-events-none data-[selected]:bg-foreground data-[selected]:font-medium data-[disabled]:text-foreground/30 data-[selected]:text-background data-[unavailable]:text-muted-foreground data-[unavailable]:line-through"
												>
													<div
														class="absolute top-[5px] hidden size-1 rounded-full bg-foreground transition-all group-data-[today]:block group-data-[selected]:bg-background"
													/>
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
