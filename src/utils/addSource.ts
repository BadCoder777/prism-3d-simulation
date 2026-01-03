export const addSource = (file: string, name: string) => {
	localStorage.setItem(name, file)
}
