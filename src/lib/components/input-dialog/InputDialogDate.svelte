<script lang="ts">
	import ChevronRight from 'lucide-svelte/icons/chevron-right';
	import DatePicker from '$lib/components/date-picker/DatePicker.svelte';
	import * as Dialog from '$lib/components/ui/dialog';

	export let open;
</script>

<Dialog.Root bind:open>
	<Dialog.Trigger>Open</Dialog.Trigger>


	<Dialog.Content class="overflow-visible">

		<Dialog.Header>
			<Dialog.Title class="h-6">Test dialog</Dialog.Title>
			<Dialog.Description>
				Vyberte časové období.
			</Dialog.Description>
		</Dialog.Header>

		<div class="flex items-center">
			<DatePicker name="Začátek"/>
			<ChevronRight class="w-8 mt-6 mx-2" />
			<DatePicker name="Konec"/>
		</div>

	</Dialog.Content>

</Dialog.Root>
