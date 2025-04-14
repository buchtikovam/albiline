<script lang="ts">
	import {responseDialogMessages} from "$lib/runes/page.svelte.js";
	import {customToast} from "$lib/utils/customToast";
	import CircleAlert from "lucide-svelte/icons/circle-alert";
	import CircleCheck from "lucide-svelte/icons/circle-check";
	import CircleX from "lucide-svelte/icons/circle-x";
	import Info from "lucide-svelte/icons/info";
	import * as Dialog from '$lib/components/ui/dialog';


	let dialogOpen: boolean = $state(false);
	let messages = $derived(responseDialogMessages.value);

	let dialogMessages = $derived.by(() => {
		if (messages) {
			return messages.filter((message) => {
				return !message.type.endsWith("Toast");
			})
		}

		return []
	});

	let toastMessages = $derived.by(() => {
		if (messages) {
			return messages.filter((message) => {
				return message.type.endsWith("Toast");
			})
		}

		return [];

	})


	$effect(() => {
		dialogOpen = dialogMessages.length > 0;
	})


	$effect(() => {
		toastMessages.forEach((message, index) => {
			setTimeout(() => {
				customToast(message.type, message.content)
			}, index * 100);
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
				class="min-w-[300px] max-w-[420px] text-red-950 border-2 border-red-600"
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
				class="min-w-[300px] max-w-[420px] text-amber-950 border-2 border-amber-500"
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

		{#if dialogMessages[0].type === "Success"}
			<Dialog.Content
				class="min-w-[300px] max-w-[420px] text-green-950 border-2 border-green-500"
			>
				<Dialog.Header>
					<Dialog.Title
						class="h-6 flex items-center gap-2"
					>
						<CircleCheck
							strokeWidth={2.5}
							class="my-auto text-green-500"
						/>
						{dialogMessages[0].title}
					</Dialog.Title>
				</Dialog.Header>

				<p class="text-sm">
					{dialogMessages[0].content}
				</p>
			</Dialog.Content>
		{/if}

		{#if dialogMessages[0].type === "InfoBox"}
			<Dialog.Content
				class="min-w-[300px] max-w-[420px] text-violet-950 border-2 border-violet-500"
			>
				<Dialog.Header>
					<Dialog.Title
						class="h-6 flex items-center gap-2"
					>
						<Info
							strokeWidth={2.5}
							class="my-auto text-violet-500"
						/>
						{dialogMessages[0].title}
					</Dialog.Title>
				</Dialog.Header>

				<p class="text-sm">
					{dialogMessages[0].content}
				</p>
			</Dialog.Content>
		{/if}
	{:else}
		<Dialog.Content
			class="sm:h-auto w-[90%] sm:w-[420px] max-w-[520px] max-h-[70%] overflow-auto flex flex-col"
		>
			<Dialog.Header>
				<Dialog.Title
					class="h-6 flex items-center gap-2"
				>
					Response
				</Dialog.Title>
			</Dialog.Header>

			<div class="flex flex-col gap-3">
				{#each dialogMessages as message}
					<div class="text-sm ">
						<div class="flex items-center gap-1.5 font-bold mb-0.5">
							{#if message.type === "Critical"}
								<CircleX
									strokeWidth={2.5}
									class="my-auto size-4 text-red-600"
								/>
							{/if}

							{#if message.type === "Warning"}
								<CircleAlert
									strokeWidth={2.5}
									class="my-auto size-4 text-amber-500"
								/>
							{/if}

							{#if message.type === "Success"}
								<CircleCheck
									strokeWidth={2.5}
									class="my-auto size-4 text-green-500"
								/>
							{/if}


							{#if message.type === "InfoBox"}
								<Info
									strokeWidth={2.5}
									class="my-auto size-4 text-violet-500"
								/>
							{/if}

							{message.title}:
						</div>

						- {message.content}
					</div>
				{/each}
			</div>
		</Dialog.Content>
	{/if}
</Dialog.Root>
