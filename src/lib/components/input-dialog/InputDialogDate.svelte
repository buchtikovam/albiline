<script lang="ts">
	import ChevronRight from 'lucide-svelte/icons/chevron-right';
	import DatePicker from '$lib/components/date-picker/DatePicker.svelte';
	import * as Dialog from '$lib/components/ui/dialog';
	import type { DateValue } from '@internationalized/date';
	import { Button } from '$lib/components/ui/form';

	export let open: boolean;
	export let dates: { startDate: DateValue, endDate: DateValue } | undefined = undefined;

	let startDate: DateValue | undefined = undefined;
	let endDate: DateValue | undefined = undefined;
	let error = false;

	function handleSubmit() {
		if (startDate === undefined || endDate === undefined) {
			error = true;
			return;
		}

		dates = {
			startDate: startDate,
			endDate: endDate
		};
		open = false;
	}
</script>

<Dialog.Root bind:open>
	<Dialog.Content class="overflow-visible">
		<Dialog.Header>
			<Dialog.Title class="h-6">Test dialog</Dialog.Title>
			<Dialog.Description class={error ? 'text-red-700' : ''}>
				{#if error === true}
					Prosím vyplňte obě data.
				{:else}
					Vyberte časové období.
				{/if}
			</Dialog.Description>
		</Dialog.Header>

		<form on:submit={handleSubmit}>
			<div class="flex items-center">
				<DatePicker name="Začátek" bind:value={startDate} />
				<ChevronRight class="w-8 mt-6 mx-2" />
				<DatePicker name="Konec" bind:value={endDate} />
			</div>

			<Dialog.Footer>
				<Button type="submit" class="w-full mt-5 bg-albi-500 text-background font-bolder">
					Potvrdit
				</Button>
			</Dialog.Footer>
		</form>
	</Dialog.Content>
</Dialog.Root>

