import { useAtom } from 'jotai'
import { Check } from 'lucide-react'
import { useMemo } from 'react'
import {
	chartArguments,
	compareArguments,
	isCompareChartOpen,
	isComparePopupOpen,
} from '../state/state'
import { InputData } from './InputData'

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
			comArguments.time != ''
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
			{
				name: 'a',
				title: 'a',
				value: comArguments.a,
				placeholder: 'length (m)',
			},
			{
				name: 'b',
				title: 'b',
				value: comArguments.b,
				placeholder: 'width (m)',
			},
			{
				name: 'c',
				title: 'c',
				value: comArguments.c,
				placeholder: 'height (m)',
			},
			{
				name: 'm',
				title: 'm',
				value: comArguments.m,
				placeholder: 'mass (kg)',
			},
			{
				name: 'wx',
				title: 'wx',
				value: comArguments.wx,
				placeholder: 'wx (rad/s)',
			},
			{
				name: 'wy',
				title: 'wy',
				value: comArguments.wy,
				placeholder: 'wy (rad/s)',
			},
			{
				name: 'wz',
				title: 'wz',
				value: comArguments.wz,
				placeholder: 'wz (rad/s)',
			},
			{
				name: 'dt',
				title: 'dt',
				value: comArguments.dt,
				placeholder: 'dt (s)',
			},
			{
				name: 'time',
				title: 't',
				value: comArguments.time,
				placeholder: 'time (s)',
			},
		]
	}, [comArguments])

	return (
		<form onSubmit={handleSubmit}>
			<div className='absolute top-12 left-12 grid grid-cols-2 gap-4 bg-white rounded-2xl p-3 shadow-md shadow-[#424141] z-50 text-center justify-center pt-14'>
				<h1 className='text-2xl absolute top-2 left-[41%]'>Data:</h1>
				{inputArr.map((item, i) => {
					return (
						<InputData
							key={i}
							title={item.title}
							handleChange={handleChange}
							name={item.name}
							placeholder={item.placeholder}
							value={item.value}
						/>
					)
				})}
				<button className='bg-[#08ABF1] p-2 rounded-lg w-8 h-8 flex justify-center items-center cursor-pointer absolute right-2 bottom-2 shadow-sm shadow-black hover:bg-[#0794d0]'>
					<Check />
				</button>
			</div>
		</form>
	)
}
