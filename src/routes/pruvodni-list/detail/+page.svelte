<script lang="ts">
	import Pencil from 'lucide-svelte/icons/pencil';
	import X from 'lucide-svelte/icons/x';
	import type { FetchedFilter } from '$lib/types/table/filter';
	import { onMount } from 'svelte';

	let filtersData: string[] | undefined = undefined;
	//
	// (async function getFilters() {
	// 	try {
	// 		const response = await fetch('http://localhost:3000/filters');
	// 		filtersData = await response.json();
	//
	// 		console.log('FETCH');
	// 		console.log(filtersData);
	// 	} catch (error) {
	// 		console.error('Error fetching input-filters:', error);
	// 	}
	// })();

	filtersData = ["test", "test2"]

	function drag(e: DragEvent, index: number) {
		console.log('DRAG');

		if (e.dataTransfer) {
			e.dataTransfer.setData('text/plain', index);
			start = index
			console.log(index);
		}
	}

	let hovering: number | null;
	let start: number;

	function drop(e: DragEvent, target: number | null) {
		if (e.dataTransfer && target !== null) {
			console.log("DROP");
			console.log(target);

		}
	}

	function setHovering(e: DragEvent, index: number) {
		console.log('OVER');
		hovering = index;
	}

	onMount(() => {
		document.addEventListener('dragover', (event) => {
			event.preventDefault();
		});
	});
</script>

{#if filtersData !== undefined}
	<div>
		{#each filtersData as filter, index }
			<div
				role="listitem"
				draggable="true"
				on:dragstart={(e) => drag(e, index)}
				on:dragover={(e) => setHovering(e, index)}
				on:dragend={(e) => drop(e, hovering)}
				class="hover:bg-muted/70 rounded-md px-1"
			>
				<button
					class="text-left text-sm w-full hover:text-primary px-0.5 py-2"
				>
					{filter}
				</button>


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
		{/each}
	</div>
{:else}
	<p>Loading</p>
{/if}
