export function converter(data) {
	const time = data.map(value => Number(value.time))
	const wx = data.map(value => Number(value.wx))
	const wy = data.map(value => Number(value.wy))
	const wz = data.map(value => Number(value.wz))
	return [time, wx, wy, wz]
}
