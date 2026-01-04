import { useAtom } from 'jotai'
import { currentPlayingFile, keyList } from '../state/state'
import { FileUploader } from './FileUploader'

export const FileMenu = () => {
	const [keys] = useAtom(keyList)
	const [currentFile, setCurrentFile] = useAtom(currentPlayingFile)

	return (
		<div className='absolute right-8 top-6 w-[24%]'>
			<div className='flex flex-col gap-6 bg-[#E9E8EF] py-6 px-16 mb-3 rounded-xl'>
				{keys.map((item, i) => (
					<button
						key={i}
						className={`transition-all ${
							currentFile === item
								? 'border-2 border-black'
								: 'border-2 border-black/30'
						} p-5 h-35 w-80 rounded-xl bg-white cursor-pointer z-10 text-black text-xl`}
						onClick={() => {
							setCurrentFile(item)
						}}
					>
						{item}
					</button>
				))}
			</div>
			<FileUploader />
		</div>
	)
}
