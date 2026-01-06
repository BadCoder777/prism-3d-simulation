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
		<div className='flex h-12 gap-4 absolute bg-white rounded-xl z-50 bottom-3 left-[40%] xl:h-9'>
			<div className='transition-all flex p-2 justify-center items-center gap-1'>
				<div
					className='transition-all hover:bg-[#E9E8EF] p-2 rounded-lg cursor-pointer'
					onClick={() => {
						mixerRef.current.setTime(mixerRef.current.time - 3)
					}}
				>
					<SkipBack className='xl:h-5 xl:w-5' />
				</div>
				<div
					className='transition-all hover:bg-[#E9E8EF] p-2 rounded-lg cursor-pointer'
					onClick={() => {
						// @ts-ignore
						mixerRef.current._actions.forEach(action => {
							action.paused = !action.paused
						})
						setIsPlayngNow(!isPlayingNow)
					}}
				>
					{isPlayingNow ? (
						<Pause className='xl:h-5 xl:w-5' />
					) : (
						<Play className='xl:h-5 xl:w-5' />
					)}
				</div>
				<div
					className='transition-all hover:bg-[#E9E8EF] p-2 rounded-lg cursor-pointer'
					onClick={() => {
						mixerRef.current.setTime(mixerRef.current.time + 3)
					}}
				>
					<SkipForward className='xl:h-5 xl:w-5' />
				</div>
			</div>
			<div className='transition-all flex gap-2 justify-center items-center'>
				<div
					className='transition-all hover:bg-[#E9E8EF] p-1 rounded-lg cursor-pointer h-full flex items-center'
					onClick={() => {
						setCurrentSpeed(currentSpeed / 2)
					}}
				>
					<ChevronLeft className='xl:h-5 xl:w-5' />
				</div>
				<div className='text-xl'>{currentSpeed}</div>
				<div
					className='transition-all hover:bg-[#E9E8EF] p-1 rounded-lg cursor-pointer h-full flex items-center'
					onClick={() => {
						setCurrentSpeed(currentSpeed * 2)
					}}
				>
					<ChevronRight className='xl:h-5 xl:w-5' />
				</div>
			</div>
		</div>
	)
}
