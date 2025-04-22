interface RouteParams {
	[key: string]: string | number;
}


export function processRoute(route: string, params: RouteParams): string {
	// Split the route into segments, excluding the initial "(app)" segment
	const segments = route.split('/').slice(3);

	// Iterate through segments and replace placeholders with actual values
	const processedSegments = segments.map((segment) => {
		// Match segments enclosed in square brackets, ignoring the matcher part
		const match = segment.match(/\[([^\]=]+)(=[^\]]+)?\]/);
		if (match) {
			// Extract the parameter name before the '='
			const paramName = match[1];
			// Replace with actual parameter value or empty string
			return params[paramName]?.toString() || '';
		} else {
			return segment; // Keep static segments untouched
		}
	});

	// Filter out empty segments and join the remaining ones
	return "/" + processedSegments.filter(segment => segment).join('/');
}
