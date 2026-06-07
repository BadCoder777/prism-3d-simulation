import { useAtom } from 'jotai'
import { useEffect, useMemo, useRef } from 'react'
import uPlot from 'uplot'
import 'uplot/dist/uPlot.min.css'
import { chartArguments, currentPlayingFile } from '../state/state'
import { calcIMoments } from '../utils/calcIMoments'
import { eulerSolver } from '../utils/eulerSolver'

export const CompareChart = () => {
	const [currentFile] = useAtom(currentPlayingFile)

	const [args] = useAtom(chartArguments)
	const myDivRef = useRef<HTMLDivElement>(null)
	const [I_x, I_y, I_z] = useMemo(() => {
		// @ts-ignore
		return calcIMoments([args.a, args.b, args.c, args.m])
	}, [args])

	const compareUPlotInst = useRef<uPlot | null>(null)

	const compareChartRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		if (!compareChartRef.current) return

		if (compareUPlotInst.current) compareUPlotInst.current.destroy()

		const opts: uPlot.Options = {
			width: compareChartRef.current.clientWidth,
			height: myDivRef.current.clientHeight,
			cursor: {
				drag: { x: true, y: false },
			},
			scales: {
				x: { time: false },
				y: { range: [-100, 100] },
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
		compareUPlotInst.current = new uPlot(
			opts,
			// @ts-ignore
			eulerSolver(
				I_x,
				I_y,
				I_z,
				// @ts-ignore
				args.wx,
				// @ts-ignore
				args.wy,
				// @ts-ignore
				args.wz,
				// @ts-ignore
				args.dt,
				// @ts-ignore
				args.time
			),
			compareChartRef.current
		)
	}, [args, I_x, I_y, I_z])

	return (
		<div
			ref={myDivRef}
			className={`${
				currentFile != '' ? 'w-[47.5%]' : 'w-[96%] left-6'
			} bg-[#E9E8EF] h-[37%] rounded-3xl absolute left-6 pb-5`}
		>
			<div ref={compareChartRef}></div>
		</div>
	)
}
