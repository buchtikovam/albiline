<script lang="ts">
	import { sidebarOpen } from '$lib/runes/sidebar.svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import Menu from 'lucide-svelte/icons/menu';
</script>



<Button
	variant="ghost"
	size="icon"
	class="hover:bg-muted/50 text-albi-950 hover:text-black"
	onclick={() => sidebarOpen.value = !sidebarOpen.value}
>
	<Menu class="!size-5" />
</Button>
