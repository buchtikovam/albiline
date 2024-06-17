<script lang="ts">
	import { fly } from 'svelte/transition';
	import { backOut } from 'svelte/easing';
	import { onMount } from 'svelte';
	import Info from 'lucide-svelte/icons/info';
	import CircleAlert from 'lucide-svelte/icons/circle-alert';
	import CircleCheck from 'lucide-svelte/icons/circle-check';
	import CircleX from 'lucide-svelte/icons/circle-x';
	import X from 'lucide-svelte/icons/x';
	import { toastStore } from '$lib/stores/toastStore';

	export let type: 'InfoToast' | 'Warning' | 'Critical' | 'Success';
	export let content: string;

	let show = false;

	function hide() {
		show = false;
		toastStore.set([]);
		// remove only specific toast
	}

	onMount(() => {
		show = true;
		console.log('toasting');
		setTimeout(() => hide(), 10000);
	});

	// 	TODO: toasts dissappear on their own bug, no animation on exit

	// 	TODO: stack toasts

</script>

{#if show}
	<div
		id="toast"
		transition:fly={{ duration: 500, easing: backOut, y: -48, x: 0 }}
		class=" z-50 flex items-center w-[300px] p-2 text-primary bg-background rounded-lg border-2 drop-shadow-xl dark:text-albi-50 dark:bg-albi-800"
	>
		{#if type === 'InfoToast'}
			<div
				class="inline-flex items-center justify-center flex-shrink-0 size-8 text-blue-600 bg-blue-200 rounded-lg dark:bg-blue-900 dark:text-blue-300">
				<Info class="size-5" />
			</div>
		{:else if type === 'Warning'}
			<div
				class="inline-flex items-center justify-center flex-shrink-0 size-8 text-amber-600 bg-amber-200 rounded-lg dark:bg-amber-900 dark:text-amber-300">
				<CircleAlert class="size-5" />
			</div>
		{:else if type === 'Success'}
			<div
				class="inline-flex items-center justify-center flex-shrink-0 size-8 text-green-600 bg-green-200 rounded-lg dark:bg-green-900 dark:text-green-300">
				<CircleCheck class="size-5" />
			</div>
		{:else}
			<div
				class="inline-flex items-center justify-center flex-shrink-0 size-8 text-red-600 bg-red-200 rounded-lg dark:bg-red-900 dark:text-red-300">
				<CircleX class="size-5" />
			</div>
		{/if}

		<div class="ms-3 font-semibold">{content}</div>

		<button
			on:click={hide}
			type="button"
			class="ms-auto bg-background text-primary rounded-lg focus:ring-2 focus:ring-albi-300 p-2 hover:bg-albi-50 inline-flex items-center justify-center size-8 dark:text-albi-300 dark:hover:text-albi-200 dark:bg-albi-800 dark:hover:bg-albi-700"
		>
			<X class="size-5" />
		</button>
	</div>
{/if}
