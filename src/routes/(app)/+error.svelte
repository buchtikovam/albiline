<script>
	import { page } from '$app/state';
</script>

<svelte:head>
	<title>Error {page.status} - {page.error?.message}</title>
</svelte:head>

<div class="flex flex-col bg-white flex-1 items-center justify-center border border-slate-300 h-dvh mr-4 rounded-lg">
	<h1 class="mb-2 font-black text-5xl text-albi-500 dark:text-albi-500">
		{page.status}
	</h1>
	<p class="text-2xl font-bold text-albi-800 dark:text-albi-100">
		{page.error?.message}
	</p>
</div>
