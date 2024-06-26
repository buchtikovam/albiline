<script lang="ts">
	import { handleTabClick } from '$lib/utils/header/handleTabClick';
	import type { Item } from '$lib/types/sidebar/sidebar';
	import * as Command from '$lib/components/ui/command';

	export let items: Item[];
	export let open: boolean;

	function handleClick(item: Item, treeDepth: number): void {
		open = !open;
		handleTabClick(item, treeDepth);
	}
</script>

<Command.Dialog bind:open>
	<Command.Input placeholder="Vyhledat..." />

	<Command.List class="mt-2">
		<Command.Empty class="-mt-2">
			Nic nebylo nalezeno.
		</Command.Empty>

		{#each items as item}
			{#if item.children.length > 0}
				<Command.Separator class="my-2" />

				<!-- items s children položkami -->
				<Command.Group heading="{item.name}" class="my-2">
					{#each item.children as child}
						<Command.Item class="decoration-0">
							<a href={child.href} on:click={() => handleClick(child, 1)}>
								{child.name}
							</a>
						</Command.Item>

						{#if child.children}
							{#each child.children as secondChild}
								<Command.Item>
									<a href={secondChild.href} class="text-sm pl-4"
									   on:click={() => handleClick(secondChild, 2)}>
										{secondChild.name}
									</a>
								</Command.Item>
							{/each}
						{/if}
					{/each}
				</Command.Group>
			{:else}
				<!-- items bez children položek -->
				<Command.Group>
					<Command.Item class="decoration-0">
						<a href={item.href} on:click={() => handleClick(item, 0)}>
							{item.name}
						</a>
					</Command.Item>
				</Command.Group>
			{/if}
		{/each}
	</Command.List>
</Command.Dialog>
