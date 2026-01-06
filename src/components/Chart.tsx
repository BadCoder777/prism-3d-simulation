import { useAtom } from 'jotai'
import { useEffect, useRef } from 'react'
import uPlot from 'uplot'
import 'uplot/dist/uPlot.min.css'
import { currentPlayingFile, isCompareChartOpen } from '../state/state'
import { converter } from '../utils/dataForChartConverter'
import { getData } from '../utils/getData'

interface IData {
	data: number[][]
}

export const Chart = ({ data }: IData) => {
	const [currentFile] = useAtom(currentPlayingFile)

	const [isComChartOpen] = useAtom(isCompareChartOpen)

	const uPlotInst = useRef<uPlot | null>(null)

	const chartRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		if (!chartRef.current) return

		if (uPlotInst.current) uPlotInst.current.destroy()

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
		// @ts-ignore
		uPlotInst.current = new uPlot(opts, data, chartRef.current)
	}, [isComChartOpen])

	useEffect(() => {
		if (uPlotInst.current) {
			uPlotInst.current?.setData(converter(getData(currentFile)))
		}
	}, [currentFile])

	return (
		<div
			className={`${
				isComChartOpen ? 'w-[57%]' : 'w-full left-6'
			} bg-[#E9E8EF] rounded-3xl h-[34%] w-full absolute right-6`}
		>
			<div ref={chartRef}></div>
		</div>
	)
}
