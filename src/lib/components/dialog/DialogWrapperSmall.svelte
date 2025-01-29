<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import type {Snippet} from "svelte";

	interface Props {
		isOpen: boolean;
		children: Snippet;
		fixedHeight?: boolean;
		fixedWidth?: string; // tailwind properties
	}

	let { isOpen = $bindable(), children, fixedHeight, fixedWidth }: Props = $props();
</script>


<Dialog.Root
	bind:open={isOpen}
>
	<Dialog.Content class={`${fixedHeight ? "h-[70%]" : "h-auto"} sm:h-auto w-[90%] sm:w-auto ${fixedWidth}`}>
		{@render children?.()}
	</Dialog.Content>
</Dialog.Root>
