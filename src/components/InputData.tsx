import React from 'react'

export const InputData = ({
	handleChange,
	value,
	name,
	placeholder,
	title,
}) => {
	return (
		<div className='flex items-center justify-between gap-3 text-xs w-full'>
			<label className='font-mono font-medium text-zinc-400 w-8 select-none'>
				{title}
			</label>
			<input
				onChange={handleChange}
				name={name}
				value={value}
				className='flex-grow px-2 py-1 bg-zinc-900/50 border border-zinc-800 rounded-lg text-zinc-100 placeholder-zinc-650 focus:border-blue-500/60 focus:outline-none font-mono text-right'
				placeholder={placeholder}
				type='text'
			/>
		</div>
	)
}
