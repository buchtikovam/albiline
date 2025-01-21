<script lang="ts">
	import type { ToastVariant } from '$lib/types/components/toast';
	import CircleAlert from 'lucide-svelte/icons/circle-alert';
	import CircleCheck from 'lucide-svelte/icons/circle-check';
	import CircleX from 'lucide-svelte/icons/circle-x';
	import Info from 'lucide-svelte/icons/info';

	interface Props {
		type: ToastVariant;
		content: string;
	}

	let { type, content }: Props = $props();


	let hidden = $state(false);

	$effect(() => {
		return (() => {
			hidden = true;
		})
	})
</script>



{#if type === 'InfoToast'}
	<div
		id="toast"
		class={`${hidden ? 'hidden' : ''} mx-auto md:m-0 flex items-center w-fit max-w-[300px] p-3 md:p-4 text-violet-950 bg-white rounded-lg border-2 border-violet-500 dark:text-violet-50 dark:bg-violet-800`}
	>
		<div
			class="inline-flex items-center justify-center flex-shrink-0 size-8 md:size-9 text-violet-600 bg-violet-200 rounded-lg dark:bg-violet-900 dark:text-violet-300">
			<Info class="size-5" />
		</div>

		<div class="ms-3 text-sm font-semibold">
			{content}
		</div>
	</div>
{:else if type === 'Warning'}
	<div
		id="toast"
		class="mx-auto md:m-0 flex items-center w-fit max-w-[300px] p-3 md:p-4 text-amber-950 bg-white rounded-lg border-2 border-amber-500 dark:text-amber-50 dark:bg-amber-800"
	>
		<div
			class="inline-flex items-center justify-center flex-shrink-0 size-8 md:size-9 text-amber-600 bg-amber-200 rounded-lg dark:bg-amber-900 dark:text-amber-300">
			<CircleAlert class="size-5 md:size-6" />
		</div>

		<div class="ml-3 text-sm md:text-base font-semibold">
			{content}
		</div>
	</div>
{:else if type === 'Success'}
	<div
		id="toast"
		class="mx-auto md:m-0 flex items-center w-fit max-w-[300px] p-3 md:p-4 text-green-950 bg-white rounded-lg shadow border-2 border-green-500 dark:text-green-50 dark:bg-green-800"
	>
		<div
			class="inline-flex items-center justify-center flex-shrink-0 size-8 md:size-9 text-green-600 bg-green-200 rounded-lg dark:bg-green-900 dark:text-green-300">
			<CircleCheck class="size-5 md:size-6" />
		</div>

		<div class="ms-3 text-sm font-semibold">
			{content}
		</div>
	</div>
{:else}
	<div
		id="toast"
		class="mx-auto md:m-0 flex items-center w-fit max-w-[300px] p-3 md:p-4 text-red-950 bg-white rounded-lg shadow border-2 border-red-500 dark:text-red-50 dark:bg-red-800"
	>
		<div
			class="inline-flex items-center justify-center flex-shrink-0 size-8 md:size-9 text-red-600 bg-red-200 rounded-lg dark:bg-red-900 dark:text-red-300">
			<CircleX class="size-5 md:size-6" />
		</div>

		<div class="ms-3 text-sm font-semibold">
			{content}
		</div>
	</div>
{/if}


