export const calcIMoments = ([a, b, c, m]: number[]) => {
	const I_x = (1 / 12) * m * (b ** 2 + c ** 2)
	const I_y = (1 / 12) * m * (a ** 2 + c ** 2)
	const I_z = (1 / 12) * m * (a ** 2 + b ** 2)
	return [I_x, I_y, I_z]
}
