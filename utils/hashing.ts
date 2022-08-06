

export function adler32(input: string) {
	let buffer = [...Buffer.from(input, 'ascii')];
	let a = 1;
	let b = 0;
	for(let i = 0; i < buffer.length; i++) {
		a += buffer[i] % 65521;
		b = (b + a) % 65521;
	}
	return ((b << 16) | a).toString(16);
}