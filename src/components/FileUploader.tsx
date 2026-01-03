import { useAtom } from 'jotai'
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
		<div className={isOpen ? '' : 'hidden'} {...getRootProps()}>
			<input {...getInputProps()} />
			{isDragActive ? (
				<p>Drop the file here...</p>
			) : (
				<p>Drag & drop CSV here, or click</p>
			)}
		</div>
	)
}
