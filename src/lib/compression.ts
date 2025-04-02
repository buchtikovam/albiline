export async function compressData(data: unknown): Promise<Blob> {
	const jsonString = JSON.stringify(data);
	const stream = new ReadableStream({
		start(controller) {
			controller.enqueue(new TextEncoder().encode(jsonString));
			controller.close();
		}
	});

	const compressedStream = stream.pipeThrough(new CompressionStream('gzip'));

	const chunks: Uint8Array[] = [];
	const reader = compressedStream.getReader();

	while (true) {
		const { done, value } = await reader.read();
		if (done) break;
		if (value) chunks.push(value);
	}

	return new Blob(chunks, { type: 'application/gzip' });
}


export async function decompressData(blob: Blob): Promise<unknown> {
	// Create a streaming decompression pipeline
	const decompressionStream = blob.stream()
		.pipeThrough(new DecompressionStream('gzip'))
		.pipeThrough(new TextDecoderStream('utf-8'));

	// Create a streaming JSON parser with proper typing
	const jsonParser = new TransformStream<string, any>({
		start() {
			// Initialize buffer in closure scope
			let buffer = '';

			return {
				async transform(chunk: string, controller: TransformStreamDefaultController<any>) {
					try {
						// Try parsing current chunk directly
						controller.enqueue(JSON.parse(chunk));
					} catch (error) {
						// Handle partial chunks by buffering
						buffer += chunk;
						try {
							const parsed = JSON.parse(buffer);
							controller.enqueue(parsed);
							buffer = '';
						} catch (e) {
							// Wait for more chunks if still invalid
						}
					}
				},
				flush(controller: TransformStreamDefaultController<any>) {
					if (buffer.length > 0) {
						controller.error(new Error('Incomplete JSON data at end of stream'));
					}
				}
			};
		}
	});

	// Process the stream
	const processedStream = decompressionStream.pipeThrough(jsonParser);
	const reader = processedStream.getReader();

	// Collect results
	let results: string = "";
	while (true) {
		const { done, value } = await reader.read();
		if (done) break;
		if (value) {
			results += value;
		}
	}

	return JSON.parse(results);
}





// Type guard for error handling
export function isError(error: unknown): error is Error {
	return error instanceof Error;
}
