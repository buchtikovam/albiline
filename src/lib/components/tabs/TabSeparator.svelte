<script lang="ts">
	import { Separator } from "../ui/separator";

	export let color: "primary" | "secondary" = "primary";
</script>

<Separator orientation="vertical" class={`w-[2px] ${ color === "primary" ? "bg-albi-400" : "bg-gray-200"} h-3.5 mx-1`}/>
