import { useAtom } from 'jotai'
import { Trash2, Play } from 'lucide-react'
import { useMemo } from 'react'
import {
	chartArguments,
	compareArguments,
	currentPlayingFile,
	isCompareChartOpen,
	keyList,
} from '../state/state'
import { FileUploader } from './FileUploader'
import { InputData } from './InputData'

export const FileMenu = () => {
	const [keys, setKeys] = useAtom(keyList)
	const [currentFile, setCurrentFile] = useAtom(currentPlayingFile)
	
	const [comArguments, setArguments] = useAtom(compareArguments)
	const [, setChartArgs] = useAtom(chartArguments)
	const [isChartOpen, setIsChartOpen] = useAtom(isCompareChartOpen)

	const handleChange = e => {
		const { name, value } = e.target
		setArguments(prev => ({
			...prev,
			[name]: value,
		}))
	}

	const handleSubmit = e => {
		e.preventDefault()

		if (
			comArguments.a !== '' &&
			comArguments.b !== '' &&
			comArguments.c !== '' &&
			comArguments.m !== '' &&
			comArguments.wx !== '' &&
			comArguments.wy !== '' &&
			comArguments.wz !== '' &&
			comArguments.dt !== '' &&
			comArguments.time !== ''
		) {
			setChartArgs({
				a: +comArguments.a,
				b: +comArguments.b,
				c: +comArguments.c,
				m: +comArguments.m,
				wx: +comArguments.wx,
				wy: +comArguments.wy,
				wz: +comArguments.wz,
				dt: +comArguments.dt,
				time: +comArguments.time,
			})
			setIsChartOpen(true)
		} else {
			setChartArgs({
				a: null,
				b: null,
				c: null,
				m: null,
				wx: null,
				wy: null,
				wz: null,
				dt: null,
				time: null,
			})
		}
	}

	const inputArr = useMemo(() => {
		return [
			{ name: 'a', title: 'a', value: comArguments.a, placeholder: 'length (m)' },
			{ name: 'b', title: 'b', value: comArguments.b, placeholder: 'width (m)' },
			{ name: 'c', title: 'c', value: comArguments.c, placeholder: 'height (m)' },
			{ name: 'm', title: 'm', value: comArguments.m, placeholder: 'mass (kg)' },
			{ name: 'wx', title: 'ωx', value: comArguments.wx, placeholder: 'rad/s' },
			{ name: 'wy', title: 'ωy', value: comArguments.wy, placeholder: 'rad/s' },
			{ name: 'wz', title: 'ωz', value: comArguments.wz, placeholder: 'rad/s' },
			{ name: 'dt', title: 'dt', value: comArguments.dt, placeholder: 'step (s)' },
			{ name: 'time', title: 't', value: comArguments.time, placeholder: 'total (s)' },
		]
	}, [comArguments])

	return (
		<div className='w-80 h-full flex flex-col justify-between bg-[#121625]/40 backdrop-blur-xl border border-white/5 rounded-2xl p-4 shadow-2xl flex-shrink-0 select-none transition-all duration-300 xl:w-72'>
			
			<div className='flex-grow min-h-0 flex flex-col'>
				{/* Section 1: Parameters */}
				<div className='pb-3.5 mb-3.5 border-b border-zinc-850/50 flex flex-col gap-2.5'>
					<div className='flex items-center justify-between pb-1 border-b border-zinc-900'>
						<h2 className='text-[10px] font-bold tracking-wider uppercase text-zinc-500'>
							Model Parameters
						</h2>
					</div>
					
					<form onSubmit={handleSubmit} className='flex flex-col gap-2'>
						<div className='grid grid-cols-1 gap-1.5'>
							{inputArr.map((item, i) => (
								<InputData
									key={i}
									title={item.title}
									handleChange={handleChange}
									name={item.name}
									placeholder={item.placeholder}
									value={item.value}
								/>
							))}
						</div>
						
						<button
							type='submit'
							className='comfortable-transition w-full mt-1.5 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold tracking-wide flex items-center justify-center gap-1.5 shadow-md shadow-blue-600/10 hover:shadow-blue-500/20 cursor-pointer'
						>
							<Play className='w-3 h-3 fill-current' />
							<span>Solve Euler Model</span>
						</button>
					</form>
				</div>
				
				{/* Section 2: Datasets */}
				<div className='flex-grow min-h-0 flex flex-col gap-2.5'>
					<div className='flex items-center justify-between pb-1 border-b border-zinc-900'>
						<h2 className='text-[10px] font-bold tracking-wider uppercase text-zinc-500'>
							Sensor Datasets
						</h2>
					</div>
					
					{/* Scrollable File List */}
					<div className='flex-grow overflow-y-auto flex flex-col gap-2 pr-1'>
						{keys.length > 0 ? (
							keys.map((item, i) => (
								<div key={i} className='flex items-center gap-2'>
									<button
										className={`comfortable-transition text-left w-full px-3 py-2 rounded-lg text-xs font-mono border relative overflow-hidden flex-1 ${
											currentFile === item 
												? 'bg-zinc-800/80 border-zinc-700 text-zinc-100 font-medium' 
												: 'bg-zinc-900/30 border-zinc-850 text-zinc-400 hover:bg-zinc-900/50 hover:text-zinc-200'
										}`}
										onClick={() => {
											setCurrentFile(item)
										}}
									>
										<span className='truncate block max-w-[190px] xl:max-w-[150px]' title={item}>
											{item}
										</span>
									</button>
									
									<button
										className='comfortable-transition p-2 rounded-lg border border-transparent bg-zinc-900/30 text-zinc-550 hover:text-red-400 hover:bg-red-950/20 cursor-pointer'
										onClick={(e) => {
											e.stopPropagation()
											localStorage.removeItem(item)
											setKeys(prev => prev.filter(value => value !== item))
											if (currentFile === item) {
												setCurrentFile('')
											}
										}}
										title='Delete dataset'
									>
										<Trash2 className='w-3.5 h-3.5' />
									</button>
								</div>
							))
						) : (
							<div className='flex flex-col items-center justify-center py-6 text-center text-zinc-500 gap-1.5'>
								<span className='text-lg'>📊</span>
								<p className='text-[9px] font-bold uppercase tracking-wider'>No datasets loaded</p>
								<p className='text-[9px] text-zinc-600 px-2 leading-relaxed'>
									Upload a CSV file to begin telemetry simulation.
								</p>
							</div>
						)}
					</div>
				</div>
			</div>

			{/* Integrated Drag & Drop Uploader */}
			<div className='pt-3 border-t border-zinc-850/50'>
				<FileUploader />
			</div>
		</div>
	)
}
