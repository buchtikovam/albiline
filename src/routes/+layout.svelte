<script lang="ts">
	import '../app.pcss';
	import Sidebar from '$lib/components/created/Sidebar.svelte';
	import Ribbon from '$lib/components/created/Ribbon.svelte';
	import { Separator } from '$lib/components/ui/separator';
	import Logo from '$lib/icons/Logo.svelte';

	// import { Button } from '$lib/components/ui/button';
	// import { Menu } from 'lucide-svelte';

</script>


<div class="grid h-dvh w-full">
	<div class="flex flex-col">
		<header class="flex flex-col  border-b lg:h-fit">
			<div class="h-10 bg-muted/40 ml-4 flex items-center">
				<Logo/>
			</div>
			<Separator/>
			<Ribbon />
		</header>

		<div class="flex flex-row flex-1">
			<div class="hidden border-r lg:block">
				<Sidebar />
			</div>
			<main class="flex flex-1 flex-col bg-muted/40">
				<div class="flex flex-1 flex-col gap-2 lg:gap-4 p-2 lg:p-4">
					<slot />
				</div>
			</main>
		</div>
	</div>
</div>


<!--<Command.Dialog bind:open>&ndash;-->
	<!--	<Command.Input placeholder="Vyhledat..." />-->
	<!--	<Command.List>-->
	<!--		<Command.Empty>Nic nenalezeno</Command.Empty>-->
	<!--		<Command.Group heading="Průvodní list">-->
	<!--			<Command.Item>-->
	<!--				<span>1 Položka</span>-->
	<!--			</Command.Item>-->
	<!--			<Command.Item>-->
	<!--				<span>2 Položka</span>-->
	<!--			</Command.Item>-->
	<!--			<Command.Item>-->
	<!--				<span>3 Položka</span>-->
	<!--			</Command.Item>-->
	<!--		</Command.Group>-->
	<!--		<Command.Separator />-->
	<!--		<Command.Group heading="Sklad">-->
	<!--			<Command.Item>-->
	<!--				<span>4 Položka</span>-->
	<!--			</Command.Item>-->
	<!--			<Command.Item>-->
	<!--				<span>5 Položka</span>-->
	<!--			</Command.Item>-->
	<!--			<Command.Item>-->
	<!--				<span>6 Položka</span>-->
	<!--			</Command.Item>-->
	<!--		</Command.Group>-->
	<!--	</Command.List>-->
	<!--</Command.Dialog>-->

