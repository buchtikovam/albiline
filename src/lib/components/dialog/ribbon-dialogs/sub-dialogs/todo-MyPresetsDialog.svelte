<script lang="ts">
	import { onMount } from 'svelte';
	import * as Dialog from '$lib/components/ui/dialog';
	import { handleRibbonDialogClose } from '$lib/utils/ribbon/handleRibbonDialogClose';
	import { Pencil, Plus, X } from 'lucide-svelte';

	let dialogOpen: boolean = false;


	onMount(() => {
		dialogOpen = true;
	});
</script>



<Dialog.Root bind:open={dialogOpen} onOpenChange={() => handleRibbonDialogClose()}>
	<Dialog.Content class="!w-fit !min-w-[300px] overflow-visible">
		<Dialog.Header>
			<Dialog.Title class="h-6 mb-2">
				Moje šablony
			</Dialog.Title>
		</Dialog.Header>
		

		<!-- {#each filters as filter, index (filter.id)} -->
					<div
						role="listitem"
						class="flex justify-between items-center hover:bg-muted/70 rounded-md px-1"
					>
						<!-- {#if isEditing && currentEditedId === filter.id}
							<form
								class="w-full">
								<Input
									class="w-fit h-7 m-1"
									bind:value={filter.filterName}
								/>
							</form> -->
						<!-- {:else} -->
							<button
								draggable="true"
								class="text-left text-sm w-full hover:text-primary px-0.5 py-2"
							>
								test
							</button>
						<!-- {/if} -->

						<div class="flex gap-2 ml-4">
							<button
								class="size-5"
							>
								<Pencil class="size-4 text-albi-600 hover:text-albi-900" />
							</button>

							<button
								class="size-5"
							>
								<X class="size-4 text-albi-600 hover:text-albi-900" />
							</button>
						</div>
					</div>
				<!-- {/each} -->
	</Dialog.Content>
</Dialog.Root>
