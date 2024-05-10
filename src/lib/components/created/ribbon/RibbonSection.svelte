<script lang="ts">
	import { ribbonStateStore } from '$lib/stores/store';

	let isOpen: unknown;

	ribbonStateStore.subscribe((data) => {
		isOpen = data;
	});
</script>

{#if isOpen === "true"}
	<div class="w-fit flex flex-col ">
		<div class="flex gap-2">
			<slot />
		</div>
	</div>
{:else}
	<div class="w-fit flex flex-col ">
		<div class="flex">
			<slot />
		</div>
	</div>
{/if}
