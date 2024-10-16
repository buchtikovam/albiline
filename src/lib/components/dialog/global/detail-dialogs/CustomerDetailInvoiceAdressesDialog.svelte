<script lang="ts">
	import { onMount } from 'svelte';
	import * as Dialog from '$lib/components/ui/dialog';

	let dialogOpen: boolean = false;

	onMount(() => {
		console.log("open");
		
		dialogOpen = true;
	});
</script>



<Dialog.Root
	bind:open={dialogOpen}
	closeOnOutsideClick={false}
>
	<Dialog.Content class="!w-[400px]">
		<Dialog.Header>
			<Dialog.Title class="h-6 mb-2">
				Výběr fakturačních adres
			</Dialog.Title>
		</Dialog.Header>
	</Dialog.Content>
</Dialog.Root>
