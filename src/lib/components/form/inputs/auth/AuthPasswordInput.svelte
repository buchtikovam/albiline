<script lang="ts">
	import { Input } from "$lib/components/ui/input";
	import { ZodSchema } from "zod";
	import Eye from "lucide-svelte/icons/eye";
	import EyeOff from "lucide-svelte/icons/eye-off";
	import InputLabel from "$lib/components/form/labels/InputLabel.svelte";

	interface Props {
		schema?: ZodSchema,
		disableSubmit?: boolean,
		label: () => string,
		name: string,
		placeholder?: string,
		inputType: "dialog"|"auth",
		value?: string,
	}

	let {
		schema,
		label,
		name,
		disableSubmit = $bindable(),
		placeholder,
		inputType,
		value = $bindable(),
	}: Props = $props();


	let visible = $state(false);
	let errorMessage = $state("");
	let isFocused = $state(false);


	function validatePassword(e) {
		if (schema) {
			try {
				schema.parse(e.target.value);
				errorMessage = "";
				disableSubmit = false;

			} catch (e) {
				disableSubmit = true;
				errorMessage = "Heslo musí obsahovat: aspoň 10 znaků, velké písmeno, malé písmeno, číslo, speciální znak";
			}
		}
	}
</script>






<div class="flex flex-col items-start w-full">
	<div class="flex text-sm">
		<InputLabel
			label={label()}
		/>
	</div>

	{#if inputType === "auth"}
		<div class={`flex w-full rounded-lg border bg-white ${isFocused ? "border-albi-500 " : "border-slate-300 "}`}>
			<Input
				oninput={(e) => validatePassword(e)}
				onfocus={() => isFocused = true}
				onfocusout={() => isFocused = false}
				bind:value
				class="bg-white placeholder:text-slate-300 h-12 font-bold text-albi-950 border-none"
				name={name}
				type={visible ? "text" : "password"}
				autocomplete="off"
				required={true}
				placeholder={placeholder}
			/>

			<button
				type="button"
				class="mr-3 w-6"
				onclick={() => visible = !visible}
			>
				{#if visible}
					<EyeOff class="size-4 text-albi-500"/>
				{:else }
					<Eye class="size-4 text-albi-500"/>
				{/if}
			</button>
		</div>

		{#if schema}
			<p class="text-xs text-left text-red-600 mt-1">
				{errorMessage}
			</p>
		{/if}
	{:else}

		<div
			class={`flex w-full rounded-lg border bg-white	${isFocused ? "border-albi-500 " : "border-slate-300"}`}
		>
			<Input
				oninput={(e) => validatePassword(e)}
				onfocus={() => isFocused = true}
				onfocusout={() => isFocused = false}
				class="bg-white h-12 font-bold placeholder:text-slate-300 text-albi-950 border-none"
				name={name}
				type={visible ? "text" : "password"}
				autocomplete="off"
				required={true}
				placeholder={placeholder}
			/>

			<button
				type="button"
				class="mr-3 w-6"
				onclick={() => visible = !visible}
			>
				{#if visible}
					<EyeOff class="size-4 text-albi-300"/>
				{:else }
					<Eye class="size-4 text-albi-300"/>
				{/if}
			</button>
		</div>

		{#if schema}
			<p class="text-xs text-left text-red-600 mt-1">
				{errorMessage}
			</p>
		{/if}
	{/if}
</div>
