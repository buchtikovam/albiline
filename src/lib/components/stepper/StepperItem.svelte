<script lang="ts">
	import ChevronsRight from 'lucide-svelte/icons/chevrons-right';
	import Check from 'lucide-svelte/icons/check';
	import type { StepperItemType } from '$lib/types/components/stepper/stepper';
	import { twMerge } from 'tailwind-merge'; // Optional but recommended for complex classes

	interface Props {
		stepperItems: StepperItemType[];
		item: StepperItemType;
	}

	let { stepperItems = $bindable(), item }: Props = $props();

	function handleClick() {
		// if (isUpcoming) return; // Should be blocked by disabled, but good practice
		stepperItems = stepperItems.map((i) => ({
			...i,
			isActive: i.position === item.position
		}));

		if (item.onclick) {
			item.onclick();
		}
	}

	// --- REFACTORED LOGIC ---
	// Determine the step's state
	// const isUpcoming = $state(!item.isActive && !item.isFinished);

	// Reactively compute the class strings. Tailwind can now see all these full class names.
	let circleClasses = $state('');
	let labelClasses = $state('');

	$effect(() => {
		if (item.isActive) {
			circleClasses = 'bg-albi-500 text-white';
			labelClasses = 'text-albi-500';
		} else if (item.isFinished) {
			circleClasses = 'bg-green-500 text-white';
			labelClasses = 'text-albi-950';
		} else {
			circleClasses = 'border border-slate-300 bg-white text-slate-400';
			labelClasses = 'text-slate-400';
		}
	});


	let chevronClasses = $state('');
	$effect(() => {
		if (item.isActive || item.isFinished) {
			chevronClasses = 'text-albi-500';
		} else {
			chevronClasses = 'text-slate-400';
		}
	});
</script>



<!-- isUpcoming && 'cursor-not-allowed' -->
<button
	class={twMerge(
		'flex items-center gap-2 rounded-md p-1 transition-colors',
		(item.isActive || item.isFinished) && 'hover:bg-muted/80',
		// isUpcoming && 'cursor-not-allowed'
	)}
	onclick={handleClick}
	aria-current={item.isActive ? 'step' : undefined}
>
	<span
		class={twMerge(
			'flex size-5 items-center justify-center rounded-full font-bold transition-colors',
			circleClasses
		)}
	>
		{#if item.isFinished}
			<Check class="size-3.5" strokeWidth="3" />
		{:else}
			<span class="text-xs">{item.position}</span>
		{/if}
	</span>

	<span class={twMerge('text-sm font-bold transition-colors', labelClasses)}>
		{item.label()}
	</span>

	{#if !item.isLast}
		<ChevronsRight class={twMerge('size-5 transition-colors', chevronClasses)} />
	{/if}
</button>
