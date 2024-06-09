<script lang="ts">
	import Menu from 'lucide-svelte/icons/menu';
	import { Button } from '$lib/components/ui/button/index.js';
	import { sidebarStateStore } from '$lib/stores/sidebarStore';

	export let show: boolean;

	function toggleOpen() {
		sidebarStateStore.update(() => !show)
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
