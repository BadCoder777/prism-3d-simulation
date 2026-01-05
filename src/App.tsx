import { useAtom } from 'jotai'
import { ChartSpline, Eye, EyeOff } from 'lucide-react'
import { useEffect, useMemo } from 'react'
import { Chart } from './components/Chart'
import { CompareChart } from './components/CompareChart'
import { ComparePopup } from './components/ComparePopup'
import { ControlPanel } from './components/ControlPanel'
import { FileMenu } from './components/FileMenu'
import { PrismScene } from './components/PrismScene'
import { AnimationProvider } from './providers/AnimationProvider'
import {
	chartArguments,
	currentPlayingFile,
	isCompareChartOpen,
	isComparePopupOpen,
	keyList,
} from './state/state'
import { converter } from './utils/dataForChartConverter'
import { getData } from './utils/getData'

export const App = () => {
	const [, setList] = useAtom(keyList)
	const [chartArgs] = useAtom(chartArguments)
	const [isChartOpen, setIsChartOpen] = useAtom(isCompareChartOpen)
	const [isPopup, setIsPopup] = useAtom(isComparePopupOpen)

	const isArgs =
		chartArgs &&
		// @ts-ignore
		chartArgs.a &&
		// @ts-ignore
		chartArgs.b &&
		// @ts-ignore
		chartArgs.c &&
		// @ts-ignore
		chartArgs.m &&
		// @ts-ignore
		chartArgs.wx &&
		// @ts-ignore
		chartArgs.wy &&
		// @ts-ignore
		chartArgs.wz &&
		// @ts-ignore
		chartArgs.dt &&
		// @ts-ignore
		chartArgs.duration

	useEffect(() => {
		setList(Object.keys(localStorage))
	}, [])

	const [currentFile] = useAtom(currentPlayingFile)
	const file = useMemo(() => {
		if (currentFile) {
			return getData(currentFile)
		}
	}, [currentFile])

	return (
		<AnimationProvider>
			<div className='bg-[#FFFFFF] h-screen p-6'>
				{isPopup && <ComparePopup />}
				<FileMenu />
				<div className='h-[59%] w-[73%] bg-[#E9E8EF] rounded-xl mb-6 shadow-lg relative'>
					{currentFile != '' && <PrismScene />}
					<ControlPanel />
					<div className='z-50 absolute left-3 bottom-3 flex gap-4'>
						<div
							className='transition-all w-36 h-12 rounded-full flex justify-center items-center gap-2 cursor-pointer bg-[#08ABF1] hover:bg-[#0794d0]'
							onClick={() => {
								setIsPopup(!isPopup)
							}}
						>
							<ChartSpline />
							<h2>Compare</h2>
						</div>
						{isArgs && (
							<div
								className={`${
									isChartOpen ? 'bg-[#08ABF1]' : 'bg-white'
								} transition-all h-12 w-12 rounded-full flex justify-center items-center cursor-pointer`}
								onClick={() => {
									setIsChartOpen(!isChartOpen)
								}}
							>
								{isChartOpen ? <Eye /> : <EyeOff />}
							</div>
						)}
					</div>
				</div>
				<div className='w-full flex gap-6'>
					{isChartOpen && isArgs && <CompareChart />}
					{currentFile != '' && <Chart data={converter(file)} />}
				</div>
			</div>
		</AnimationProvider>
	)
}
