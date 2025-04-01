self.onmessage = async (event) => {
	const reader = event.data.stream.getReader();
	const decoder = new TextDecoderStream('utf-8');
	const jsonParser = new TransformStream<string, any>({
		// Similar parser logic as above
	});

	const processedStream = reader.pipeThrough(decoder).pipeThrough(jsonParser);

	// Process and send chunks back to main thread
	const processor = processedStream.getReader();
	while (true) {
		const { done, value } = await processor.read();
		if (done) break;
		self.postMessage(value);
	}
	self.postMessage({ done: true });
};
