<script lang="ts">
	import { sidebarStateStore } from '$lib/stores/sidebarStore';
	import { Button } from '$lib/components/ui/button/index.js';
	import Menu from 'lucide-svelte/icons/menu';

	export let isSidebarOpen: boolean = true;


	function toggleOpen() {
		sidebarStateStore.update(() => !isSidebarOpen)
	}
</script>



<Button
	variant="ghost"
	size="icon"
	class="hover:bg-muted/50"
	on:click={toggleOpen}
>
	<Menu class="h-5 w-5" />
</Button>
