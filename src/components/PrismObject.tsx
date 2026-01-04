import { Edges, OrbitControls } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useAtom } from 'jotai'
import { useContext, useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { AnimationContext } from '../context/animation-context'
import { animationDuration, currentPlayingFile, speed } from '../state/state'
import { getData } from '../utils/getData'
import { converter } from '../utils/wAngleConverter'

export const PrismObject = () => {
	const [speedIndex] = useAtom(speed)
	const meshRef = useRef<THREE.Mesh>(null!)
	const [file] = useAtom(currentPlayingFile)
	const { mixerRef } = useContext(AnimationContext)
	const [, setDuration] = useAtom(animationDuration)

	const clip = useMemo(() => {
		const { times, values } = converter(getData(file))
		console.log(times, values)
		console.log(times[times.length - 1])
		const track = new THREE.QuaternionKeyframeTrack(
			'.quaternion',
			times,
			values
		)
		const duration = times[times.length - 1]
		setDuration(duration)
		return new THREE.AnimationClip('GyroAnim', duration, [track])
	}, [file])

	useEffect(() => {
		if (!meshRef.current) return

		const mixer = new THREE.AnimationMixer(meshRef.current)
		const action = mixer.clipAction(clip)

		action.setEffectiveTimeScale(speedIndex)
		action.play()

		mixerRef.current = mixer

		return () => {
			mixer.stopAllAction()
			mixer.uncacheRoot(meshRef.current)
		}
	}, [clip, mixerRef])

	useEffect(() => {
		if (mixerRef.current) {
			mixerRef.current.timeScale = speedIndex
		}
	}, [speedIndex])

	useFrame((state, delta) => {
		if (mixerRef.current) {
			mixerRef.current.update(delta)
		}
	})

	return (
		<>
			<axesHelper args={[10]} />
			<ambientLight intensity={0.5} />
			<pointLight position={[10, 10, 10]} />
			<mesh ref={meshRef}>
				<boxGeometry args={[2, 4, 0.7]} />
				<meshStandardMaterial color={'#e8fb86'} />
				<Edges color={'black'} />
			</mesh>
			<OrbitControls />
		</>
	)
}
