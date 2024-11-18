<script lang="ts">
	import ArrowLeft from 'lucide-svelte/icons/arrow-left';
	import ArrowRight from 'lucide-svelte/icons/arrow-right';

	export let direction: "left"|"right";
	export let disable: boolean = false;
	export let navigateDetailFn: () => void = () => {}

</script>



<button
	class={(disable ? "text-slate-300 " : "text-albi-500") + " size-5"}
	disabled={disable}
	on:click={navigateDetailFn}
>
	{#if direction === "left"}
		<ArrowLeft class="size-5"/>
	{/if}

	{#if direction === "right"}
		<ArrowRight class="size-5"/>
	{/if}
</button>
