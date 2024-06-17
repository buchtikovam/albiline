<script lang="ts">
	import './../app.pcss';
	import { Separator } from '$lib/components/ui/separator';
	import { toastStore } from '$lib/stores/toastStore';
	import Sidebar from '$lib/components/sidebar/Sidebar.svelte';
	import Ribbon from '$lib/components/ribbon/Ribbon.svelte';
	import Header from '$lib/components/header/Header.svelte';
	import Toast from '$lib/components/toast/Toast.svelte';
	import type { ToastType } from '$lib/types/toast.ts';

	let toasts: ToastType[];

	toastStore.subscribe((data) => {
		toasts = data;
	});
</script>

<svelte:head>
	<title>Albiline</title>
</svelte:head>

<div class="grid h-dvh w-dvh">
	{#if toasts.length > 0}
		{#each toasts as toast}
			<div class="absolute right-0 bottom-12 z-20 flex flex-col items-center gap-4 p-4">
				<Toast type={toast.type} content={toast.content} />
			</div>
		{/each}
	{/if}

	<div class="flex flex-col">
		<header class="flex flex-col border-b lg:h-fit">
			<div class="pl-2">
				<Header />
			</div>
			<Separator />
			<Ribbon />
		</header>

		<div class="flex flex-row flex-1">
			<div class="hidden lg:block">
				<Sidebar />
			</div>
			<main class="flex flex-1 flex-col rounded-l-md bg-muted">
				<div class="flex flex-1 flex-col rounded-md p-4 pr-0">
					<slot />
				</div>
			</main>
		</div>
	</div>
</div>

