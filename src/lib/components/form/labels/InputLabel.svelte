<script lang="ts">
	export let label;
	export let field;
</script>

<label for={field} class="text-sm mx-auto line-clamp-1 w-full text-slate-500 ">{@html label}</label>
