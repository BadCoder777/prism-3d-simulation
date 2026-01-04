import { createContext } from 'react'
import * as THREE from 'three'

export type AnimationContextType = {
	mixerRef: React.MutableRefObject<THREE.AnimationMixer | null>
}

export const AnimationContext = createContext<AnimationContextType | null>(null)
