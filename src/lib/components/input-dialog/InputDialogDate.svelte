<script lang="ts">
	import CalendarIcon from 'lucide-svelte/icons/calendar';
	import {
		DateFormatter,
		type DateValue,
		getLocalTimeZone
	} from '@internationalized/date';
	import { cn } from '$lib/utils.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Calendar } from '$lib/components/ui/calendar/index.js';
	import * as Popover from '$lib/components/ui/popover/index.js';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { onMount } from 'svelte';
	import { Label } from '$lib/components/ui/label';

	let dialogOpen: boolean;
	export let dates;

	function handleSubmit(event: Event) {
		event.preventDefault();

		dates = {
			startDate: startDate,
			endDate: endDate
		};

		dialogOpen = false;
	}

	const df = new DateFormatter('cz', {
		dateStyle: 'medium'
	});

	let startDate: DateValue | undefined = undefined;
	let endDate: DateValue | undefined = undefined;

	onMount(() => {
		dialogOpen = true;
	});
</script>

<Dialog.Root bind:open={dialogOpen}>
	<Dialog.Content class="overflow-visible !w-[400px]">
		<Dialog.Header>
			<Dialog.Title class="h-6">Test dialog</Dialog.Title>
			<Dialog.Description>
				Vyberte časové období.
			</Dialog.Description>
		</Dialog.Header>

		<form on:submit={handleSubmit}>
			<div class="flex flex-col gap-4 ">
				<div class="flex flex-col items-start gap-0.5">
					<Label class="text-right">
						Začátek
					</Label>
					<Popover.Root>
						<Popover.Trigger asChild let:builder>
							<Button
								variant="outline"
								class={cn("w-[280px] justify-start text-left font-normal",!startDate && "text-muted-foreground")}
								builders={[builder]}
							>
								<CalendarIcon class="mr-2 h-4 w-4" />
								{startDate ? df.format(startDate.toDate(getLocalTimeZone())) : "Vyberte datum"}
							</Button>
						</Popover.Trigger>
						<Popover.Content class="w-auto p-0">
							<Calendar bind:value={startDate} initialFocus calendarLabel="Test" />
						</Popover.Content>
					</Popover.Root>
				</div>

				<div class="flex flex-col items-start gap-0.5">
					<Label class="text-right">
						Konec
					</Label>
					<Popover.Root>
						<Popover.Trigger asChild let:builder>
							<Button
								variant="outline"
								class={cn("w-[280px] justify-start text-left font-normal", !endDate && "text-muted-foreground")}
								builders={[builder]}
							>
								<CalendarIcon class="mr-2 h-4 w-4" />
								{endDate ? df.format(endDate.toDate(getLocalTimeZone())) : "Vyberte datum"}
							</Button>
						</Popover.Trigger>
						<Popover.Content class="w-auto p-0">
							<Calendar bind:value={endDate} initialFocus />
						</Popover.Content>
					</Popover.Root>
				</div>
			</div>

			<Dialog.Footer>
				<Button type="submit" class="w-full mt-5 bg-albi-500 text-background font-bolder">
					Save changes
				</Button>
			</Dialog.Footer>
		</form>
	</Dialog.Content>
</Dialog.Root>
