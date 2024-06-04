<script lang="ts">
import { Button } from '$lib/components/ui/button/index.js';
import Menu from 'lucide-svelte/icons/menu';
import { sidebarStateStore } from '$lib/stores/sidebarStore';

export let show: boolean;

function toggleOpen() {
	if (show === true) {
		sidebarStateStore.update(() => false);

	} else {
		sidebarStateStore.update(() => true);
	}
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
