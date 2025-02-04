<script lang="ts">
	import { responseDialogMessages } from "$lib/runes/page.svelte";
	import { customToast } from "$lib/utils/customToast";
	import CircleX from "lucide-svelte/icons/circle-x";
	import CircleAlert from "lucide-svelte/icons/circle-alert";
	import * as Dialog from '$lib/components/ui/dialog';


	let dialogOpen: boolean = $state(false);
	let messages = $derived(responseDialogMessages.value);

	let dialogMessages = $derived.by(() => {
		return messages.filter((message) => {
			return message.type !== "InfoToast" || "WarningToast";
		})
	});


	$effect(() => {
		dialogOpen = messages.length > 0;

		messages.forEach((message) => {
			if (message.type === "InfoToast" || message.type === "WarningToast") {
				customToast(message.type, message.content);
			}
		})
	})


	function clearMessages() {
		if (dialogOpen === false) {
			responseDialogMessages.value = [];
		}
	}
</script>



<Dialog.Root
	bind:open={dialogOpen}
	onOpenChange={clearMessages}
>
	{#if dialogMessages.length === 1}
		{#if dialogMessages[0].type === "Critical"}
			<Dialog.Content
				class="min-w-[300px] text-red-950 border-2 border-red-600"
			>
				<Dialog.Header>
					<Dialog.Title
						class="h-6 flex items-center gap-2"
					>
						<CircleX
							strokeWidth={2.5}
							class="my-auto text-red-600"
						/>
						{dialogMessages[0].title}
					</Dialog.Title>
				</Dialog.Header>

				<p class="text-sm">
					{dialogMessages[0].content}
				</p>
			</Dialog.Content>
		{/if}

		{#if dialogMessages[0].type === "Warning"}
			<Dialog.Content
				class="min-w-[300px] text-amber-950 border-2 border-amber-500"
			>
				<Dialog.Header>
					<Dialog.Title
						class="h-6 flex items-center gap-2"
					>
						<CircleAlert
							strokeWidth={2.5}
							class="my-auto text-amber-500"
						/>
						{dialogMessages[0].title}
					</Dialog.Title>
				</Dialog.Header>

				<p class="text-sm">
					{dialogMessages[0].content}
				</p>
			</Dialog.Content>
		{/if}
	{/if}
</Dialog.Root>
