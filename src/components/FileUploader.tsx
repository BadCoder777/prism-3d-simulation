import { useAtom } from 'jotai'
import { Upload } from 'lucide-react'
import Papa from 'papaparse'
import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { currentPlayingFile, getDatasetKeys, isOpenDropZone, keyList } from '../state/state'

export const FileUploader = () => {
	const [isOpen] = useAtom(isOpenDropZone)
	const [, setKeys] = useAtom(keyList)
	const [, setCurrentFile] = useAtom(currentPlayingFile)

	const onDrop = useCallback(
		(acceptedFiles: File[]) => {
			const file = acceptedFiles[0]
			if (!file) return

			Papa.parse(file, {
				header: true,
				transformHeader: (header, index) => {
					if (index === 0) return 'time'
					if (index === 1) return 'wx'
					if (index === 2) return 'wy'
					if (index === 3) return 'wz'
					if (index === 4) return 'absolute'
					return header
				},
				skipEmptyLines: true,

				complete: result => {
					localStorage.setItem(
						file.name,
						JSON.stringify({
							name: file.name,
							size: file.size,
							data: result.data,
						})
					)

					setKeys(getDatasetKeys())
					setCurrentFile(file.name)
				},

				error: err => {
					console.error('CSV parse error:', err)
				},
			})
		},
		[setKeys, setCurrentFile]
	)

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		accept: { 'text/csv': ['.csv'] },
		multiple: false,
	})

	if (!isOpen) return null

	return (
		<div
			className={`comfortable-transition w-full p-3 border border-dashed rounded-lg text-center cursor-pointer ${
				isDragActive
					? 'border-[#fe8019] bg-[#fe8019]/10'
					: 'border-[#504945] hover:border-[#7c6f64] bg-[#282828]/30 hover:bg-[#32302f]/60'
			}`}
			{...getRootProps()}
		>
			<input {...getInputProps()} />
			<div className='flex flex-col items-center gap-1.5'>
				<Upload className='w-4 h-4 text-[#a89984]' />
				<div>
					<p className='text-[10px] font-bold text-[#ebdbb2] uppercase tracking-wider'>
						Import CSV
					</p>
					<p className='text-[9px] text-[#a89984] mt-0.5 font-mono'>
						Drag & drop file or click
					</p>
				</div>
			</div>
		</div>
	)
}
