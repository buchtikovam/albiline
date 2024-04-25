<script lang="ts">
	export let name: string = 'Item';
</script>

<div class="p-2 w-[48px] h-[60px] rounded flex items-center hover:bg-muted/40">
	<button class="text-xs flex flex-col items-center">
		<slot/>
		{name}
	</button>
</div>
