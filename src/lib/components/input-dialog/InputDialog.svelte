<script lang="ts">
	// on page load, display dialog with form, input fields will go to GET request to get desired data
	import {
		Button,
		buttonVariants
	} from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Label } from '$lib/components/ui/label';
	import { onMount } from 'svelte';
	import { Input } from '$lib/components/ui/input';

	let name: string;
	let userName: string;
	let dialogOpen: boolean = false;

	// function dialogClose() {
	// 	dialogOpen = false;
	// }

	onMount(() => {
		dialogOpen = true

		// document.addEventListener("submit", (e) => {
		// 	// e.preventDefault();
		// 	dialogOpen = false;
		// 	console.log("closing");
		// })

		// get params

		// fetch data
	})
</script>

<Dialog.Root bind:open={dialogOpen}>
	<Dialog.Trigger class={buttonVariants({ variant: "outline" })}>
		dialog
	</Dialog.Trigger>

	<Dialog.Content class="w-120">
		<Dialog.Header>
			<Dialog.Title class="h-6">Test dialog</Dialog.Title>
			<Dialog.Description>
				Make changes to your profile here. Click save when you're done.
			</Dialog.Description>
		</Dialog.Header>
		<form class="">
			<div class="mb-4">
				<Label for="name" class="text-right">
					Name
				</Label>
				<Input
					id="name"
					bind:value={name}
					required
					class="focus-visible:ring-0"
				/>
			</div>

			<div class="mb-4">
				<Label for="username" class="text-right">
					Username
				</Label>
				<Input
					id="username"
					bind:value={userName}
					required
					class="focus-visible:ring-0"
				/>
			</div>

			<Dialog.Footer>
				<Button type="submit" class="w-full mt-5 bg-albi-500 text-background font-bolder">
					Save changes
				</Button>
			</Dialog.Footer>
		</form>
	</Dialog.Content>
</Dialog.Root>
