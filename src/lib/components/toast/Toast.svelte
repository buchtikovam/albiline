<script lang="ts">
	import Info from 'lucide-svelte/icons/info';
	import CircleAlert from 'lucide-svelte/icons/circle-alert';
	import CircleCheck from 'lucide-svelte/icons/circle-check';
	import CircleX from 'lucide-svelte/icons/circle-x';
	import type { ToastVariant } from '$lib/types/toast';

	export let type: ToastVariant;
	export let content: string;
</script>

<div
	id="toast"
	class="flex items-center max-w-[300px] p-2 text-primary bg-background rounded-lg border-2 dark:text-albi-50 dark:bg-albi-800 pr-3"
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

	<div class="ms-3 text-sm font-semibold">
		{content}
	</div>
</div>
