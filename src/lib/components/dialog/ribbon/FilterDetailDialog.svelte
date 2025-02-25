<script lang="ts">
	import type { StoredFilters } from "$lib/types/components/table/filters";
	import DialogWrapper from "$lib/components/dialog/DialogWrapper.svelte";
	import * as Dialog from '$lib/components/ui/dialog';

	interface Props {
		isOpen: boolean;
		filter?: StoredFilters;
	}

	let {
		isOpen = $bindable(),
		filter
	}: Props = $props()
</script>



<DialogWrapper
	bind:isOpen
	onChange={() => {
		isOpen = false;
	}}
	{header}
	{content}
	fixedHeight={false}
	size="sm"
/>

{#snippet header()}
	<Dialog.Title class="h-6">
		{filter?.filterName}
	</Dialog.Title>
{/snippet}

{#snippet content()}
	{#if filter}
		<div class="-mt-2 -mb-2">
			{#each Object.entries(filter.filters) as [key, value]}
				<div class="mb-2">
					<div class="flex gap-1">
						<p class="font-bold text-sm">
							{key}
						</p>

						{#if value.filterModels[0].operator}
							<p class="font-bold text-sm">
								{"(" + value.filterModels[0].operator + ")"}
							</p>
						{/if}
					</div>


					{#each value.filterModels as filterModel}
						{#if filterModel.conditions}
							{#each filterModel.conditions as condition}
								<p
									class="text-sm ml-2"
								>
									- {condition.type}, {condition.filter}
								</p>
							{/each}
						{:else}
							<p
								class="text-sm ml-4"
							>
								- {filterModel.type}, {filterModel.filter}
							</p>
						{/if}
					{/each}

				</div>
			{/each}
		</div>
	{/if}
{/snippet}
