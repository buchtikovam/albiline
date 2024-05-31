<script lang="ts">
	import {
		Button,
	} from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Label } from '$lib/components/ui/label';
	import { onMount } from 'svelte';
	import { Input } from '$lib/components/ui/input';

	let name: string;
	let userName: string;
	let dialogOpen: boolean = false;
	export let objects;

	function handleSubmit(event: Event) {
		event.preventDefault();

		objects = {
			name: name,
			userName: userName
		};

		dialogOpen = false;
	}

	onMount(() => {
		dialogOpen = true;
	});
</script>

<Dialog.Root bind:open={dialogOpen}>
	<Dialog.Content class="w-120">
		<Dialog.Header>
			<Dialog.Title class="h-6">Test dialog</Dialog.Title>
			<Dialog.Description>
				Make changes to your profile here. Click save when you're done.
			</Dialog.Description>
		</Dialog.Header>
		<form on:submit={handleSubmit} class="">
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
