<script lang="ts">
	import { Separator } from "../ui/separator";

	interface Props {
		color?: "primary" | "secondary";
	}

	let { color = "primary" }: Props = $props();
</script>

<Separator orientation="vertical" class={`w-[2px] ${ color === "primary" ? "bg-albi-400" : "bg-slate-100"} !min-h-[16px] mx-1`}/>
