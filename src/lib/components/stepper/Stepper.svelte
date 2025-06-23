<script lang="ts">
	import StepperItem from "$lib/components/stepper/StepperItem.svelte";
	import type {StepperItemType} from "$lib/types/components/stepper/stepper";

	interface Props {
	    stepperItems: StepperItemType[],
	}

	let {
	    stepperItems = $bindable(),
	}: Props = $props();
</script>


<div class="flex gap-0 w-full justify-center h-6 items-center">
	{#each stepperItems as item}
		<StepperItem bind:stepperItems {item}/>
	{/each}
</div>
