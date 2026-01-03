import { RechartsDevtools } from '@recharts/devtools'
import { useAtom } from 'jotai'
import { useMemo } from 'react'
import { CartesianGrid, Legend, Line, LineChart, XAxis, YAxis } from 'recharts'
import { currentPlayingFile } from '../state/state'
import type { ChartType } from '../types/chartTypes'
import { getData } from '../utils/getData'

interface IType {
	type: ChartType
}

export const Chart = ({ type }: IType) => {
	const [currentFile] = useAtom(currentPlayingFile)
	const data = useMemo(() => {
		return getData(currentFile).map(obj => {
			return Object.fromEntries(
				Object.entries(obj).map(([key, value]) => [key, Number(value)])
			)
		})
	}, [currentFile])

	return (
		<LineChart
			style={{ width: '100%', aspectRatio: 1.818, maxWidth: 400 }}
			responsive
			data={data}
		>
			<CartesianGrid />
			<Line dataKey={type} strokeWidth={0.2} />
			<XAxis dataKey='time' />
			<YAxis />
			<Legend />
			<RechartsDevtools />
		</LineChart>
	)
}
