import { useAtom } from 'jotai'
import { Eye, EyeOff } from 'lucide-react'
import { useEffect, useMemo } from 'react'
import { Chart } from './components/Chart'
import { CompareChart } from './components/CompareChart'
import { ControlPanel } from './components/ControlPanel'
import { FileMenu } from './components/FileMenu'
import { PrismScene } from './components/PrismScene'
import { AnimationProvider } from './providers/AnimationProvider'
import {
	chartArguments,
	currentPlayingFile,
	isCompareChartOpen,
	keyList,
} from './state/state'
import { converter } from './utils/dataForChartConverter'
import { getData } from './utils/getData'

export const App = () => {
	const [, setList] = useAtom(keyList)
	const [chartArgs] = useAtom(chartArguments)
	const [isChartOpen, setIsChartOpen] = useAtom(isCompareChartOpen)

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
		chartArgs.time

	useEffect(() => {
		setList(Object.keys(localStorage))
		// Force dark theme class
		window.document.documentElement.classList.add('dark')
	}, [])

	const [currentFile] = useAtom(currentPlayingFile)
	const file = useMemo(() => {
		if (currentFile) {
			return getData(currentFile)
		}
	}, [currentFile])

	return (
		<AnimationProvider>
			<div className='bg-[#080b11] text-zinc-100 h-screen w-screen p-4 flex overflow-hidden font-sans antialiased select-none gap-4'>
				
				{/* Left Column: Viewport & Charts */}
				<div className='flex-grow min-w-0 flex flex-col gap-4 h-full'>
					
					{/* 3D Viewport Box - Glassmorphism, flex-grow to fill remaining space */}
					<div className='flex-grow min-h-0 relative bg-[#090c15]/40 backdrop-blur-xl border border-white/5 rounded-2xl flex flex-col justify-center items-center overflow-hidden shadow-2xl shadow-black/40'>
						
						{/* Scientific Title Overlay */}
						<div className='absolute top-5 left-5 z-40 pointer-events-none select-none'>
							<div className='text-xs font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-2'>
								Prism 3D Simulator
								<span className='text-[8px] uppercase tracking-normal bg-blue-500/10 text-blue-400 border border-blue-500/20 px-1.5 py-0.5 rounded font-mono'>
									GYPT
								</span>
							</div>
							<div className='text-[9px] text-zinc-500 font-mono mt-0.5'>
								Tennis Racket Theorem & Euler Solver
							</div>
						</div>

						{currentFile !== '' ? (
							<PrismScene />
						) : (
							<div className='flex flex-col items-center gap-3 text-center p-6 max-w-sm'>
								<div className='w-12 h-12 rounded-full bg-zinc-950/60 border border-white/5 flex items-center justify-center text-zinc-500 text-lg font-mono shadow-inner'>
									∅
								</div>
								<div>
									<h3 className='text-xs font-bold uppercase tracking-wider text-zinc-350'>
										No Active Telemetry Source
									</h3>
									<p className='text-[10px] text-zinc-500 mt-1 leading-relaxed'>
										Run the Euler model solver or upload a CSV file from the sidebar to initialize the 3D space.
									</p>
								</div>
							</div>
						)}

						{/* Bottom Viewport Control Panel */}
						{currentFile !== '' && <ControlPanel />}

						{/* Comparison Chart Eye Toggle Overlay */}
						<div className='z-40 absolute left-5 bottom-4 flex gap-4'>
							{isArgs && (
								<button
									className={`comfortable-transition h-10 w-10 border rounded-full flex justify-center items-center cursor-pointer shadow-lg hover:scale-105 active:scale-95 ${
										isChartOpen 
											? 'bg-blue-600 border-blue-500 text-white shadow-blue-500/10' 
											: 'bg-zinc-900/80 border-white/5 text-zinc-400 hover:text-zinc-200'
									}`}
									onClick={() => {
										setIsChartOpen(!isChartOpen)
									}}
									title={isChartOpen ? 'Hide Euler Model Plot' : 'Compare with Euler Model Plot'}
								>
									{isChartOpen ? <Eye className='w-4.5 h-4.5' /> : <EyeOff className='w-4.5 h-4.5' />}
								</button>
							)}
						</div>
					</div>

					{/* Bottom Charts Area - Glassmorphism, fixed height to prevent vertical scrolling */}
					<div className='h-[33%] flex-shrink-0 flex gap-4 min-h-[180px]'>
						{isChartOpen && isArgs && <CompareChart />}
						{currentFile !== '' && <Chart data={converter(file)} />}
					</div>
				</div>

				{/* Right Column: File Menu / Sidebar */}
				<FileMenu />
			</div>
		</AnimationProvider>
	)
}
