import { useAtom } from 'jotai'
import { FileMenu } from './components/FileMenu'
import { FileUploader } from './components/FileUploader'
import { PrismScene } from './components/PrismScene'
import { currentPlayingFile } from './state/state'

export const App = () => {
	const [currentFile] = useAtom(currentPlayingFile)

	return (
		<>
			<FileUploader />
			<FileMenu />
			<div>{currentFile != '' && <PrismScene />}</div>
		</>
	)
}
