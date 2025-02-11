<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import type { Snippet } from "svelte";

	interface Props {
		isOpen: boolean;
		header: Snippet;
		content: Snippet;
		size: "sm" | "md" |  "lg";
		fixedHeight: boolean;
		customCss?: string;
		onChange?: () => void;
	}

	let {
		isOpen = $bindable(),
		header,
		content,
		size,
		customCss,
		fixedHeight = false,
		onChange
	}: Props = $props();
</script>



<Dialog.Root
	bind:open={isOpen}
	onOpenChange={onChange}
>
	{#if size === "sm"}
		<Dialog.Content
			class={`
				${fixedHeight ? "!h-[70%]" : "h-auto"}
				${customCss}
				sm:h-auto w-[90%] sm:w-auto max-h-[70%] overflow-auto flex flex-col`
			}>
			<Dialog.Header>
				{@render header()}
			</Dialog.Header>

			{@render content()}
		</Dialog.Content>
	{/if}


	{#if size === "md"}
		<Dialog.Content
			class={`
				${fixedHeight ? "!h-[70%]" : "h-auto"}
				${customCss}
				w-[90%] md:w-[720px] max-w-[720px] max-h-[70%] overflow-auto flex flex-col`
			}>
			<Dialog.Header>
				{@render header()}
			</Dialog.Header>

			{@render content()}
		</Dialog.Content>
	{/if}


	{#if size === "lg"}
		<Dialog.Content
			class={`
				${fixedHeight ? "!h-[70%]" : "h-auto"}
				${customCss}
				w-[90%] md:w-[700px] lg:w-[900px] xl:w-[1200px] max-w-[1200px] max-h-[70%] overflow-auto flex flex-col`
			}>
			<Dialog.Header>
				{@render header()}
			</Dialog.Header>

			{@render content()}
		</Dialog.Content>
	{/if}
</Dialog.Root>
