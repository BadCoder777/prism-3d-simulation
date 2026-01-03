import { Canvas } from '@react-three/fiber'
import { PrismObject } from './PrismObject'

export const PrismScene = () => {
	return (
		<Canvas className='h-screen'>
			<PrismObject />
		</Canvas>
	)
}
