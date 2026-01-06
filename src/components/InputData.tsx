export const InputData = ({
	handleChange,
	value,
	name,
	placeholder,
	title,
}) => {
	return (
		<div className='relative'>
			<h2 className='absolute left-2 top-2 xl:text-sm xl:top-1 xl:left-1.5'>
				{title}:
			</h2>
			<input
				onChange={handleChange}
				name={name}
				value={value}
				className='p-2 border border-black rounded-lg w-32 pl-10 xl:w-24 xl:p-1 xl:text-sm xl:pl-7'
				placeholder={placeholder}
				type='string'
			/>
		</div>
	)
}
