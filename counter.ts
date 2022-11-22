export function counter(value = 0): [() => number, () => void] {
	const get = () => value;
	const next = () => {
		value++;
	};

	return [get, next];
}
