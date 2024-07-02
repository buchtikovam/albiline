<script lang="ts">
	import { activeCategoryStore } from '$lib/stores/sidebarStore';

	export let buttonName: string;
	export let category: string;

	function handleClick() {
		activeCategoryStore.set(category);
	}
</script>

<button
	class={`${category} ${category === "all" ? "border-b-2" : ""} categoryButton all border-b-albi-500 p-1 pb-0 rounded-t-md hover:bg-muted/50`}
	on:click={handleClick}
>
	{buttonName}
</button>
