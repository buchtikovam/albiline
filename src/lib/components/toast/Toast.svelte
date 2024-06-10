<script lang="ts">
	import { fly } from 'svelte/transition';
	import { backOut } from 'svelte/easing';
	import { onMount } from 'svelte';
	import Info from 'lucide-svelte/icons/info';
	import CircleAlert from 'lucide-svelte/icons/circle-alert';
	import CircleCheck from 'lucide-svelte/icons/circle-check';
	import CircleX from 'lucide-svelte/icons/circle-x';
	import X from 'lucide-svelte/icons/x';

	export let type: 'InfoToast' | 'Warning' | 'Critical' | 'Success';
	export let content: string;

	let show = false;

	function hide() {
		show = false;
	}

	onMount(() => {
		show = true;
		console.log("toasting");
		setTimeout(() => hide(), 10000);
	});
</script>

{#if show}
	<div
		id="toast"
		transition:fly={{ duration: 500, easing: backOut, y: -48, x: 0 }}
		class="absolute flex items-center w-full p-2 text-albi-800 bg-albi-50 rounded-lg shadow dark:text-albi-50 dark:bg-albi-800"
	>
		{#if type === 'InfoToast'}
			<div class="inline-flex items-center justify-center flex-shrink-0 w-10 h-10 text-blue-600 bg-blue-200 rounded-lg dark:bg-blue-900 dark:text-blue-300">
				<Info />
			</div>
		{:else if type === 'Warning'}
			<div class="inline-flex items-center justify-center flex-shrink-0 w-10 h-10 text-amber-600 bg-amber-200 rounded-lg dark:bg-amber-900 dark:text-amber-300">
				<CircleAlert />
			</div>
		{:else if type === 'Success'}
			<div class="inline-flex items-center justify-center flex-shrink-0 w-10 h-10 text-green-600 bg-green-200 rounded-lg dark:bg-green-900 dark:text-green-300">
				<CircleCheck />
			</div>
		{:else}
			<div class="inline-flex items-center justify-center flex-shrink-0 w-10 h-10 text-red-600 bg-red-200 rounded-lg dark:bg-red-900 dark:text-red-300">
				<CircleX />
			</div>
		{/if}

		<div class="ms-3 font-normal">{content}</div>

		<button
			on:click={hide}
			type="button"
			class="ms-auto bg-albi-50 text-albi-500 hover:text-albi-600 rounded-lg focus:ring-2 focus:ring-albi-300 p-2 hover:bg-albi-100 inline-flex items-center justify-center h-10 w-10 dark:text-albi-300 dark:hover:text-albi-200 dark:bg-albi-800 dark:hover:bg-albi-700"
		>
			<X />
		</button>
	</div>
{/if}
