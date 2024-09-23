<script lang="ts">
	import './../../app.pcss';
	import { Toaster } from '$lib/components/ui/sonner';
	import Sidebar from '$lib/components/sidebar/Sidebar.svelte';
	import Ribbon from '$lib/components/ribbon/Ribbon.svelte';
	import Header from '$lib/components/header/Header.svelte';
	import MainDialog from '$lib/components/dialog/ribbon-dialogs/MainDialog.svelte';
	// import { browser } from "$app/environment";

    // let innerWidth;

    // if (browser){
    //     innerWidth = window.innerWidth;
		
	// 	console.log("innerWidth");
	// 	console.log(innerWidth);
    // }
</script>



<div class="wrapper h-dvh w-dvh bg-albi-50">
	<Toaster
		position="bottom-right"
		class="flex justify-end h-56"
	/>

	<div class="flex h-dvh flex-col">
		<header>
			<Header />
		</header>

		<div class="flex flex-row flex-1 pb-4">
			<div class="hidden md:block pl-4">
				<Sidebar />
			</div>
			<main class="flex flex-1 flex-col rounded-l-md">
				<Ribbon />
				
				<div class="pl-4 flex flex-col flex-1 rounded-lg md:p-2 md:pr-4 md:pb-0">
					<slot />
				</div>
			</main>
		</div>
	</div>
</div>

<MainDialog/>
