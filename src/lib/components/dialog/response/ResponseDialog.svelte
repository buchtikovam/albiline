<script lang="ts">
	import { responseDialogMessages } from "$lib/runes/page.svelte";
	import CircleX from "lucide-svelte/icons/circle-x";
	import * as Dialog from '$lib/components/ui/dialog';

	let dialogOpen: boolean = $state(false);

	$effect(() => {
		dialogOpen = responseDialogMessages.value.length > 0;
	})

	let messages = $derived(responseDialogMessages.value);
	$inspect(messages);
</script>



<Dialog.Root
	bind:open={dialogOpen}
>
	{#if messages.length === 1}
		<Dialog.Content
			class="w-[400px] text-red-950 border-2 border-red-600"
		>
			<Dialog.Header>
				{#if messages[0].type === "Critical"}
					<Dialog.Title
						class="h-6 flex items-center gap-2"
					>
						<CircleX strokeWidth={2.5} class="my-auto text-red-600" />
						Kritická chyba
					</Dialog.Title>
				{/if}
			</Dialog.Header>

			<div class="flex text-sm gap-1">
				<p class="font-bold">
					{messages[0].title}:
				</p>

				<p class="text-sm">
					{messages[0].content}
				</p>
			</div>
		</Dialog.Content>

	{/if}


</Dialog.Root>
