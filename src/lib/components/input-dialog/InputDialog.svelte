<script lang="ts">
	import {
		Button
	} from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Label } from '$lib/components/ui/label';
	import { onMount } from 'svelte';
	import { Input } from '$lib/components/ui/input';

	let firstParam: string;
	let scndParam: string;
	let dialogOpen: boolean = false;
	export let objects;

	function handleSubmit(event: Event) {
		event.preventDefault();

		objects = {
			firstParam: firstParam,
			scndParam: scndParam
		};

		dialogOpen = false;
	}

	onMount(() => {
		dialogOpen = true;
	});
</script>

<Dialog.Root bind:open={dialogOpen}>
	<Dialog.Content class="!w-[500px]">
		<Dialog.Header>
			<Dialog.Title class="h-6">Test dialog</Dialog.Title>
			<Dialog.Description>
				Prosím zadejte parametry.
			</Dialog.Description>
		</Dialog.Header>
		<form on:submit={handleSubmit}>
			<div class="flex flex-col gap-1 mb-7">

				<div class="">
					<Label for="name" class="text-right">
						Parametr 1
					</Label>
					<Input
						id="name"
						bind:value={firstParam}
						required
						class="focus-visible:ring-0"
					/>
				</div>

				<div class="">
					<Label for="username" class="text-right">
						Parametr 2
					</Label>
					<Input
						id="username"
						bind:value={scndParam}
						required
						class="focus-visible:ring-0"
					/>
				</div>
			</div>

			<Dialog.Footer>
				<Button type="submit" class="w-full bg-albi-500 text-background font-bolder">
					Potvrdit
				</Button>
			</Dialog.Footer>
		</form>
	</Dialog.Content>
</Dialog.Root>
