<script lang="ts">
	import { Separator } from "../ui/separator";

	interface Props {
		color?: "primary" | "secondary";
	}

	let { color = "primary" }: Props = $props();
</script>

<Separator orientation="vertical" class={`w-[2px] ${ color === "primary" ? "bg-albi-400" : "bg-gray-200"} h-3.5 mx-1`}/>
