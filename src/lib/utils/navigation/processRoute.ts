interface RouteParams {
	[key: string]: string | number;
}


export function processRoute(route: string, params: RouteParams): string {
	// Split the route into segments, excluding the initial "(app)" segment

	const segments = route.split('/').slice(2);

	// Iterate through segments and replace placeholders with actual values
	const processedSegments = segments.map((segment) => {
		const match = segment.match(/\[(.*)\]/); // Match segments enclosed in square brackets
		if (match) {
			const paramName = match[1];
			return params[paramName]?.toString() || ''; // Handle potential undefined values
		} else {
			return segment;
		}
	});

	const newRoute = "/" + processedSegments.filter(segment => segment).join('/');
	const newSegments = newRoute.split("/").slice(1);

	if (segments.length > newSegments.length) {
		newSegments.pop();
		console.log(newSegments);
		return "/" + newSegments.join('/');
	}


	// Filter out empty segments and join the remaining ones
	return "/" + processedSegments.filter(segment => segment).join('/');
}
