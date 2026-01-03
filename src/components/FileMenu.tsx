import { useAtom } from 'jotai'
import { currentPlayingFile, keyList } from '../state/state'

export const FileMenu = () => {
	const [keys] = useAtom(keyList)
	const [, setCurrentFile] = useAtom(currentPlayingFile)

	return (
		<div>
			{keys.map((item, i) => (
				<button
					key={i}
					className='mb-8 ml-8 p-7 h-35 w-34 bg-black cursor-pointer z-10 text-white'
					onClick={() => {
						setCurrentFile(item)
					}}
				>
					{item}
				</button>
			))}
		</div>
	)
}
