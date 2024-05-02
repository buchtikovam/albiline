<script lang="ts">
	export let name: string = 'Section name';

	export let isOpen: boolean;
</script>

{#if isOpen}
	<div class="w-fit flex flex-col ">
		<div class="flex gap-2">
			<slot />
		</div>

<!--		<div>-->
<!--			<p class="flex justify-center text-[10px] text-muted-foreground/75 pt-0.5">{name}</p>-->
<!--		</div>-->
	</div>
{:else}
	<div class="w-fit flex flex-col ">
		<div class="flex">
			<slot />
		</div>
	</div>
{/if}
