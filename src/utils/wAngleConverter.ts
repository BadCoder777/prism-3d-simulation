import * as THREE from 'three'
import type { Data } from '../types/data.type'

export const converter = (data: Data, deadZone = 0.05) => {
	if (!data || data.length === 0) return { times: [], values: [] }

	const times: number[] = []
	const values: number[] = []

	const currentQ = new THREE.Quaternion(0, 0, 0, 1)
	const omega = new THREE.Vector3()
	const axis = new THREE.Vector3()
	const deltaQ = new THREE.Quaternion()

	const startTime = data[0].time

	for (let i = 0; i < data.length; i++) {
		const curr = data[i]

		times.push(curr.time - startTime)

		if (i > 0) {
			const prev = data[i - 1]
			const dt = curr.time - prev.time

			omega.set(curr.wx, curr.wy, curr.wz)
			const speed = omega.length()

			if (speed > deadZone) {
				axis.copy(omega).normalize()
				const angle = speed * dt
				deltaQ.setFromAxisAngle(axis, angle)
				currentQ.multiply(deltaQ)
				currentQ.normalize()
			}
		}

		values.push(currentQ.x, currentQ.y, currentQ.z, currentQ.w)
	}

	return { times, values }
}
