<script>
	import { isMobileLayoutExpandedStore } from "$lib/stores/pageStore";
	import { showFulltextSearchStore } from "$lib/stores/tableStore";

	showFulltextSearchStore.set(false);
	isMobileLayoutExpandedStore.set(false);
</script>


<svelte:head>
	<title>Zákazníci | Kontaktní osoby</title>
</svelte:head>

<div class="h-full"></div>