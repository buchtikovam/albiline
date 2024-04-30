<script lang="ts">
	export let name: string = 'Item';
</script>

<div
	class="p-2 w-[60px] h-[60px] rounded-md flex content-center items-center mx-auto text-muted-foreground hover:bg-muted/50">
	<button class="text-xs flex flex-col content-center items-center m-auto">
		<slot />
		{name}
	</button>
</div>
