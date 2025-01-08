<script lang="ts">
	import ArrowLeft from 'lucide-svelte/icons/arrow-left';
	import ArrowRight from 'lucide-svelte/icons/arrow-right';

	interface Props {
		direction: "left"|"right";
		disable: boolean;
		navigateDetailFn?: () => void;
	}

	let { direction, disable = $bindable(), navigateDetailFn = () => {} }: Props = $props();
</script>



<button
	class={(disable ? "text-slate-300 " : "text-albi-500") + " size-5"}
	disabled={disable}
	onclick={navigateDetailFn}
>
	{#if direction === "left"}
		<ArrowLeft class="size-5"/>
	{/if}

	{#if direction === "right"}
		<ArrowRight class="size-5"/>
	{/if}
</button>
