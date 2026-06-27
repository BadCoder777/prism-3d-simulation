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
			<label className='font-mono font-medium text-[#bdae93] w-8 select-none'>
				{title}
			</label>
			<input
				onChange={handleChange}
				name={name}
				value={value}
				className='flex-grow px-2 py-1 bg-[#282828]/80 border border-[#504945] rounded-lg text-[#ebdbb2] placeholder-[#7c6f64] focus:border-[#fe8019]/80 focus:outline-none font-mono text-right'
				placeholder={placeholder}
				type='text'
			/>
		</div>
	)
}
