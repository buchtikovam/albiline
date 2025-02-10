<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import type {Snippet} from "svelte";

	interface Props {
		isOpen: boolean;
		children: Snippet
		size?: "sm" | "md" | "lg";
	}

	let {
		isOpen = $bindable(),
		children,
		size
	}: Props = $props();
</script>


<Dialog.Root
	bind:open={isOpen}
>
	<Dialog.Content class="h-[70%] w-[90%] md:w-[700px] lg:w-[900px] xl:w-[1200px] max-w-[1200px] flex flex-col">
		{@render children?.()}
	</Dialog.Content>
</Dialog.Root>
