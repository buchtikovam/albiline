<script lang="ts">
	import { Checkbox as CheckboxPrimitive, type WithoutChildrenOrChild } from "bits-ui";
	import Check from "lucide-svelte/icons/check";
	import Minus from "lucide-svelte/icons/minus";
	import { cn } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		checked = $bindable(false),
		indeterminate = $bindable(false),
		class: className,
		...restProps
	}: WithoutChildrenOrChild<CheckboxPrimitive.RootProps> = $props();
</script>

<CheckboxPrimitive.Root
	bind:ref
	class={cn(
		"peer box-content size-5 shrink-0 flex justify-center items-center rounded-md border bg-white border-border ring-offset-background focus-visible:outline-none focus-visible:ring-0 focus-visible:border-albi-500 focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:bg-slate-50 data-[disabled=true]:cursor-not-allowed data-[state=checked]:bg-albi-500 data-[state=checked]:text-white",
		className
	)}
	bind:checked
	bind:indeterminate
	{...restProps}
>
	{#snippet children({ checked, indeterminate })}
		<div class="size-4 text-current">
			{#if indeterminate}
				<Minus class="size-3.5" />
			{:else}
				<Check strokeWidth={3} class={cn("size-4", !checked && "text-transparent")} />
			{/if}
		</div>
	{/snippet}
</CheckboxPrimitive.Root>
