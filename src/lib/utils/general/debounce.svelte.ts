import { tick } from 'svelte';


export function debounceFn(timer: NodeJS.Timeout, callback: () => void) {
	clearTimeout(timer)

	return timer = setTimeout(async () => {
		await tick();
		callback()
	}, 1000)
}
