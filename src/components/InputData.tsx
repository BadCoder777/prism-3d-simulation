export const InputData = ({
	handleChange,
	value,
	name,
	placeholder,
	title,
}) => {
	return (
		<div className='relative'>
			<h2 className='absolute left-2 top-2'>{title}:</h2>
			<input
				onChange={handleChange}
				name={name}
				value={value}
				className='p-2 border border-black rounded-lg w-32 pl-10'
				placeholder={placeholder}
				type='string'
			/>
		</div>
	)
}
