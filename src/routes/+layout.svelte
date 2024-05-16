<script lang="ts">
	import '../app.pcss';
	import Sidebar from '$lib/components/created/Sidebar.svelte';
	import Ribbon from '$lib/components/created/ribbon/Ribbon.svelte';
	import { Separator } from '$lib/components/ui/separator';
	import Header from '$lib/components/created/Header.svelte';
</script>

<div class="grid h-dvh w-full">
	<div class="flex flex-col">
		<header class="flex flex-col  border-b lg:h-fit">
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
				<div class="flex flex-1 flex-col rounded-md gap-4 p-4 pr-0">
					<slot />
				</div>
			</main>
		</div>

	</div>
</div>




