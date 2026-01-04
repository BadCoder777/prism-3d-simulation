import { useAtom } from 'jotai'
import { CirclePlus } from 'lucide-react'
import Papa from 'papaparse'
import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { isOpenDropZone, keyList } from '../state/state'

export const FileUploader = () => {
	const [isOpen] = useAtom(isOpenDropZone)
	const [, setKeys] = useAtom(keyList)

	const onDrop = useCallback(
		(acceptedFiles: File[]) => {
			const file = acceptedFiles[0]
			if (!file) return

			Papa.parse(file, {
				header: true,
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

					setKeys(Object.keys(localStorage))
				},

				error: err => {
					console.error('CSV parse error:', err)
				},
			})
		},
		[setKeys]
	)

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		accept: { 'text/csv': ['.csv'] },
		multiple: false,
	})

	return (
		<>
			<div
				className={`${
					isOpen ? '' : 'hidden'
				} h-12 rounded-lg bg-[#E9E8EF] w-32 z-50 flex justify-center items-center cursor-pointer transition-all hover:bg-[#cecdd3]`}
				{...getRootProps()}
			>
				<input {...getInputProps()} />
				<div className='flex justify-center items-center gap-2'>
					<h2 className='font-medium text-xl'>Add</h2>
					<CirclePlus />
				</div>
			</div>
		</>
	)
}
