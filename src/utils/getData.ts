export const getData = (key: string) => {
	const json = localStorage.getItem(key)
	if (json) {
		const obj = JSON.parse(json)
		return obj.data
	} else throw new Error('No source found')
}
