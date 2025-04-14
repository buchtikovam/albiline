<script lang="ts">
	import Cz from 'svelte-flag-icons/Cz.svelte';
	import Sk from 'svelte-flag-icons/Sk.svelte';
	import Pl from 'svelte-flag-icons/Pl.svelte';
	import Gb from 'svelte-flag-icons/Gb.svelte';

	interface Props {
		language: string;
	}

	let { language = 'cz' }: Props = $props();
</script>


<div class="max-h-[22px] w-7 flex items-center rounded border ">
	{#if language === "cz"}
		<Cz class="w-8  "/>
	{/if}

	{#if language === "sk"}
		<Sk class="w-8 h-[24px] "/>
	{/if}

	{#if language === "pl"}
		<Pl class="w-8"/>
	{/if}


	{#if language === "en"}
		<Gb class="w-8 "/>
	{/if}
</div>
