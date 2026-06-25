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
			{/* Coordinate Plane Grid (CAD Style) */}
			<gridHelper args={[40, 40, '#27272a', '#18181b']} position={[0, -4, 0]} />
			
			{/* Spatial Axes Reference */}
			<axesHelper args={[6]} />
			
			{/* Balanced lighting for technical surface detail */}
			<ambientLight intensity={0.5} />
			<directionalLight 
				position={[15, 20, 15]} 
				intensity={2.2} 
				color='#ffffff'
			/>
			<pointLight 
				position={[-15, -10, -15]} 
				intensity={1.2} 
				color='#3b82f6'
			/>

			{/* Modern Glass Smartphone Model */}
			<mesh ref={meshRef}>
				{/* 2x4x0.7 represents mobile phone aspect ratio */}
				<boxGeometry args={[2, 4, 0.7]} />
				<meshPhysicalMaterial 
					color='#1e293b' 
					transmission={0.4}
					roughness={0.15}
					thickness={1.2}
					ior={1.5}
					clearcoat={1.0}
					clearcoatRoughness={0.05}
					transparent={true}
					opacity={0.88}
				/>
				<Edges 
					color='#38bdf8' 
					threshold={15} 
					lineWidth={2.0}
				/>
			</mesh>
			<OrbitControls makeDefault />
		</>
	)
}
