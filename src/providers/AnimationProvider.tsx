import { useRef } from 'react'
import * as THREE from 'three'
import { AnimationContext } from '../context/animation-context'

export const AnimationProvider = ({ children }) => {
	const mixerRef = useRef<THREE.AnimationMixer | null>(null)

	return (
		<AnimationContext.Provider value={{ mixerRef }}>
			{children}
		</AnimationContext.Provider>
	)
}
