import { useAtom } from 'jotai'
import { useEffect, useRef } from 'react'
import uPlot from 'uplot'
import 'uplot/dist/uPlot.min.css'
import { currentPlayingFile, speed } from '../state/state'
import { getData } from '../utils/getData'

interface INumberData {
	time: number
	wx: number
	wy: number
	wz: number
	absolute: number
}

export const Chart = () => {
	const [currentFile] = useAtom(currentPlayingFile)
	const [currentSpeed] = useAtom(speed)

	const uPlotInst = useRef<uPlot | null>(null)

	const syncTime = useRef<number>(0)
	const frameId = useRef<number>()

	function converter(data: INumberData[]) {
		const time = data.map(value => Number(value.time))
		const wx = data.map(value => Number(value.wx))
		const wy = data.map(value => Number(value.wy))
		const wz = data.map(value => Number(value.wz))
		return [time, wx, wy, wz]
	}

	const chartRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		if (!chartRef.current) return

		const opts: uPlot.Options = {
			width: chartRef.current.clientWidth,
			height: 300,
			cursor: {
				drag: { x: true, y: false },
			},
			scales: {
				x: { time: false },
			},
			series: [
				{},
				{
					label: 'wx',
					stroke: '#ffe924f0',
					width: 2,
				},
				{
					label: 'wy',
					stroke: '#2453ffe8',
					width: 2,
				},
				{
					label: 'wz',
					stroke: '#48ff24e8',
					width: 2,
				},
			],
			axes: [
				{
					stroke: '#000000',
					grid: { stroke: '#aba9a9' },
				},
				{
					stroke: '#000000',
					grid: { stroke: '#b3b1b1' },
				},
			],
		}
		uPlotInst.current = new uPlot(
			opts,
			converter(getData(currentFile)),
			chartRef.current
		)
	}, [])

	useEffect(() => {
		if (uPlotInst.current) {
			uPlotInst.current?.setData(converter(getData(currentFile)))
		}
	}, [currentFile])

	return (
		<div>
			<div ref={chartRef}></div>
		</div>
	)
}
