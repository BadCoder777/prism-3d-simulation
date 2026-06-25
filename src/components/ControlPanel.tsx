import { useAtom } from 'jotai'
import {
	ChevronLeft,
	ChevronRight,
	Pause,
	Play,
	SkipBack,
	SkipForward,
} from 'lucide-react'
import { useContext, useRef } from 'react'
import { AnimationContext } from '../context/animation-context'
import {
	animationDuration,
	currentPlayingFile,
	isPlaying,
	speed,
} from '../state/state'

export const ControlPanel = () => {
	const [currentSpeed, setCurrentSpeed] = useAtom(speed)
	const [currentFile] = useAtom(currentPlayingFile)
	const { mixerRef } = useContext(AnimationContext)
	const [isPlayingNow, setIsPlayngNow] = useAtom(isPlaying)
	const [duration] = useAtom(animationDuration)
	const inputRef = useRef(null)

	return (
		<div className='absolute bottom-4 left-1/2 -translate-x-1/2 h-11 bg-[#121625]/90 backdrop-blur-md border border-zinc-800 px-4 rounded-xl flex items-center justify-between gap-5 z-40 select-none shadow-lg shadow-black/30'>
			
			{/* Timecode / Source Indicator */}
			<div className='flex items-center gap-2 text-[10px] font-mono text-zinc-500 border-r border-zinc-800/80 pr-4 h-5'>
				<span className='font-bold uppercase tracking-wider text-zinc-400'>
					File:
				</span>
				<span className='text-zinc-350 truncate max-w-[120px] font-medium' title={currentFile}>
					{currentFile}
				</span>
			</div>
			
			{/* Timeline Controls */}
			<div className='flex items-center gap-1.5'>
				<button
					className='comfortable-transition p-1.5 rounded-lg hover:bg-zinc-800/60 hover:text-zinc-100 text-zinc-400 cursor-pointer'
					onClick={() => {
						if (mixerRef.current) {
							mixerRef.current.setTime(mixerRef.current.time - 3)
						}
					}}
					title='Skip Back (-3s)'
				>
					<SkipBack className='w-4 h-4' />
				</button>
				
				<button
					className='comfortable-transition p-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white cursor-pointer shadow-sm'
					onClick={() => {
						if (mixerRef.current) {
							// @ts-ignore
							mixerRef.current._actions.forEach(action => {
								action.paused = !action.paused
							})
							setIsPlayngNow(!isPlayingNow)
						}
					}}
					title={isPlayingNow ? 'Pause Simulation' : 'Resume Simulation'}
				>
					{isPlayingNow ? (
						<Pause className='w-4 h-4' />
					) : (
						<Play className='w-4 h-4' />
					)}
				</button>
				
				<button
					className='comfortable-transition p-1.5 rounded-lg hover:bg-zinc-800/60 hover:text-zinc-100 text-zinc-400 cursor-pointer'
					onClick={() => {
						if (mixerRef.current) {
							mixerRef.current.setTime(mixerRef.current.time + 3)
						}
					}}
					title='Skip Forward (+3s)'
				>
					<SkipForward className='w-4 h-4' />
				</button>
			</div>
			
			{/* Speed Rate controls */}
			<div className='flex items-center gap-2 text-xs border-l border-zinc-800/80 pl-4 h-5'>
				<span className='text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-500'>
					Rate:
				</span>
				<div className='flex items-center gap-1 bg-zinc-950/60 border border-zinc-800/80 rounded-lg px-1.5 py-0.5'>
					<button
						className='text-zinc-500 hover:text-zinc-300 cursor-pointer transition-colors duration-75'
						onClick={() => {
							setCurrentSpeed(currentSpeed / 2)
						}}
						title='Half Speed'
					>
						<ChevronLeft className='w-3.5 h-3.5' />
					</button>
					
					<span className='font-mono font-semibold text-[10px] text-zinc-300 min-w-[28px] text-center'>
						{currentSpeed}x
					</span>
					
					<button
						className='text-zinc-500 hover:text-zinc-300 cursor-pointer transition-colors duration-75'
						onClick={() => {
							setCurrentSpeed(currentSpeed * 2)
						}}
						title='Double Speed'
					>
						<ChevronRight className='w-3.5 h-3.5' />
					</button>
				</div>
			</div>
		</div>
	)
}
