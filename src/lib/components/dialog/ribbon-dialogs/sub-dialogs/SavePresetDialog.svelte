<script lang="ts">
	import { onMount } from 'svelte';
	import * as Dialog from '$lib/components/ui/dialog';

	/*
		Dialog pro uložení nového filtru,
		po vložení názvu se provede saveFilters funkce
	*/

	let dialogOpen: boolean = false;

	onMount(() => {
		dialogOpen = true;
	});
</script>



<Dialog.Root bind:open={dialogOpen}>
	<Dialog.Content class="!w-fit !min-w-[300px]">
		<Dialog.Header>
			<Dialog.Title class="h-4 mb-4">
				Nová šablona
			</Dialog.Title>
		</Dialog.Header>
	</Dialog.Content>
</Dialog.Root>
