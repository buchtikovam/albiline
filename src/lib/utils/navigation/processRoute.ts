interface RouteParams {
	[key: string]: string | number;
}

export function processRoute(route: string, params: RouteParams): string {
	// Split the route into segments, excluding the initial "(app)" segment
	const segments = route.split('/').slice(2);

	console.log(segments);

	// Iterate through segments and replace placeholders with actual values
	const processedSegments = segments.map((segment) => {
		const match = segment.match(/\[(.*)\]/); // Match segments enclosed in square brackets
		if (match) {
			console.log(match);
			const paramName = match[1];
			console.log(params[paramName]);
			return params[paramName]?.toString() || ''; // Handle potential undefined values
		} else {
			return segment;
		}
	});

	console.log("/" + processedSegments.filter(segment => segment).join('/'));
	// Filter out empty segments and join the remaining ones
	return "/" + processedSegments.filter(segment => segment).join('/');
}
