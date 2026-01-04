import { useAtom } from 'jotai'
import { useEffect } from 'react'
import { Chart } from './components/Chart'
import { ControlPanel } from './components/ControlPanel'
import { FileMenu } from './components/FileMenu'
import { PrismScene } from './components/PrismScene'
import { AnimationProvider } from './providers/AnimationProvider'
import { currentPlayingFile, keyList } from './state/state'

export const App = () => {
	const [, setList] = useAtom(keyList)

	useEffect(() => {
		setList(Object.keys(localStorage))
	}, [])

	const [currentFile] = useAtom(currentPlayingFile)

	return (
		<AnimationProvider>
			<div className='bg-[#FFFFFF] h-screen p-6'>
				<ControlPanel />
				<FileMenu />
				<div className='h-[59%] w-[73%] bg-[#E9E8EF] rounded-xl mb-6'>
					{currentFile != '' && <PrismScene />}
				</div>
				<div className='bg-[#E9E8EF] rounded-3xl h-[34%]'>
					{currentFile != '' && <Chart />}
				</div>
			</div>
		</AnimationProvider>
	)
}
