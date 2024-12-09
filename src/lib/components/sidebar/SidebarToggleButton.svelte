<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import Menu from 'lucide-svelte/icons/menu';

	interface Props {
		isSidebarOpen: boolean;
	}

	let { isSidebarOpen }: Props = $props();


	// function toggleOpen() {
	// 	sidebarOpenStore.update(() => !isSidebarOpen)
	// }
</script>



<!--<Button-->
<!--	variant="ghost"-->
<!--	size="icon"-->
<!--	class="hover:bg-muted/50 text-albi-950 hover:text-black"-->
<!--	on:click={toggleOpen}-->
<!--&gt;-->
	<Menu class="h-6 w-6" />
<!--</Button>-->
