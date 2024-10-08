<script lang="ts">
	import { onMount } from "svelte";

	export let href: string;
	export let label: string;

	function scrollIntoView({ target }) {
		const el = document.querySelector(target.getAttribute('href'));

		if (!el) return;
		el.scrollIntoView({ behavior: 'smooth'});
	}

</script>


<a 
	class="border w-full"
	href={`#${href}`}
	on:click|preventDefault={scrollIntoView}
>
	{label}
</a>