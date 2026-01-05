import { atom } from 'jotai'

export const isOpenDropZone = atom(true)
export const speed = atom(1)
export const simTime = atom(0)
export const isPlaying = atom(true)
export const currentPlayingFile = atom('')
export const keyList = atom([])
export const animationDuration = atom(0)
export const isComparePopupOpen = atom(false)
export const isCompareChartOpen = atom(false)
export const chartArguments = atom()
export const compareArguments = atom({
	a: '',
	b: '',
	c: '',
	m: '',
	wx: '',
	wy: '',
	wz: '',
	dt: '',
	duration: '',
})
