<script lang="ts">
	import InputLabel from "$lib/components/form/labels/InputLabel.svelte";
	import * as ContextMenu from "$lib/components/ui/context-menu/index.js";

	interface Props {
		label: string;
		contextMenuField?: string;
	}

	let { label, contextMenuField }: Props = $props();
</script>



<ContextMenu.Root>
	<ContextMenu.Trigger>
		<InputLabel label={label} />
	</ContextMenu.Trigger>

	{#if contextMenuField}
		<ContextMenu.Content class="min-w-fit w-fit border-albi-500">
			<ContextMenu.Group class="min-w-fit w-fit">
				<ContextMenu.GroupHeading
					bold={false}
					class="min-w-fit w-fit"
				>
					{contextMenuField}
				</ContextMenu.GroupHeading>
			</ContextMenu.Group>
		</ContextMenu.Content>
	{/if}
</ContextMenu.Root>
