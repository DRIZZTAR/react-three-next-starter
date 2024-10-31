'use client'

import { forwardRef, Suspense, useImperativeHandle, useRef } from 'react'
import { OrbitControls, PerspectiveCamera, View as ViewImpl } from '@react-three/drei'
import { Three } from '@/helpers/components/Three'

export const CommonCanvas = ({ color, position = [0, 0, 6], fov = 40 }) => (
  <Suspense fallback={null}>
    {color && <color attach='background' args={[color]} />}
    <ambientLight />
    <pointLight position={[20, 30, 10]} intensity={3} decay={0.2} />
    <pointLight position={[-10, -10, -10]} color='blue' decay={0.2} />
    <PerspectiveCamera makeDefault fov={fov} position={position} />
  </Suspense>
)

const View = forwardRef(({ children, orbit, ...props }, ref) => {
  const localRef = useRef(null)
  useImperativeHandle(ref, () => localRef.current)

  return (
    <>
      <div ref={localRef} {...props} />
      <Three>
        <ViewImpl track={localRef}>
          {children}
          {orbit && (
            <OrbitControls
              enableZoom={true}
              enablePan={true}
              enableRotate={true}
              minDistance={2}
              maxDistance={8}
              minPolarAngle={Math.PI / 4} // 45 degrees
              maxPolarAngle={Math.PI / 2} // 90 degrees
              minAzimuthAngle={-Math.PI / 1} // -90 degrees
              maxAzimuthAngle={Math.PI / 1} // 90 degrees
              rotateSpeed={0.5}
              zoomSpeed={0.8}
              panSpeed={0.5}
              dampingFactor={0.1}
              enableDamping={true}
            />
          )}
        </ViewImpl>
      </Three>
    </>
  )
})
View.displayName = 'View'

export { View }
