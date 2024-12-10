<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import Menu from 'lucide-svelte/icons/menu';
	import { sidebarOpen } from '$lib/runes/sidebar.svelte';
</script>



<Button
	variant="ghost"
	size="icon"
	class="size-6 p-4 hover:bg-muted/50 text-albi-950 hover:text-black"
	onclick={() => sidebarOpen.value = !sidebarOpen.value}
>
	<Menu class="size-6" />
</Button>
