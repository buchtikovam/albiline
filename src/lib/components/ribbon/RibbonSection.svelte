<script lang="ts">
	import { ribbonStateStore } from '$lib/stores/store';

	let isOpen: boolean;

	ribbonStateStore.subscribe((data) => {
		isOpen = data;
	});
</script>

<div class="w-fit flex flex-col ">
	<div class={isOpen ? "flex gap-2" : "flex"}>
		<slot />
	</div>
</div>
