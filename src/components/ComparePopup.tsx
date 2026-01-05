import { useAtom } from 'jotai'
import { Check } from 'lucide-react'
import {
	chartArguments,
	compareArguments,
	isCompareChartOpen,
	isComparePopupOpen,
} from '../state/state'

export const ComparePopup = () => {
	const [comArguments, setArguments] = useAtom(compareArguments)
	const [, setChartArgs] = useAtom(chartArguments)
	const [, setIsOpen] = useAtom(isComparePopupOpen)
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
			comArguments.a != '' &&
			comArguments.b != '' &&
			comArguments.c != '' &&
			comArguments.m != '' &&
			comArguments.wx != '' &&
			comArguments.wy != '' &&
			comArguments.wz != '' &&
			comArguments.dt != '' &&
			comArguments.duration != ''
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
				duration: +comArguments.duration,
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
				duration: null,
			})
		}
	}

	return (
		<form onSubmit={handleSubmit}>
			<div className='absolute top-12 left-12 flex flex-col gap-2 bg-white rounded-2xl p-3 shadow-md shadow-[#424141] z-50'>
				<div className='flex gap-2'>
					<input
						onChange={handleChange}
						name='a'
						value={comArguments.a}
						className='p-2 border border-black rounded-lg w-28'
						placeholder='length (m)'
						type='string'
					/>
					<input
						onChange={handleChange}
						name='b'
						value={comArguments.b}
						className='p-2 border border-black rounded-lg w-28'
						placeholder='width (m)'
						type='string'
					/>
				</div>
				<div className='flex gap-2'>
					<input
						onChange={handleChange}
						name='c'
						value={comArguments.c}
						className='p-2 border border-black rounded-lg w-28'
						placeholder='height (m)'
						type='string'
					/>
					<input
						onChange={handleChange}
						name='wx'
						value={comArguments.wx}
						className='p-2 border border-black rounded-lg w-28'
						placeholder='wx'
						type='string'
					/>
				</div>
				<div className='flex gap-2'>
					<input
						onChange={handleChange}
						name='wy'
						value={comArguments.wy}
						className='p-2 border border-black rounded-lg w-28'
						placeholder='wy'
						type='string'
					/>
					<input
						onChange={handleChange}
						name='wz'
						value={comArguments.wz}
						className='p-2 border border-black rounded-lg w-28'
						placeholder='wz'
						type='string'
					/>
				</div>
				<div className='flex gap-2'>
					<input
						onChange={handleChange}
						name='m'
						value={comArguments.m}
						className='p-2 border border-black rounded-lg w-28'
						placeholder='mass (kg)'
						type='string'
					/>
					<input
						onChange={handleChange}
						name='dt'
						value={comArguments.dt}
						className='p-2 border border-black rounded-lg w-28'
						placeholder='dt (s)'
						type='string'
					/>
				</div>
				<div className='flex justify-center'>
					<input
						onChange={handleChange}
						name='duration'
						value={comArguments.duration}
						className='p-2 border border-black rounded-lg w-28'
						placeholder='duration (s)'
						type='string'
					/>
				</div>
				<button className='bg-[#08ABF1] p-2 rounded-lg w-8 h-8 flex justify-center items-center cursor-pointer absolute right-2 bottom-2 shadow-sm shadow-black hover:bg-[#0794d0]'>
					<Check />
				</button>
			</div>
		</form>
	)
}
