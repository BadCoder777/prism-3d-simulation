export const eulerSolver = (I_x, I_y, I_z, wx, wy, wz, dt, T) => {
	const _time = []
	const _wx = []
	const _wy = []
	const _wz = []

	for (let i = 0; i < T; i += dt) {
		const dwx = ((I_y - I_z) / I_x) * wy * wz
		const dwy = ((I_z - I_x) / I_y) * wz * wx
		const dwz = ((I_x - I_y) / I_z) * wx * wy

		wx = wx + dwx * dt
		wy = wy + dwy * dt
		wz = wz + dwz * dt

		_time.push(i)
		_wx.push(wx)
		_wy.push(wy)
		_wz.push(wz)
	}

	console.log([_time, _wx, _wy, _wz])
	return [_time, _wx, _wy, _wz]
}
