interface RouteParams {
	[key: string]: string | number;
}


export function processRoute(route: string, params: RouteParams): string {
	// Split the route into segments, excluding the initial "(app)" segment
	const segments = route.split('/').slice(2);

	console.log(segments);

	// Iterate through segments and replace placeholders with actual values
	const processedSegments = segments.map((segment) => {
		const match = segment.match(/\[([^\]=]+)(=[^\]]+)?\]/); // Match segments enclosed in square brackets, ignoring the matcher part
		if (match) {
			const paramName = match[1]; // Extract the parameter name before the '='
			return params[paramName]?.toString() || ''; // Replace with actual parameter value or empty string
		} else {
			return segment; // Keep static segments untouched
		}
	});

	console.log(processedSegments);

	// Filter out empty segments and join the remaining ones
	return "/" + processedSegments.filter(segment => segment).join('/');
}
