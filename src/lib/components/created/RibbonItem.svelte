<script lang="ts">
	export let name: string = 'Item';
</script>

<div class="p-2 w-[48px] h-[60px] rounded flex content-center items-center mx-auto hover:bg-muted/40">
	<button class="text-xs flex flex-col content-center items-center m-auto">
		<slot/>
		{name}
	</button>
</div>
